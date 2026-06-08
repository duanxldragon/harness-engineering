import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKDIR = path.resolve(TEST_DIR, '..', '..');
const SCRIPT = path.resolve(TEST_DIR, 'check-overlay-health.mjs');

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'overlay-health-'));

  writeFile(
    path.join(root, 'sample-overlays', 'pantheon', 'OVERLAY_MANIFEST.json'),
    JSON.stringify(
      {
        includes: [
          'docs/harness/INHERITANCE_HARNESS_PROTOCOL.md',
          'docs/harness/BASE_DRIFT_BACKPORT_POLICY.md',
          'docs/harness/BASE_DRIFT_BACKPORT_POLICY.en.md',
          'scripts/harness/check-overlay-health.mjs',
        ],
      },
      null,
      2,
    ),
  );

  for (const repoPath of [
    'sample-overlays/pantheon/README.md',
    'sample-overlays/pantheon/README.zh.md',
    'sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.md',
    'sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.zh.md',
    'sample-overlays/pantheon/docs/PROJECT_INHERITANCE_TEMPLATE.md',
    'sample-overlays/pantheon/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md',
    'sample-overlays/pantheon/docs/BASE_UPGRADE_WORKFLOW.md',
    'sample-overlays/pantheon/docs/BASE_UPGRADE_WORKFLOW.zh.md',
    'sample-overlays/pantheon/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md',
    'sample-overlays/pantheon/docs/harness/BASE_DRIFT_BACKPORT_POLICY.md',
    'sample-overlays/pantheon/docs/harness/BASE_DRIFT_BACKPORT_POLICY.en.md',
  ]) {
    writeFile(path.join(root, repoPath), '# doc\n');
  }

  writeFile(
    path.join(root, 'docs', 'WORKSPACE_INHERITANCE.md'),
    [
      '`pantheon-base`: the only authority',
      '`pantheon-ops`: a derived business repository',
      'Change base rules in `pantheon-base`, then let business repositories upgrade',
    ].join('\n'),
  );
  writeFile(
    path.join(root, 'pantheon-ops', 'CLAUDE.md'),
    [
      'pantheon-ops inherits pantheon-base as its foundation',
      'Business work reading order',
      '../docs/WORKSPACE_INHERITANCE.md',
      'docs/PROJECT_INHERITANCE.md',
      '../pantheon-base/DESIGN.md',
      '../pantheon-base/AGENTS.md',
      'Do not fix platform or system-domain drift locally in pantheon-ops',
    ].join('\n'),
  );
  writeFile(path.join(root, 'pantheon-ops', 'AGENTS.md'), 'pantheon-base\nbusiness/*\n');
  writeFile(
    path.join(root, 'pantheon-ops', 'docs', 'PROJECT_INHERITANCE.md'),
    [
      'Base repository: `../pantheon-base`',
      'Base version: `v1.2.3`',
      'business/cmdb',
      'business/deploy',
      'If a foundation rule must change, update `pantheon-base` first',
    ].join('\n'),
  );
  writeFile(
    path.join(root, '.github', 'pull_request_template.md'),
    ['Base/ops inheritance', 'Base version checked', 'generic drift', 'pseudo-drift', 'business-only'].join('\n'),
  );

  for (const repo of ['pantheon-base', 'pantheon-ops']) {
    writeFile(path.join(root, repo, 'backend', 'cmd', 'server', 'main.go'), 'package main\nfunc main() { r.Use(OperationLogMiddleware()) }\n');
    writeFile(path.join(root, repo, 'backend', 'pkg', 'common', 'response.go'), 'package common\nfunc Success(c *gin.Context, data interface{}) { c.JSON(200, data) }\n');
    writeFile(path.join(root, repo, 'backend', 'modules', 'business', 'clean.go'), 'package business\n');
    writeFile(path.join(root, repo, 'frontend', 'src', 'modules', 'business', 'clean.ts'), 'export const value = 1;\n');
  }

  return root;
}

test('overlay health passes for a compliant minimal fixture', () => {
  const root = makeFixture();

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: WORKDIR,
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.findingCount, 0);
  assert.equal(result.checks.length, 6);
});

test('overlay health strict mode fails when required overlay docs are missing', () => {
  const root = makeFixture();
  fs.rmSync(path.join(root, 'sample-overlays', 'pantheon', 'docs', 'harness', 'BASE_DRIFT_BACKPORT_POLICY.en.md'));

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    cwd: WORKDIR,
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /required Pantheon overlay file is missing/);
});
