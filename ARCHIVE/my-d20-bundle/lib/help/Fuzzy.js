// path: bundles/my-d20-bundle/lib/help/Fuzzy.js

'use strict';

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return matrix[a.length][b.length];
}

module.exports = {
  fuzzyMatch(helpManager, term, threshold = 3) {
    let best = null;
    let bestScore = Infinity;

    for (const [name] of helpManager.helpfiles) {
      const score = levenshtein(term, name.toLowerCase());
      if (score < bestScore && score <= threshold) {
        best = name;
        bestScore = score;
      }
    }

    return best;
  }
};
