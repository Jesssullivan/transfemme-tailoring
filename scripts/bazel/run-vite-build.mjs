import { spawn } from 'node:child_process';
import { chmodSync, cpSync, existsSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const viteCli = resolve(dirname(require.resolve('vite/package.json')), 'bin/vite.js');

if (existsSync('.svelte-kit/tsconfig.json')) {
	const tempDir = mkdtempSync(join(tmpdir(), 'site-scaffold-svelte-kit-'));
	const tempTypes = join(tempDir, '.svelte-kit');

	cpSync('.svelte-kit', tempTypes, { recursive: true, dereference: true });
	rmSync('.svelte-kit', { recursive: true, force: true });
	cpSync(tempTypes, '.svelte-kit', { recursive: true });
	chmodTree('.svelte-kit');
}

const child = spawn(process.execPath, [viteCli, 'build'], {
	stdio: 'inherit',
});

child.on('error', (error) => {
	console.error(error);
	process.exit(1);
});

child.on('exit', (code) => {
	process.exit(code ?? 1);
});

function chmodTree(path) {
	const stat = statSync(path);
	if (stat.isDirectory()) {
		chmodSync(path, 0o755);
		for (const entry of readdirSync(path)) {
			chmodTree(join(path, entry));
		}
	} else {
		chmodSync(path, 0o644);
	}
}
