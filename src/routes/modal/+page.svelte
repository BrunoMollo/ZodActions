<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { error } from '@sveltejs/kit';
	import type { ActionData } from './$types.js';
	import { fruitSchema } from './fruitSchema.js';
	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
		fruitSchema,
		form
	);
	let dialog: HTMLDialogElement;
</script>

<article class="container">
	<dialog bind:this={dialog}>
		<article>
			<h3>New Fruit</h3>
			{#if $errors.name}
				<span class="warn">{$errors.name}</span>
			{/if}
			<form action="" method="POST" use:zodActionEnhance use:invalidateInputs>
				<input type="text" name="name" placeholder="Fruit name" />
				<button type="submit" aria-busy={$state.loading}>Add</button>
			</form>
			<button on:click={() => dialog.close()}>close</button>
		</article>
	</dialog>

	<button on:click={() => dialog.showModal()}>add fruit</button>
</article>

<style>
	article {
		padding: 3rem;
	}
	.warn {
		color: red;
	}
</style>
