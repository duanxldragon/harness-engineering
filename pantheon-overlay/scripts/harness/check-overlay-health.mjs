#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = process.cwd();
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

const REQUIRED_FILES = [
  'pantheon-overlay/OVERLAY_MANIFEST.json',
  'pantheon-overlay/README.md',
  'pantheon-overlay/README.zh.md',
  'pantheon-overlay/docs/WORKSPACE_INHERITANCE.md',
  'pantheon-overlay/docs/WORKSPACE_INHERITANCE.zh.md',
  'pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.md',
  'pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md',
  'pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.md',
  'pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.zh.md',
  'pantheon-overlay/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md',
  'pantheon-overlay/docs/harness/BASE_DRIFT_BACKPORT_POLICY.md',
  'pantheon-overlay/docs/harness/BASE_DRIFT_BACKPORT_POLICY.en.md',
];

const CHECKS = [
  'check-inheritance-contract.mjs',
  'check-boundaries.mjs',
  'check-backend-response-contract.mjs',
  'check-backend-dto-contract.mjs',
  'check-permission-contract.mjs',
  'check-audit-coverage.mjs',
];

function printHelp() {
  console.log(`Usage:
  node pantheon-overlay/scripts/harness/check-overlay-health.mjs [--json] [--strict] [--root <path>]

Checks:
- required Pantheon overlay files exist
- overlay manifest includes the health entrypoint and key governance artifacts
- bilingual workspace/inheritance docs exist
- strict overlay checks can be invoked from a single entrypoint`);
}

function parseArgs(argv) {
  const options = {
    json: false,
    strict: false,
    help: false,
    root: DEFAULT_ROOT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--json') {
      options.json = true;
    } else if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--root') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('--root requires a path');
      }
      options.root = path.resolve(value);
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function exists(root, repoPath) {
  return fs.existsSync(path.join(root, repoPath));
}

function readJson(root, repoPath, findings) {
  const fullPath = path.join(root, repoPath);
  if (!fs.existsSync(fullPath)) {
    findings.push({ file: repoPath, reason: 'required file is missing' });
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    findings.push({ file: repoPath, reason: `invalid JSON: ${error.message}` });
    return null;
  }
}

function validateRequiredFiles(root, findings) {
  for (const repoPath of REQUIRED_FILES) {
    if (!exists(root, repoPath)) {
      findings.push({ file: repoPath, reason: 'required Pantheon overlay file is missing' });
    }
  }
}

function validateManifest(root, findings) {
  const manifest = readJson(root, 'pantheon-overlay/OVERLAY_MANIFEST.json', findings);
  if (!manifest) {
    return null;
  }

  if (!Array.isArray(manifest.includes)) {
    findings.push({
      file: 'pantheon-overlay/OVERLAY_MANIFEST.json',
      reason: 'includes must be an array',
    });
    return manifest;
  }

  const requiredIncludes = [
    'docs/harness/INHERITANCE_HARNESS_PROTOCOL.md',
    'docs/harness/BASE_DRIFT_BACKPORT_POLICY.md',
    'docs/harness/BASE_DRIFT_BACKPORT_POLICY.en.md',
    'scripts/harness/check-overlay-health.mjs',
  ];

  for (const includePath of requiredIncludes) {
    if (!manifest.includes.includes(includePath)) {
      findings.push({
        file: 'pantheon-overlay/OVERLAY_MANIFEST.json',
        reason: `manifest must include ${includePath}`,
      });
    }
  }

  return manifest;
}

function hasTargetWorkspace(root) {
  return exists(root, 'pantheon-base') && exists(root, 'pantheon-ops');
}

function runStrictChecks(root, warnings) {
  const checks = [];

  for (const scriptName of CHECKS) {
    const scriptPath = path.join(SCRIPT_DIR, scriptName);
    const result = spawnSync(process.execPath, [scriptPath, '--json', '--strict', '--root', root], {
      encoding: 'utf8',
    });

    let parsed = null;
    try {
      parsed = JSON.parse(result.stdout || '{}');
    } catch {
      warnings.push({
        file: `pantheon-overlay/scripts/harness/${scriptName}`,
        reason: 'strict check did not emit valid JSON output',
      });
    }

    checks.push({
      script: scriptName,
      status: result.status ?? 1,
      findingCount: parsed?.findingCount ?? null,
      warningCount: parsed?.warningCount ?? null,
    });

    if (result.error) {
      warnings.push({
        file: `pantheon-overlay/scripts/harness/${scriptName}`,
        reason: `strict check execution error: ${result.error.message}`,
      });
    }
  }

  return checks;
}

function validateCheckStatuses(checks, findings) {
  for (const check of checks) {
    if (check.status !== 0) {
      findings.push({
        file: `pantheon-overlay/scripts/harness/${check.script}`,
        reason: 'strict check reports findings; resolve or run against a compliant target workspace',
      });
    }
  }
}

function scan(root) {
  const findings = [];
  const warnings = [];

  validateRequiredFiles(root, findings);
  validateManifest(root, findings);
  let checks = [];

  if (hasTargetWorkspace(root)) {
    checks = runStrictChecks(root, warnings);
    validateCheckStatuses(checks, findings);
  } else {
    warnings.push({
      file: 'pantheon-overlay',
      reason: 'target Pantheon workspace not detected; skipped strict overlay scans that require pantheon-base and pantheon-ops',
    });
  }

  return { findings, warnings, checks };
}

function printTextReport(result, strict) {
  const mode = strict ? 'strict' : 'report-only';
  console.log(`Overlay health check (${mode}): ${result.findings.length} finding(s), ${result.warnings.length} warning(s)`);

  for (const check of result.checks) {
    console.log(`\ncheck: ${check.script}`);
    console.log(`  status: ${check.status}`);
    if (check.findingCount !== null) {
      console.log(`  findings: ${check.findingCount}`);
    }
    if (check.warningCount !== null) {
      console.log(`  warnings: ${check.warningCount}`);
    }
  }

  if (result.findings.length === 0 && result.warnings.length === 0) {
    console.log('\nno findings');
  }

  for (const finding of result.findings) {
    console.log(`\nfinding: ${finding.file}`);
    console.log(`  reason: ${finding.reason}`);
  }
  for (const warning of result.warnings) {
    console.log(`\nwarning: ${warning.file}`);
    console.log(`  reason: ${warning.reason}`);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    return 1;
  }

  if (options.help) {
    printHelp();
    return 0;
  }

  const result = scan(options.root);

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          mode: options.strict ? 'strict' : 'report-only',
          findingCount: result.findings.length,
          warningCount: result.warnings.length,
          findings: result.findings,
          warnings: result.warnings,
          checks: result.checks,
        },
        null,
        2,
      ),
    );
  } else {
    printTextReport(result, options.strict);
  }

  return options.strict && result.findings.length > 0 ? 1 : 0;
}

process.exitCode = main();
