#!/usr/bin/env node
// Formats TypeScript files after AI edits or reads them via Prettier.
const { spawnSync } = require('child_process');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let data;
  try { data = JSON.parse(raw); } catch { process.exit(0); }

  const filePath = (data.tool_input || {}).file_path;
  if (!filePath || !/\.tsx?$/.test(filePath)) process.exit(0);

  const result = spawnSync(
    'npx',
    ['prettier', '--write', filePath],
    { stdio: 'inherit', shell: true }
  );

  process.exit(result.status ?? 0);
});
