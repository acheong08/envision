<script lang="ts">
	import AI_art from '$lib/images/radioactive_world.png';
	import { onMount } from 'svelte';
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
				<button class="btn btn-accent m-1 btn-outline">Contribute</button>
			</div>
		</div>
	</div>
</div>

<div class="divider" id="about"/>

<div class="container my-20 mx-10">
	<div>
		<article class="prose text-xl">
			<h1>What is Envision?</h1>
			<p>
				Envision is a community driven index of textual inversion models for Stable Diffusion and
				derivatives.
			</p>
			<h2>Why textual inversion?</h2>
			<p>
				The training of the main model is slow and generic. It thus lacks the ability to generate
				less popular and more specific styles and prompts. With textual inversion, users are able to
				use the power of the main model with the added benefits of specific subjects and styles.
			</p>
			<h2>The intent</h2>
			<p>
				Of course, this wasn't created out of the goodness of my heart. This project was born out of
				a desire for easy access to new anime characters and artistic styles that the main model has
				not been trained on yet.
			</p>
			<h2>For "real" artists</h2>
			<p>
				I understand some of you may be freaked out that AI might take over your work. However, I
				say that AI has created greater opportunities for artists.
			</p>
			<p>
				One of my ideas is to create a marketplace for artists to sell their characters and styles
				to the community. After all, that is what makes each artist unique. I will attempt to
				moderate the marketplace to ensure that only true authors are able to sell their work and
				prevent plagiarism.
			</p>
			<h4>Some ideas</h4>
			<ul>
				<li>Allow artists to write or select custom licensing terms</li>
				<li>Require verification of authorship</li>
				<li>
					Alternative marketplace for collaboration between less technical artists and AI trainers
				</li>
			</ul>
		</article>

		<div class="divider" />

		<article class="prose text-lg">
			<h1>The Bullshit of Prompt Selling</h1>
			<h4>TL;DR: Prompt selling is unprofitable for both parties</h4>
			<p>
				There are many aspects of selling a prompt that simply do not make sense for both buyers and
				sellers. I will list some of the obvious ones here.
			</p>
			<ul>
				<li>
					<p>The seller does not hold copyright over the prompt.</p>
					<ul>
						<li>
							Just as one cannot copyright a description of an object, one cannot reserve the right
							to type in a string of text
						</li>
						<li>
							The buyer can legally share the prompt or any derivative of it with anyone they want.
							A good prompt will be shared. It is thus unprofitable for prompt sellers.
						</li>
					</ul>
				</li>
				<li>
					A person with reasonable common sense can easily derive the prompt from the image with
					some trial and error.
				</li>
				<li>
					The prompt does not matter. With enough tries, anyone can stumble across a seed that
					provides optimal results
				</li>
			</ul>
		</article>
	</div>
</div>
