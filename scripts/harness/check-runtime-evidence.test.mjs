import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const SCRIPT = path.resolve('harness-engineering/scripts/harness/check-runtime-evidence.mjs');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'runtime-evidence-'));
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'runtime-task'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'docs', 'harness', 'tasks', 'runtime-task.task.md'),
    ['# Task', '', '## Harness Profile', '', '- Coverage Dimensions:', '  - runtime quality'].join('\n'),
  );
  return root;
}

test('check-runtime-evidence passes when runtime signal exists', () => {
  const root = createFixture();
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'runtime-task', 'commands.json'),
    JSON.stringify({
      taskId: 'runtime-task',
      linkage: { taskPacket: 'docs/harness/tasks/runtime-task.task.md' },
      runtimeLogs: ['logs/run.log'],
      knownGaps: [],
    }),
  );
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.warningCount, 0);
});

test('check-runtime-evidence warns when runtime-sensitive task has no signal or gap', () => {
  const root = createFixture();
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'runtime-task', 'commands.json'),
    JSON.stringify({
      taskId: 'runtime-task',
      linkage: { taskPacket: 'docs/harness/tasks/runtime-task.task.md' },
      knownGaps: [],
    }),
  );
  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /runtime-sensitive task evidence has no runtime logs\/metrics\/traces\/performance signal/);
});
