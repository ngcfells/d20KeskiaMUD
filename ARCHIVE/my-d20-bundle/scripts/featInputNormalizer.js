"use strict";

/**
 * Removes source prefixes from feat names.
 * These prefixes should NEVER appear in canonical names or IDs.
 */
function stripSourcePrefixes(name) {
  if (!name) return "";

  return name
    // PFS Legal
    .replace(/^PFS Legal\s*/i, "")
    .replace(/^PFS\s+Legal\s*/i, "")
    .replace(/^PFS\s*/i, "")

    // 3.5 Material
    .replace(/^3\.5\s*Material\s*/i, "")
    .replace(/^3_5_material\s*/i, "")
    .replace(/^3\.5\s*/i, "")
    .replace(/^3_5\s*/i, "")

    .trim();
}

/**
 * Accepts ANY input format and returns a canonical feat-like object:
 * {
 *   name,
 *   prerequisitesRaw,
 *   descriptionRaw,
 *   source,
 *   typeTag?,
 *   sections?
 * }
 */
function normalizeFeatInput(raw) {
  // 1. Already structured JSON/object
  if (typeof raw === "object" && raw !== null) {
    return {
      name: stripSourcePrefixes(raw.name || ""),
      prerequisitesRaw: raw.prerequisitesRaw || raw.prerequisites || "",
      descriptionRaw: raw.descriptionRaw || raw.description || "",
      source: raw.source || { system: "unknown", book: "unknown", publisher: "unknown" },
      typeTag: raw.typeTag || null,
      sections: raw.sections || null
    };
  }

  // 2. TSV or CSV (tab or comma separated)
  if (typeof raw === "string" && (raw.includes("\t") || raw.split(",").length >= 3)) {
    const parts = raw.includes("\t") ? raw.split("\t") : raw.split(",");
    return {
      name: stripSourcePrefixes((parts[0] || "").trim()),
      prerequisitesRaw: (parts[1] || "").trim(),
      descriptionRaw: (parts[2] || "").trim(),
      source: { system: "unknown", book: "unknown", publisher: "unknown" },
      typeTag: null,
      sections: null
    };
  }

  // 3. HTML — strip tags then recurse
  if (typeof raw === "string" && raw.includes("<")) {
    const text = raw.replace(/<[^>]+>/g, " ");
    return normalizeFeatInput(text);
  }

  // 4. RAW text — best-effort line-based parse
  if (typeof raw === "string") {
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    return {
      name: stripSourcePrefixes(lines[0] || ""),
      prerequisitesRaw: lines[1] || "",
      descriptionRaw: lines.slice(2).join(" "),
      source: { system: "unknown", book: "unknown", publisher: "unknown" },
      typeTag: null,
      sections: null
    };
  }

  // 5. Fallback
  return {
    name: "",
    prerequisitesRaw: "",
    descriptionRaw: "",
    source: { system: "unknown", book: "unknown", publisher: "unknown" },
    typeTag: null,
    sections: null
  };
}

module.exports = { normalizeFeatInput };
