<script lang="ts">
	import { createForm } from '$lib/formCreate.js';
	import type { ActionData } from './$types.js';
	import { schema } from './schema.js';
	export let form: ActionData;
	const { zodActionEnhance } = createForm(schema, form);
</script>

<form action="?/do_thing" method="post" use:zodActionEnhance>
	<input type="text" name="desc" />
	<button type="submit">enviar</button>
</form>
