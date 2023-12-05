<script lang="ts">
	import { createForm } from '$lib/index.js';
	import type { ActionData } from '../$types.js';
	import Component from './Component.svelte';
	import { petSchema } from './petSchema.js';

	export let form: ActionData;
</script>

<div style="display: flex; flex-direction: row; gap:2rem; padding-inline: 20%;">
	<article class="container">
		<h3>Cats</h3>
		<Component zodAction={createForm(petSchema, form)} action="?/add_cat" />
	</article>
	<article class="container">
		<h3>Dogs</h3>
		<Component zodAction={createForm(petSchema, form)} action="?/add_dog" />
	</article>
</div>

<style>
	article {
		padding: 3rem;
	}
</style>
