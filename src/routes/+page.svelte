<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types.js';
	import { schema } from './schema.js';
	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
		schema,
		form
	);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
</svelte:head>
<main class="container">
	<h1>Form example</h1>
	<form
		action="?/do_thing"
		method="post"
		use:zodActionEnhance
		use:cleanErrorOnInput
		use:invalidateInputs
	>
		{#if $errors.desc}
			<span class="warning" transition:fade>{$errors.desc}</span>
		{/if}
		<input type="text" name="desc" placeholder="description" />

		{#if $errors.age}
			<span class="warning" transition:fade>{$errors.age}</span>
		{/if}
		<input type="number" name="age" placeholder="age" />

		<button type="submit" aria-busy={$state.loading}>SEND</button>
	</form>
</main>

<style>
	.warning {
		color: red;
	}
</style>
