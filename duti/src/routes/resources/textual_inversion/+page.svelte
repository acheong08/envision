<script lang="ts">
	import textual_inversion from '$lib/images/textual_inversion.png';
</script>

<div class="container mx-auto m-10 mx-10">
	<article class="prose min-w-full">
		<h1 class="flex justify-center">Textual Inversion</h1>
		<grid class="grid grid-cols-2 gap-2">
			<div>
				<h2>What is Textual Inversion?</h2>
				<p class="text-lg">
					Textual Inversion allows you to train a tiny part of the neural network on your own
					pictures, and use results when generating new ones. In this context, embedding is the name
					of the tiny bit of the neural network you trained. The result of the training is a .pt or
					a .bin file (former is the format used by original author, latter is by the diffusers
					library) with the embedding in it. See original site for more details about what textual
					inversion is:
					<a href="https://textual-inversion.github.io/">here</a>
				</p>
			</div>
			<div>
				<img src={textual_inversion} alt="Textual Inversion Example" />
			</div>
		</grid>
		<h2 class="flex justify-center">Hypernetworks and Embeddings</h2>
		<div class="grid grid-cols-2 gap-2">
			<div>
				<h3>Embeddings</h3>
				<p>
					Trains a word with one or more vectors that approximate your image. So if it is something
					it already has seen lots of examples of, it might have the concept and just need to
					'point' at it. It is just expanding the vocabulary of model but all information it uses is
					already in the model.
				</p>
			</div>
			<div>
				<h3>Hypernetworks</h3>
				<p>
					This is basically an adaptive head - it takes information from late in the model but
					injects information from the prompt 'skipping' the rest of the model. So it is similar to
					fine tuning the last 2 layers of a model but it gets much more signal from the prompt (it
					is taking the clip embedding of the prompt right before the output layer).
				</p>
			</div>
		</div>
	</article>
</div>
