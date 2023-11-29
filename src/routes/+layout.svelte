<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
</svelte:head>

<nav>
	<a href="/"><h1>Zod Actions</h1></a>
	<div class="links">
		<a href="simple-form">simple form</a>
		<a href="modal">modal</a>
	</div>
</nav>
<main>
	<slot />
</main>

<style>
	nav {
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-items: center;
	}
	.links {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		justify-items: end;
		align-items: end;
		padding-bottom: 1rem;
		padding-right: 2.5rem;
	}

	.links a {
		height: 2rem;
	}
</style>
