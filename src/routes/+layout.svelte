<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
</svelte:head>

<nav>
	<a href="/"><h1>Zod Actions</h1></a>
	<div class="links">
		<a href="simple-form">simple form</a>
		<a href="modal">modal</a>
		<a href="repited-names">repited names</a>
	</div>
</nav>
<main>
	<slot />
</main>
<footer class="container">
	Repo: <a href="https://github.com/BrunoMollo/ZodActions">
		https://github.com/BrunoMollo/ZodActions</a
	>
</footer>

<style>
	nav {
		padding-left: 1rem;
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-items: center;
	}
	.links {
		margin: 1rem;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		padding-right: 2.5rem;
	}
</style>
