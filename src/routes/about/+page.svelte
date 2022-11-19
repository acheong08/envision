<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import about from '$lib/markdown/about.md?raw';
</script>

<div class="divider" id="about" />

<div class="container my-10 mx-10">
	<article class="prose w-screen text-xl">
		<SvelteMarkdown source={about} />
	</article>
</div>
