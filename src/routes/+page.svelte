<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { schema } from './schema.js';
	export let form: ActionData;
	const { zodActionEnhance, state, errors } = createForm(schema, form);
</script>

<form action="?/do_thing" method="post" use:zodActionEnhance>
	{#if $state.loading}
		<div>loading</div>
	{/if}

	{#if $errors.desc}
		<p>{$errors.desc}</p>
	{/if}
	<label for="desc">description</label>
	<input type="text" name="desc" id="desc" />

	<br />
	<button type="submit">enviar</button>
</form>
