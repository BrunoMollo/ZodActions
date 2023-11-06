<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types.js';
	import { schema } from './schema.js';
	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput } = createForm(schema, form);
</script>

<form action="?/do_thing" method="post" use:zodActionEnhance use:cleanErrorOnInput>
	{#if $state.loading}
		<div>loading</div>
	{/if}

	<input type="text" name="desc" placeholder="description" />
	{#if $errors.desc}
		<span transition:fade>{$errors.desc}</span>
	{/if}

	<br />
	<input type="number" name="age" placeholder="age" />
	{#if $errors.age}
		<span transition:fade>{$errors.age}</span>
	{/if}

	<br />
	<button type="submit">enviar</button>
</form>
