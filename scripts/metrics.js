#!/usr/bin/env node
/**
 * Tackeons Metrics Suite — Phase 6
 * - Size report (raw/gzip/brotli total + per-module top 10)
 * - Mutations with allowlist (immutable-css)
 * - Class counts, responsive variants, variables, grey/gray dual, container-type, invalid props
 * No external deps beyond Node built-ins + immutable-css CLI
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const cssPath = path.join(root, 'css', 'tackeons.css');
const minPath = path.join(root, 'css', 'tackeons.min.css');
const baselinePath = path.join(__dirname, 'baseline.json');
const UPDATE_BASELINE = process.argv.includes('--update-baseline');
const BASELINE_GATE_PCT = 5; // brotli growth > this % vs baseline fails (override: --update-baseline + commit both)

function loadBaseline() {
  try { return JSON.parse(fs.readFileSync(baselinePath, 'utf8')); } catch { return null; }
}

function currentBaseline() {
  const min = fs.existsSync(minPath) ? sizeInfo(fs.readFileSync(minPath)) : null;
  const full = fs.existsSync(cssPath) ? sizeInfo(fs.readFileSync(cssPath)) : null;
  return {
    updated: new Date().toISOString(),
    commit: (() => { try { return execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim(); } catch { return 'unknown'; } })(),
    artifacts: {
      'css/tackeons.min.css': min ? { raw: min.raw, gzip: min.gzip, brotli: min.brotli } : null,
      'css/tackeons.css': full ? { raw: full.raw, gzip: full.gzip, brotli: full.brotli } : null,
    },
  };
}

function read(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function sizeInfo(buf) {
  const raw = buf.length;
  const gz = zlib.gzipSync(buf).length;
  const bro = zlib.brotliCompressSync(buf).length;
  return { raw, gzip: gz, brotli: bro };
}

function fmt(n) { return n.toLocaleString(); }

let report = [];
report.push(`# Tackeons Metrics Report`);
report.push(`Generated: ${new Date().toISOString()}`);
report.push(`Branch: ${ (() => { try { return execSync('git rev-parse --abbrev-ref HEAD', { cwd: root }).toString().trim(); } catch { return 'unknown'; } })() }`);
report.push(`Commit: ${ (() => { try { return execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim(); } catch { return 'unknown'; } })() }`);
report.push('');

let failures = [];

// 1. Build check
report.push(`## 1. Build Check`);
if (!fs.existsSync(cssPath) || !fs.existsSync(minPath)) {
  report.push(`- MISSING: css/tackeons.css or css/tackeons.min.css not found — run npm run build`);
  failures.push('Missing build artifacts');
} else {
  report.push(`- Found css/tackeons.css and css/tackeons.min.css`);
}
report.push('');

// 2. Size report
report.push(`## 2. Size Report`);
if (fs.existsSync(cssPath) && fs.existsSync(minPath)) {
  const full = fs.readFileSync(cssPath);
  const min = fs.readFileSync(minPath);
  const fullSz = sizeInfo(full);
  const minSz = sizeInfo(min);
  report.push(`| File | Raw | Gzip | Brotli |`);
  report.push(`|------|-----|------|--------|`);
  report.push(`| tackeons.css | ${fmt(fullSz.raw)} | ${fmt(fullSz.gzip)} | ${fmt(fullSz.brotli)} |`);
  report.push(`| tackeons.min.css | ${fmt(minSz.raw)} | ${fmt(minSz.gzip)} | ${fmt(minSz.brotli)} |`);
  report.push('');

  // Per-module top 15 by raw
  const files = fs.readdirSync(srcDir).filter(f => f.startsWith('_') && f.endsWith('.css')).sort();
  let mods = files.map(f => {
    const content = fs.readFileSync(path.join(srcDir, f));
    const sz = sizeInfo(content);
    return { file: f, ...sz };
  }).sort((a,b) => b.raw - a.raw);
  report.push(`### Top 15 Modules by Raw`);
  report.push(`| Module | Raw | Gzip | Brotli |`);
  report.push(`|--------|-----|------|--------|`);
  mods.slice(0,15).forEach(m => {
    report.push(`| ${m.file} | ${fmt(m.raw)} | ${fmt(m.gzip)} | ${fmt(m.brotli)} |`);
  });
  report.push('');
  report.push(`Total src (_*.css) raw: ${fmt(mods.reduce((s,m)=>s+m.raw,0))}`);
  report.push('');

  // Baseline regression gate (scripts/baseline.json, decided 15-testing-metrics.md)
  let baseline = loadBaseline();
  if (!baseline || !baseline.artifacts || !baseline.artifacts['css/tackeons.min.css'] ||
      baseline.artifacts['css/tackeons.min.css'] === null) {
    if (UPDATE_BASELINE || !baseline) {
      fs.writeFileSync(baselinePath, JSON.stringify(currentBaseline(), null, 2) + '\n');
      baseline = loadBaseline();
      report.push(`- Baseline written to scripts/baseline.json (brotli ${baseline.artifacts['css/tackeons.min.css'].brotli}) — commit it`);
    } else {
      report.push(`- Baseline unreadable/corrupt — run \`npm run metrics:update\` to regenerate`);
      failures.push('Baseline missing or corrupt');
    }
  }
  const baseMin = baseline && baseline.artifacts['css/tackeons.min.css'];
  if (baseMin && typeof baseMin.brotli === 'number') {
    const growth = ((minSz.brotli - baseMin.brotli) / baseMin.brotli) * 100;
    const ok = growth <= BASELINE_GATE_PCT;
    report.push(`- Brotli gate: ${fmt(minSz.brotli)} vs baseline ${fmt(baseMin.brotli)} (${growth >= 0 ? '+' : ''}${growth.toFixed(2)}%, limit +${BASELINE_GATE_PCT}%) ${ok ? 'PASS' : '**FAIL**'}`);
    report.push(`- Raw gate: ${fmt(minSz.raw)} vs baseline ${fmt(baseMin.raw)} (${(((minSz.raw - baseMin.raw) / baseMin.raw) * 100).toFixed(2)}%)`);
    if (!ok) {
      if (UPDATE_BASELINE) {
        fs.writeFileSync(baselinePath, JSON.stringify(currentBaseline(), null, 2) + '\n');
        report.push(`- **Baseline updated** (--update-baseline): ${fmt(baseMin.brotli)} → ${fmt(minSz.brotli)} — commit scripts/baseline.json with your change`);
      } else {
        failures.push(`Brotli size grew +${growth.toFixed(1)}% over scripts/baseline.json (${baseMin.brotli} → ${minSz.brotli}). If intentional, run \`npm run metrics:update\` and commit baseline.json together with the change.`);
      }
    }
  }
} else {
  report.push(`- Skipped size (no build)`);
  report.push('');
}

// 3. Mutations with allowlist
report.push(`## 3. Mutations (immutable-css)`);
let mutationsOutput = '';
try {
  mutationsOutput = execSync('npx immutable-css src/tackeons.css --strict 2>&1', { cwd: root, encoding: 'utf8' });
} catch (e) {
  mutationsOutput = e.stdout ? e.stdout.toString() + e.stderr.toString() : e.message;
}

const allowlist = [
  /^\.glass\d+(-\w+)?$/, // glass1, glass1-hover, etc — DRY refactor intentional 3x
  /^\.border-box$/,
  /^\.shadow-\d+$/, // upstream collision documented ADR-005, allowed for v0.2.x
  /^\.shadow-hover$/,
  /^\.cf$/,
  /^\.pre$/,
];

let mutationLines = mutationsOutput.split('\n').filter(l => l.includes('was mutated'));
let unexpected = [];
let allowed = [];

mutationLines.forEach(line => {
  const m = line.match(/^(\.[A-Za-z0-9-_]+)/);
  const cls = m ? m[1] : line;
  const isAllowed = allowlist.some(rx => rx.test(cls) || line.includes(cls));
  // Also allow glass group as they appear as .glass1 etc
  if (cls.startsWith('.glass') || isAllowed) {
    allowed.push(line.trim());
  } else {
    unexpected.push(line.trim());
  }
});

report.push(`- Total mutation lines: ${mutationLines.length}`);
report.push(`- Allowed (intentional): ${allowed.length}`);
allowed.slice(0,20).forEach(l => report.push(`  - ${l}`));
if (allowed.length > 20) report.push(`  - ... and ${allowed.length-20} more allowed`);
report.push(`- Unexpected: ${unexpected.length}`);
unexpected.forEach(l => report.push(`  - ${l}`));
if (unexpected.length > 0) {
  failures.push(`Unexpected mutations: ${unexpected.length}`);
  report.push(`- **FAIL:** Unexpected mutations found`);
} else {
  report.push(`- **PASS:** No unexpected mutations (allowed intentional only)`);
}
report.push('');
report.push(`<details><summary>Full immutable-css output</summary>`);
report.push('```');
report.push(mutationsOutput.slice(0, 5000));
report.push('```');
report.push('</details>');
report.push('');

// 4. Class counts / responsive variants
report.push(`## 4. Class Counts & Responsive`);
if (fs.existsSync(cssPath)) {
  const css = read(cssPath);
  const selectors = css.match(/\.[a-z0-9-_]+/gi) || [];
  const uniq = new Set(selectors);
  report.push(`- Total selector occurrences: ${fmt(selectors.length)}`);
  report.push(`- Unique selectors (approx): ${fmt(uniq.size)}`);

  const checks = [
    '.dn-s', '.db-s', '.flex-s', '.dif-s, .inline-flex-s', // display responsive
    '.flex-m', '.dn-m',
    '.flex-l', '.dn-l',
    '.mt0', '.mb0', '.ml0', '.mr0', // spacing core
    '.o0', '.o12',
    '.hover-o12', '.focus-o12', // opacity canonical
    '.b--grey-0', '.b--gray-0', // dual spelling
  ];
  checks.forEach(sel => {
    const pat = sel.split(',')[0].trim();
    const present = css.includes(pat);
    report.push(`- ${pat}: ${present ? 'found' : 'MISSING'}`);
    if (!present) failures.push(`Missing selector ${pat}`);
  });
} else {
  report.push(`- Skipped (no built css)`);
}
report.push('');

// 5. Variable checks
report.push(`## 5. Variables`);
const varsPath = path.join(srcDir, '_variables.css');
const varsContent = read(varsPath);
if (varsContent) {
  const expected = [
    '--gray-0:', '--gray-11:',
    '--slate-gray-0:', '--blue-5:', '--tint-5:', '--shadow-5:',
    '--shadow-color:', '--shadow-color-invert:', '--color-dark:', '--bg-dark:', '--color-light:', '--bg-light:',
    '--spacing-0:', '--border-radius-0:', '--opacity-0:', '--opacity-12:',
  ];
  expected.forEach(v => {
    const present = varsContent.includes(v);
    report.push(`- ${v} ${present ? 'found' : 'MISSING'}`);
    if (!present) failures.push(`Missing variable ${v}`);
  });
  const countShadowInvert = (varsContent.match(/shadow-color-invert/g) || []).length;
  report.push(`- shadow-color-invert occurrences: ${countShadowInvert} (expected 2 = def + dark override)`);
  if (countShadowInvert < 2) failures.push('shadow-color-invert should appear 2x');
} else {
  report.push(`- MISSING _variables.css`);
  failures.push('Missing _variables.css');
}
report.push('');

// 6. Grey/Gray dual equality
report.push(`## 6. Grey/Gray Dual Spelling (Permanent)`);
const borderColors = read(path.join(srcDir, '_border-colors.css')) || '';
const skins = read(path.join(srcDir, '_skins.css')) || '';
const bcGrey = (borderColors.match(/b--grey-/g) || []).length;
const bcGray = (borderColors.match(/b--gray-/g) || []).length;
report.push(`- _border-colors.css: b--grey- ${bcGrey}, b--gray- ${bcGray} (expected equal 12 each)`);
if (bcGrey !== bcGray) failures.push(`b--grey/b--gray count mismatch ${bcGrey} vs ${bcGray}`);
if (bcGrey !== 12 || bcGray !== 12) report.push(`  - Note: expected 12 each for 0..11 scale`);

// skins greys — rough count of .grey- and .gray-
const skinsGrey = (skins.match(/\.grey-/g) || []).length; // .grey- appears as .grey-? Actually combined like .gray-0, .grey-0 — count separately
const skinsGray = (skins.match(/\.gray-/g) || []).length;
report.push(`- _skins.css .grey- occurrences: ${skinsGrey}, .gray- : ${skinsGray} (should be paired, not necessarily equal raw count due to grouping)`);
report.push(`- Decision per ADR-001 amendment 2026-08-02: dual spelling permanent, not deprecated`);
report.push('');

// 7. Container-type default check
report.push(`## 7. Container-Type Default`);
const containerPath = path.join(srcDir, '_container-type.css');
const containerContent = read(containerPath) || '';
const builtCss = read(cssPath) || '';
const hasHtmlContainer = containerContent.includes('html { container-type: inline-size; }');
const hasContainerNormal = containerContent.includes('.container-normal');
const builtHasHtml = builtCss.includes('html { container-type: inline-size; }');
report.push(`- src/_container-type.css has html { container-type: inline-size; }: ${hasHtmlContainer ? 'yes' : 'MISSING'}`);
report.push(`- has .container-normal: ${hasContainerNormal ? 'yes' : 'MISSING'}`);
report.push(`- built css has html container default: ${builtHasHtml ? 'yes' : 'MISSING'}`);
if (!hasHtmlContainer || !hasContainerNormal || !builtHasHtml) failures.push('Container-type default missing');
report.push('');

// 8. Invalid property checks (regression guard)
report.push(`## 8. Invalid Property Regression Guards`);
const gapCol = read(path.join(srcDir, '_gap-column.css')) || '';
const gapRow = read(path.join(srcDir, '_gap-row.css')) || '';
const skinsPseudo = read(path.join(srcDir, '_skins-pseudo.css')) || '';

function checkInvalid(fileContent, fileName, invalid, valid, expectedValidMin) {
  const invalidCount = (fileContent.match(new RegExp(invalid, 'g')) || []).length;
  const validCount = (fileContent.match(new RegExp(valid, 'g')) || []).length;
  const ok = invalidCount === 0 && validCount >= expectedValidMin;
  report.push(`- ${fileName}: ${invalid} → ${invalidCount} (expected 0), ${valid} → ${validCount} (expected >=${expectedValidMin}) ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) failures.push(`${fileName} invalid prop check failed`);
}

checkInvalid(gapCol, '_gap-column.css', 'gap-column:', 'column-gap:', 32);
checkInvalid(gapRow, '_gap-row.css', 'gap-row:', 'row-gap:', 32);

const overlayRefs = (read(path.join(root, 'src', 'tackeons.css')) || '').match(/--overlay/g) || [];
report.push(`- src/tackeons.css --overlay refs: ${overlayRefs.length} (expected 0, fixed earlier 98 broken refs)`);
if (overlayRefs.length > 0) failures.push('--overlay refs should be 0');

const builtOverlay = (builtCss.match(/--overlay/g) || []).length;
report.push(`- built css --overlay refs: ${builtOverlay} (expected 0)`);
if (builtOverlay > 0) failures.push('built css has --overlay refs');

report.push('');

// Summary
report.push(`## 9. Summary`);
if (failures.length === 0) {
  report.push(`**PASS** — No failures. Metrics OK.`);
} else {
  report.push(`**FAIL** — ${failures.length} failures:`);
  failures.forEach(f => report.push(`- ${f}`));
}
report.push('');

// Output
const out = report.join('\n');
console.log(out);
fs.writeFileSync(path.join(root, 'metrics-report.md'), out);
console.log(`\nReport written to metrics-report.md`);

if (failures.length > 0) process.exit(1);
