<script lang="ts">
	import { enhance } from '$app/forms';
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { animalsSchema } from './animalsSchema.js';
	export let form: ActionData;
	// const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
	// 	animalsSchema,
	// 	form
	// );
</script>

<article class="container">
	<h2>Simple form</h2>
	<form
		action=""
		method="post"
		use:enhance={({ formData }) => {
			console.log(Object.fromEntries(formData));
		}}
	>
		<input type="text" name="name" placeholder="animal name" />
		<input type="text" name="age" placeholder="animal age" />
		<input type="text" name="name" placeholder="animal name" />
		<input type="text" name="age" placeholder="animal age" />

		<button type="submit">SEND</button>
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
