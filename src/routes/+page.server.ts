import type { Load } from "@sveltejs/kit";

import { compile } from 'mdsvex';
import README from './../../README.md?raw';

export const load: Load = async () => {

	const compiledResponse = await compile(README, {});

	console.log('compiledResponse is: ', compiledResponse);

	if (!compiledResponse?.code) {
		return { content: '' }
	}

	const search = '{@html `<code class="language-bash"><span class="token function">npm</span> i zod-actions</code>`}'
	const replace = '<code class="language-bash"><span class="token function">npm</span> i zod-actions</code>'
	const parsed = compiledResponse.code.replace(search, replace)

	return { content: parsed };
};
