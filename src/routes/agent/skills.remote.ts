import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { prerender } from '$app/server';

// RU3 (remote functions are the estate pattern): the agent route's server data
// is a `prerender` remote function instead of a `+page.server.ts` load. It runs
// at build time on the server side only, its result is serialized into the
// static output, and adapter-static serves it without a runtime. A dynamic
// spoke (adapter-node) can turn the same function into a `query`.

type SkillFrontmatter = {
	name: string;
	description: string;
	disable_model_invocation?: boolean;
	argument_hint?: string;
};

export type SkillEntry = SkillFrontmatter & {
	href: string;
	body_preview: string;
};

const SKILLS_DIR = '.agents/skills';
const REPO_URL = 'https://github.com/jesssullivan/transfemme-tailoring';

function parseFrontmatter(raw: string): { fields: SkillFrontmatter; body: string } | null {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return null;
	const [, fmRaw, body] = match;
	const fields: Record<string, string> = {};
	let currentKey: string | null = null;
	const buf: string[] = [];
	for (const line of fmRaw.split('\n')) {
		const fieldMatch = line.match(/^([a-z][a-z0-9_-]*):\s*(.*)$/);
		if (fieldMatch) {
			if (currentKey !== null) fields[currentKey] = buf.join('\n').trim();
			currentKey = fieldMatch[1];
			buf.length = 0;
			if (fieldMatch[2]) buf.push(fieldMatch[2]);
		} else if (currentKey !== null) {
			buf.push(line.replace(/^\s+/, ''));
		}
	}
	if (currentKey !== null) fields[currentKey] = buf.join('\n').trim();
	if (!fields.name || !fields.description) return null;
	return {
		fields: {
			name: fields.name,
			description: fields.description,
			disable_model_invocation: fields['disable-model-invocation'] === 'true',
			argument_hint: fields['argument-hint'],
		},
		body,
	};
}

async function loadSkills(): Promise<SkillEntry[]> {
	let entries: string[];
	try {
		entries = await readdir(SKILLS_DIR);
	} catch {
		return [];
	}
	const skills: SkillEntry[] = [];
	for (const dir of entries.sort()) {
		const path = join(SKILLS_DIR, dir, 'SKILL.md');
		let raw: string;
		try {
			raw = await readFile(path, 'utf8');
		} catch {
			continue;
		}
		const parsed = parseFrontmatter(raw);
		if (!parsed) continue;
		const preview = parsed.body
			.split('\n')
			.filter((l) => l.trim().length > 0 && !l.startsWith('#'))
			.slice(0, 2)
			.join(' ')
			.slice(0, 220);
		skills.push({
			...parsed.fields,
			href: `${REPO_URL}/blob/main/${SKILLS_DIR}/${dir}/SKILL.md`,
			body_preview: preview,
		});
	}
	return skills;
}

export const getSkills = prerender(async () => loadSkills());
