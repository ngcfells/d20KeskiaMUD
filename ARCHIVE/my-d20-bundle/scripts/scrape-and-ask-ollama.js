#!/usr/bin/env node
'use strict';

const { fetch } = require('undici');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const pdfParse = require('pdf-parse'); // CommonJS import

const LLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'llama3.1';

/* -------------------------------------------------------
   1) Fetch Archive.org metadata
------------------------------------------------------- */
async function getArchiveMetadata(identifier) {
  const url = `https://archive.org/metadata/${identifier}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch metadata`);
  return await res.json();
}

/* -------------------------------------------------------
   2) Choose the best text-bearing file
------------------------------------------------------- */
function chooseBestTextFile(metadata) {
  const files = metadata.files;

  // Prefer plain text
  let txt = files.find(f => f.name.endsWith('.txt'));
  if (txt) return txt.name;

  // Then EPUB
  let epub = files.find(f => f.name.endsWith('.epub'));
  if (epub) return epub.name;

  // Then PDF
  let pdf = files.find(f => f.name.endsWith('.pdf'));
  if (pdf) return pdf.name;

  return null;
}

/* -------------------------------------------------------
   3) Download the file
------------------------------------------------------- */
async function downloadArchiveFile(identifier, filename) {
  const url = `https://archive.org/download/${identifier}/${filename}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download file`);
  return Buffer.from(await res.arrayBuffer());
}

/* -------------------------------------------------------
   4) Extract text depending on file type
------------------------------------------------------- */
async function extractText(filename, buffer) {
  if (filename.endsWith('.txt')) {
    return buffer.toString('utf8');
  }

  if (filename.endsWith('.pdf')) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (filename.endsWith('.epub')) {
    const html = buffer.toString('utf8');
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    return article?.textContent || '';
  }

  return '';
}

/* -------------------------------------------------------
   5) Ask Llama 3.1 with strict no-hallucination prompt
------------------------------------------------------- */
async function askLlama(prompt) {
  const res = await fetch(LLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false
    })
  });

  const data = await res.json();
  return data.response;
}

function buildPrereqPrompt(featName, text) {
  return `
You are an extraction engine. You MUST NOT guess or invent information.

You will be given text from an RPG sourcebook.
Your job is to extract ONLY canonical RPG prerequisites for the feat named below.

If the text does not explicitly contain the prerequisites, return EXACTLY:

null

Otherwise, return a JSON object in this shape:

{
  "baseAttackBonus": number | null,
  "abilityScores": { "strength": number | null, "dexterity": number | null, "constitution": number | null, "intelligence": number | null, "wisdom": number | null, "charisma": number | null },
  "skills": { },
  "feats": [string],
  "classFeatures": [string],
  "race": string | null,
  "alignment": string | null
}

Feat name: "${featName}"

Text:
${text.slice(0, 20000)}
`;
}

/* -------------------------------------------------------
   6) Validate JSON output
------------------------------------------------------- */
function validatePrereqs(raw) {
  const trimmed = raw.trim();
  if (trimmed === 'null') return null;

  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed !== 'object' || parsed === null) return null;
    if (!Array.isArray(parsed.feats)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------
   7) Main
------------------------------------------------------- */
async function main() {
  const identifier = 'players-handbook_202302';
  const featName = 'Power Attack'; // change this to test other feats

  console.log(`Fetching metadata for: ${identifier}`);
  const metadata = await getArchiveMetadata(identifier);

  const filename = chooseBestTextFile(metadata);
  if (!filename) {
    console.error('No usable text, EPUB, or PDF file found.');
    return;
  }

  console.log(`Downloading: ${filename}`);
  const buffer = await downloadArchiveFile(identifier, filename);

  console.log(`Extracting text...`);
  const text = await extractText(filename, buffer);
  console.log(`Extracted text length: ${text.length}`);

  const prompt = buildPrereqPrompt(featName, text);
  const raw = await askLlama(prompt);

  console.log('\nRaw Llama response:\n', raw);

  const prereqs = validatePrereqs(raw);
  console.log('\nValidated prerequisites:\n', prereqs);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

