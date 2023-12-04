<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { createSlots } from '$lib/index.js';
	import type { ActionData } from './$types.js';
	import { todosSchema } from './todosSchema.js';

	export let form: ActionData;

	const zodAction = createForm(todosSchema, form);
	const { zodActionEnhance, cleanErrorOnInput } = zodAction;
	const { state, errors } = zodAction;

	const todosSlots = createSlots(1, 4);
</script>

<article class="container">
	<h2>Form with variable array</h2>
	{#if $state.done}
		<article data-testid="success_alert">Form succesfully sent</article>
	{/if}
	<div style="display:flex; flex-direction: row; gap:2rem">
		<button on:click={todosSlots.add} disabled={!$todosSlots.canAdd()}>ADD</button>
		<button on:click={todosSlots.remove} disabled={!$todosSlots.canRemove()}>REMOVE</button>
	</div>
	<form action="" method="post" use:zodActionEnhance use:cleanErrorOnInput>
		{#each $todosSlots as i}
			{#if $errors.todos?.at(i, 'desc')}
				<span class="warn">{$errors.todos.at(i, 'desc')}</span>
			{/if}
			<input name="todos[{i}].desc" type="text" placeholder="task {i + 1}" />
		{/each}
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
