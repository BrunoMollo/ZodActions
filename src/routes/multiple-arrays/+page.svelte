<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types.js';
	import { animalsSchema } from './animalsSchema.js';

	export let form: ActionData;

	const zodAction = createForm(animalsSchema, form);
	const { zodActionEnhance, revalidateInput } = zodAction;
	const { state, errors } = zodAction;
</script>

<article class="container">
	<h2>From with arrays</h2>
	<form action="" method="post" use:zodActionEnhance use:revalidateInput>
		<span>Owner</span>
		<input
			type="text"
			name="owner"
			placeholder="owner"
			aria-invalid={$errors.owner ? true : null}
		/>
		{#if $errors.owner}
			<span class="warn" transition:fade>{$errors.owner}</span>
		{/if}

		<div class="pets-container">
			<section>
				<span>Dogs</span>
				{#each [0, 1] as i}
					<label>
						<input
							type="text"
							name="dogs[{i}].name"
							placeholder="dog {i + 1} name"
							id="dogs"
							aria-invalid={$errors.dogs?.at(i, 'name') ? true : null}
						/>
						{#if $errors.dogs?.at(i, 'name')}
							<span class="warn" transition:fade> {$errors.dogs.at(i, 'name')}</span>
						{/if}
					</label>
				{/each}
			</section>
			<section>
				<span>Cats</span>
				{#each [0, 1] as i}
					<label>
						<input
							type="text"
							name="cats[{i}].name"
							placeholder="cat {i + 1} name"
							aria-invalid={$errors.cats?.at(i, 'name') ? true : null}
						/>
						{#if $errors.cats?.at(i, 'name')}
							<span class="warn" transition:fade> {$errors.cats.at(i, 'name')}</span>
						{/if}
					</label>
				{/each}
			</section>
		</div>
		<button type="submit" aria-busy={$state.loading}>SEND</button>
	</form>
</article>

<style>
	section {
		width: 100%;
		margin-bottom: 0;
	}
	label {
		width: 100%;
	}
	input {
		margin-bottom: 0;
	}
	.warn {
		color: red;
	}
	article {
		padding: 3rem;
	}
	.pets-container {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
