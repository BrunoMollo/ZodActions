<script lang="ts">
	import type { ZodAction } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import type { petSchema } from './petSchema.js';

	export let zodAction: ZodAction<typeof petSchema.shape>;
	export let action: string;
	const { zodActionEnhance, revalidateInput } = zodAction;
	const { state, errors } = zodAction;
</script>

<form {action} method="post" use:zodActionEnhance use:revalidateInput on:reset|preventDefault>
	{#if $errors.name}
		<span data-testid="warn_name" class="warn" transition:fade>{$errors.name}</span>
	{/if}
	<input
		type="text"
		name="name"
		placeholder="name"
		aria-invalid={$errors.name ? true : $state.done ? false : null}
	/>

	<button type="submit" aria-busy={$state.loading}>SEND</button>
</form>

<style>
	.warn {
		color: red;
	}
</style>
