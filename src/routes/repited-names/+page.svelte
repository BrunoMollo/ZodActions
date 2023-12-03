<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { animalsSchema } from './animalsSchema.js';

	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
		animalsSchema,
		form
	);
</script>

<article class="container">
	<h2>From with arrays</h2>
	<form action="" method="post" use:zodActionEnhance use:cleanErrorOnInput use:invalidateInputs>
		{#if $errors.owner}
			<span class="warn">{$errors.owner}</span>
		{/if}
		<input type="text" name="owner" placeholder="owner" />

		{#each [0, 1] as i}
			{#if $errors.pets?.[i].name}
				<span class="warn"> {$errors.pets?.[i].name}</span>
			{/if}
			<input type="text" name="pets__name" placeholder="animal name" />
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
