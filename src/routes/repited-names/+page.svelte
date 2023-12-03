<script lang="ts">
	import { enhance } from '$app/forms';
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { animalsSchema } from './animalsSchema.js';
	import { processFormdataWithArrays } from '$lib/utils/processFormdataWithArrays.js';
	import { error } from '@sveltejs/kit';
	import { formatErrors } from '$lib/utils/formatErrors.js';

	export let form: ActionData;
	const { zodActionEnhance, state, errors, cleanErrorOnInput, invalidateInputs } = createForm(
		animalsSchema,
		form
	);
</script>

<article class="container">
	<h2>Simple form</h2>
	<form
		action=""
		method="post"
		use:enhance={({ formData, formElement }) => {
			const a = processFormdataWithArrays(formData, formElement);
			const zodRes = animalsSchema.safeParse(a);
			if (!zodRes.success) {
				formatErrors(zodRes);
			}
		}}
	>
		<input type="text" name="owner" placeholder="owner" />
		<input data-array="pets" type="text" name="name" placeholder="animal name" />
		<input data-array="pets" type="text" name="age" placeholder="animal age" />
		<input data-array="pets" type="text" name="name" placeholder="animal name" />
		<input data-array="pets" type="text" name="age" placeholder="animal age" />
		<input data-array="other" type="text" name="other" placeholder="other " />

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
