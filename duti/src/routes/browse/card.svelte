<script lang="ts">
	export let title: string;
	export let description: string;
	export let preview: string;
	export let tags: string[];
	export let source: string;
    export let readme: string;

    function clickHandler() {
        localStorage.setItem('model_title', title)
        localStorage.setItem('model_source', source);
        localStorage.setItem('model_readme', readme);
        // open link to model page
        window.location.href = '/browse/model';
    }
</script>

<div class="card w-80 max-h-100 bg-base-100 shadow-xl overflow-auto" on:click={clickHandler}>
	<!-- <a href={source}> -->
		<figure><img src={preview} alt="preview" /></figure>
		<div class="card-body">
			<h2 class="card-title">
				{title}
			</h2>
			<p>{description}</p>
			<div class="card-actions justify-end overflow-auto">
				{#each tags as tag}
					<div class="badge badge-outline">{tag}</div>
				{/each}
			</div>
		</div>
	<!-- </a> -->
</div>
