/**
 * featSectionDetector.js
 * ----------------------
 * Extracts structured sections from raw SRD/3PP feat text.
 *
 * Handles:
 *  - "Prerequisite" / "Prerequisites"
 *  - "Benefit" / "Benefits"
 *  - "Normal"
 *  - "Special"
 *  - Any leftover text → "other"
 *
 * Output:
 * {
 *   name: "Power Attack",
 *   typeTag: "General",
 *   sections: {
 *     prerequisites: "Str 13.",
 *     benefit: "You gain +3 hit points.",
 *     normal: "...",
 *     special: "...",
 *     other: "..."
 *   }
 * }
 */

const SECTION_LABELS = [
  "Prerequisite",
  "Prerequisites",
  "Benefit",
  "Benefits",
  "Normal",
  "Special"
];

const LABEL_MAP = {
  prerequisite: "prerequisites",
  prerequisites: "prerequisites",
  benefit: "benefit",
  benefits: "benefit",
  normal: "normal",
  special: "special"
};

/**
 * Extracts the feat name + type tag from the header line.
 * Example:
 *   "Power Attack [General]"
 */
function splitHeaderAndBody(raw) {
  const lines = raw
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { name: null, typeTag: null, body: "" };
  }

  const headerLine = lines[0];
  const headerMatch = headerLine.match(/^(.+?)\s*\[(.+?)\]\s*$/);

  let name = headerLine;
  let typeTag = null;

  if (headerMatch) {
    name = headerMatch[1].trim();
    typeTag = headerMatch[2].trim();
  }

  const body = lines.slice(1).join("\n");
  return { name, typeTag, body };
}

/**
 * Detects labeled sections in the body text.
 */
function detectSections(body) {
  const lines = body.split(/\r?\n/);

  let currentLabel = null;

  const buckets = {
    prerequisites: [],
    benefit: [],
    normal: [],
    special: [],
    other: []
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Check if this line starts with a known section label
    const matchedLabel = SECTION_LABELS.find(lbl =>
      line.toLowerCase().startsWith(lbl.toLowerCase())
    );

    if (matchedLabel) {
      const key = LABEL_MAP[matchedLabel.toLowerCase()] || "other";
      currentLabel = key;

      // Capture trailing text after the label
      const after = line.slice(matchedLabel.length).trim();
      if (after) buckets[currentLabel].push(after);

      continue;
    }

    // If no label yet, treat as "other"
    if (!currentLabel) {
      buckets.other.push(line);
    } else {
      buckets[currentLabel].push(line);
    }
  }

  return {
    prerequisites: buckets.prerequisites.join(" ").trim(),
    benefit: buckets.benefit.join(" ").trim(),
    normal: buckets.normal.join(" ").trim(),
    special: buckets.special.join(" ").trim(),
    other: buckets.other.join(" ").trim()
  };
}

/**
 * Main entry point.
 */
function parseFeatText(raw) {
  const { name, typeTag, body } = splitHeaderAndBody(raw);
  const sections = detectSections(body);

  return {
    name,
    typeTag,
    sections
  };
}

module.exports = {
  parseFeatText
};
