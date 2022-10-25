<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	// get model_readme from localStorage
	async function getModel() {
		const title = localStorage.getItem('model_title');
		const readme = localStorage.getItem('model_readme');
		const source = localStorage.getItem('model_source');
		return { title, readme, source };
	}
</script>

<div class="container m-auto my-10">
	{#await getModel()}
		<div>Loading...</div>
	{:then model}
		<article class="prose">
			<a href={model.source}><h1>{model.title}</h1></a>
		</article>
		<SvelteMarkdown source={model.readme} />
	{/await}
</div>
