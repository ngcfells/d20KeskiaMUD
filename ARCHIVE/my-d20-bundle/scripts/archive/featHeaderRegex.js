"use strict";

const FEAT_HEADER_REGEXES = [
  new RegExp("^[A-Z][A-Z \\-']+\\[[A-Za-z \\-']+\\] $", "m"),
  new RegExp("^[A-Z][A-Za-z\\-']+(?: [A-Z][A-Za-z\\-']+)*\\[[A-Za-z \\-']+\\] $", "m")
];

function chunkHasFeatHeader(text) {
  const t = text || "";
  return FEAT_HEADER_REGEXES.some(r => r.test(t));
}

module.exports = {
  FEAT_HEADER_REGEXES,
  chunkHasFeatHeader
};
