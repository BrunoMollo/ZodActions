<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types.js';
	import { studentSchema } from './studentSchema.js';
	export let form: ActionData;

	const zodAction = createForm(studentSchema, form);
	const { zodActionEnhance, cleanErrorOnInput } = zodAction;
	const { state, errors } = zodAction;
</script>

<article class="container">
	<h2>Simple form</h2>
	{#if $state.done}
		<article data-testid="success_alert">Form succesfully sent</article>
	{/if}
	<form action="?/do_thing" method="post" use:zodActionEnhance use:cleanErrorOnInput>
		{#if $errors.name}
			<span data-testid="warn_name" class="warn" transition:fade>{$errors.name}</span>
		{/if}
		<input
			type="text"
			name="name"
			placeholder="full name"
			aria-invalid={$errors.name ? true : null}
		/>

		{#if $errors.age}
			<span data-testid="warn_age" class="warn" transition:fade>{$errors.age}</span>
		{/if}
		<input
			type="number"
			name="age"
			placeholder="current age"
			aria-invalid={$errors.age ? true : null}
		/>

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
