<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	// get model_readme from localStorage
	async function getModel() {
		const title = localStorage.getItem('model_title');
		const readme = localStorage.getItem('model_readme');
		const source = localStorage.getItem('model_source');
		const download = localStorage.getItem('model_download');
		const description = localStorage.getItem('model_description');
		const author = localStorage.getItem('model_author');
		return { title, readme, source, download, description, author };
	}
</script>

<div class="container m-auto">
	{#await getModel()}
		<div>Loading...</div>
	{:then model}
		<div class="grid grid-cols-2 gap-4">
			<div>
				<article class="prose m-5">
					<h1>{model.title}</h1>
					<SvelteMarkdown source={model.readme} />
				</article>
			</div>
			<div>
				<div class="card w-96 bg-neutral text-neutral-content">
					<div class="card-body">
						<h2 class="card-title">{model.title}</h2>
						<p>Author: {model.author}</p>
						<p>{model.description}</p>
						<div class="card-actions justify-end">
							<a href={model.source} class="btn btn-primary">Source</a>
							<a href={model.download}><button class="btn btn-secondary">Download</button></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/await}
</div>
