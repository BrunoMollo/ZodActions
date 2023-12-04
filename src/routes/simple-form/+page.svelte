<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types.js';
	import { studentSchema } from './studentSchema.js';
	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
		studentSchema,
		form
	);
</script>

<article class="container">
	<h2>Simple form</h2>
	{#if $state.done}
		<article data-testid="success_alert">Form succesfully sent</article>
	{/if}
	<form
		action="?/do_thing"
		method="post"
		use:zodActionEnhance
		use:cleanErrorOnInput
		use:invalidateInputs
	>
		{#if $errors.name}
			<span data-testid="warn_name" class="warn" transition:fade>{$errors.name}</span>
		{/if}
		<input type="text" name="name" placeholder="full name" />

		{#if $errors.age}
			<span data-testid="warn_age" class="warn" transition:fade>{$errors.age}</span>
		{/if}
		<input type="number" name="age" placeholder="age" />

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
