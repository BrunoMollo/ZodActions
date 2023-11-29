<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types.js';
	import type { ActionData } from './$types.js';
	import { fruitSchema } from './fruitSchema.js';

	export let data: PageData;
	export let form: ActionData;
	const { zodActionEnhance, state, errors, failData, invalidateInputs, cleanErrorOnInput } =
		createForm(fruitSchema, form);
	let dialog: HTMLDialogElement;
</script>

<article class="container">
	<dialog bind:this={dialog}>
		<article>
			<h3>New Fruit</h3>

			{#if $failData}
				<span class="warn">{$failData.msj}</span>
			{/if}

			{#if $errors.name}
				<span class="warn" transition:fade>{$errors.name}</span>
			{/if}
			<form
				action=""
				method="POST"
				use:zodActionEnhance
				use:invalidateInputs
				use:cleanErrorOnInput
				on:submitDone={() => dialog.close()}
			>
				<input type="text" name="name" placeholder="Fruit name" />
				<button type="submit" aria-busy={$state.loading}>Add</button>
			</form>
			<button on:click={() => dialog.close()} class="secondary">Close</button>
		</article>
	</dialog>

	<button on:click={() => dialog.showModal()}>add fruit</button>

	<ul>
		{#each data.fruits as fruit}
			<li transition:fade>{fruit.name}</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding: 3rem;
	}
	.warn {
		color: red;
	}
</style>
