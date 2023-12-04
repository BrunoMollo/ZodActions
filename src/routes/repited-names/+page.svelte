<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { animalsSchema } from './animalsSchema.js';

	export let form: ActionData;

	const zodAction = createForm(animalsSchema, form);
	const { zodActionEnhance, cleanErrorOnInput } = zodAction;
	const { state, errors } = zodAction;
</script>

<article class="container">
	<h2>From with arrays</h2>
	<form action="" method="post" use:zodActionEnhance use:cleanErrorOnInput>
		{#if $errors.owner}
			<span class="warn">{$errors.owner}</span>
		{/if}
		<input type="text" name="owner" placeholder="owner" />

		{#each [0, 1] as i}
			{#if $errors.dogs?.at(i, 'name')}
				<span class="warn"> {$errors.dogs.at(i, 'name')}</span>
			{/if}
			<input type="text" name="dogs[{i}].name" placeholder="dog name" />
		{/each}
		{#each [0, 1] as i}
			{#if $errors.cats?.at(i, 'name')}
				<span class="warn"> {$errors.cats.at(i, 'name')}</span>
			{/if}
			<input type="text" name="cats[{i}].name" placeholder="dog name" />
		{/each}

		<button type="submit" aria-busy={$state.loading}>SEND</button>
	</form>
</article>

<style>
	.warn {
		color: red;
	}
	article {
		padding: 3rem;
	}
</style>
