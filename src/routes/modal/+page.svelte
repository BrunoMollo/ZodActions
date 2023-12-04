<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types.js';
	import type { ActionData } from './$types.js';
	import { fruitSchema } from './fruitSchema.js';

	export let data: PageData;
	export let form: ActionData;

	let dialog: HTMLDialogElement;

	const zodAction = createForm(fruitSchema, form);
	const { zodActionEnhance, cleanErrorOnInput } = zodAction;
	const { state, errors, failData } = zodAction;
</script>

<article class="container">
	<h2>Form in a modal</h2>
	<dialog bind:this={dialog}>
		<article>
			<h3>New Fruit</h3>

			{#if $failData}
				<span class="warn" data-testid="warn_fail" transition:fade>{$failData.msj}</span>
			{/if}

			{#if $errors.name}
				<span class="warn" data-testid="warn_name" transition:fade>{$errors.name}</span>
			{/if}
			<form
				action=""
				method="POST"
				use:zodActionEnhance
				use:cleanErrorOnInput
				on:submitDone={() => dialog.close()}
			>
				<input
					type="text"
					name="name"
					placeholder="Fruit name"
					required
					aria-invalid={$errors.name ? true : null}
				/>
				<button type="submit" aria-busy={$state.loading}>Add</button>
			</form>
			<button on:click={() => dialog.close()} class="secondary">Close</button>
		</article>
	</dialog>

	<button on:click={() => dialog.showModal()} data-testid="open_dialog">add fruit</button>

	<ul>
		{#each data.fruits as fruit}
			<li data-testid="fruit_list_item" transition:fade>{fruit.name}</li>
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
