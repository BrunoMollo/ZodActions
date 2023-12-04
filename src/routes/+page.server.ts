import type { Load } from "@sveltejs/kit";

import { compile } from 'mdsvex';

export const load: Load = async () => {

	try {
		const response = await fetch('https://raw.githubusercontent.com/BrunoMollo/ZodActions/main/README.md')
		const md = await response.text()

		const compiledResponse = await compile(md, {});

		if (!compiledResponse?.code) {
			return { content: '' }
		}

		const search = '{@html `<code class="language-bash"><span class="token function">npm</span> i zod-actions</code>`}'
		const replace = '<code class="language-bash"><span class="token function">npm</span> i zod-actions</code>'
		const parsed = compiledResponse.code.replace(search, replace)

		return { content: parsed };

	} catch {
		return { content: '' }
	}

};
