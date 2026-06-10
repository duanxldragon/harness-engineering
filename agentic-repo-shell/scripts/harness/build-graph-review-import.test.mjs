import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'build-graph-review-import.mjs');

function makeFixture(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function makeFakeCodegraph(root, handlers, platform = process.platform) {
  const helperPath = path.join(root, 'codegraph-helper.js');
  const commandPath = path.join(root, 'codegraph.cmd');
  const powershellPath = path.join(root, 'codegraph.ps1');
  const posixPath = path.join(root, 'codegraph');
  fs.writeFileSync(
    helperPath,
    `const handlers = ${JSON.stringify(handlers, null, 2)};
const command = process.argv[2];
if (command === 'sync') {
  console.log('synced');
  process.exit(0);
}
const payload = handlers[command];
if (!payload) {
  console.error('unknown command');
  process.exit(1);
}
console.log(JSON.stringify(payload, null, 2));
`,
  );
  fs.writeFileSync(commandPath, `@echo off\r\nnode "%~dp0\\codegraph-helper.js" %*\r\n`);
  fs.writeFileSync(powershellPath, `node "$PSScriptRoot/codegraph-helper.js" @args\n`);
  fs.writeFileSync(
    posixPath,
    `#!/usr/bin/env sh
node "$(dirname "$0")/codegraph-helper.js" "$@"
`,
  );
  if (platform !== 'win32' && process.platform !== 'win32') {
    fs.chmodSync(posixPath, 0o755);
  }
  return {
    helperPath,
    commandPath,
    powershellPath,
    posixPath,
    codegraphBin: platform === 'win32' ? commandPath : posixPath,
  };
}

test('repo-shell build-graph-review-import mirrors root behavior', () => {
  const root = makeFixture('build-graph-review-import-shell-');
  const source = path.join(root, 'trace.json');
  fs.writeFileSync(
    source,
    JSON.stringify(
      {
        trace: [{ name: 'router' }, { name: 'service' }, { name: 'repo' }],
        checks: ['cycle'],
        findings: ['imported finding'],
      },
      null,
      2,
    ),
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--source', source], { encoding: 'utf8' });
  const result = JSON.parse(output);

  assert.deepEqual(result.affectedSubgraph, ['router -> service -> repo']);
  assert.deepEqual(result.checks, ['cycle']);
});

test('repo-shell build-graph-review-import fake codegraph fixture exposes a POSIX executable wrapper', () => {
  const root = makeFixture('build-graph-review-import-live-shell-');

  const { codegraphBin } = makeFakeCodegraph(root, {}, 'linux');

  assert.equal(codegraphBin, path.join(root, 'codegraph'));
  assert.equal(fs.existsSync(codegraphBin), true);
  assert.equal(
    fs.readFileSync(codegraphBin, 'utf8'),
    `#!/usr/bin/env sh
node "$(dirname "$0")/codegraph-helper.js" "$@"
`,
  );
  if (process.platform !== 'win32') {
    assert.notEqual(fs.statSync(codegraphBin).mode & 0o111, 0);
  }
});

test('repo-shell build-graph-review-import supports live codegraph mode', () => {
  const root = makeFixture('build-graph-review-import-live-shell-');
  const { codegraphBin } = makeFakeCodegraph(root, {
    callers: { symbol: 'Authenticate', callers: [{ name: 'LoginHandler' }] },
    callees: { symbol: 'Authenticate', callees: [{ name: 'Login' }] },
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT,
      '--codegraph-path',
      'D:\\repo\\example-app',
      '--codegraph-bin',
      codegraphBin,
      '--live-callers',
      'Authenticate',
      '--live-callees',
      'Authenticate',
    ],
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${root};${process.env.PATH ?? ''}` },
    },
  );
  const result = JSON.parse(output);

  assert.deepEqual(result.affectedSubgraph, ['Authenticate -> Login', 'LoginHandler -> Authenticate']);
  assert.deepEqual(result.checks, ['call-depth']);
});
