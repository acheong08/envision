<script lang="ts">
	import AI_art from '$lib/images/radioactive_world.png';
</script>

<svelte:head>
	<title>Envision | Home</title>
	<meta
		name="description"
		content="An index of textual inversion for Stable Diffusion and derivatives"
	/>
</svelte:head>

<div>
	<div class="hero min-h-screen bg-base-100 " style="background-image: url({AI_art});">
		<div class="hero-overlay bg-opacity-60" />
		<div class="hero-content text-left">
			<div class="">
				<h1 class="text-5xl font-bold" id="gradientAnimation">Welcome to Envision</h1>
				<p class="py-6 text-2xl">
					The (soon to be) ultimate index of textual inversion, Hypernetworks, and Embeddings.
				</p>
				<a href="/browse"><button class="btn btn-primary m-1">Browse</button></a>
				<a href="/contribute"><button class="btn btn-accent m-1 btn-outline">Contribute</button></a>
			</div>
		</div>
	</div>
</div>