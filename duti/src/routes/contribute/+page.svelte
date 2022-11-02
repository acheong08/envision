<script lang="ts">
	import { loginStatus } from '$lib/ts/stores/status';
	import { auth, db } from '$lib/ts/firebase';
	import { doc, setDoc } from 'firebase/firestore';

	let signedIn: boolean = false;
	loginStatus.subscribe((value) => {
		signedIn = value;
	});

	auth.onAuthStateChanged(async (user) => {
		if (user) {
			loginStatus.set(true);
		} else {
			loginStatus.set(false);
		}
	});
	import InputText from './InputText.svelte';
	import InputTextArea from './InputTextArea.svelte';
	import InputImage from './InputImage.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';
	let model_title: string;
	let model_description: string;
	let model_preview: string;
	let model_tags: string;
	let model_source: string;
	let model_readme: string;
	let model_download: string;
</script>

<div class="container mx-8 my-10">
	<div class="grid grid-cols-3 gap-3">
		<div class="col-span-2">
			<h1 class="text-4xl">Submit your model</h1>
			<p>View terms and conditions</p>
			<br />
			<h2 class="text-2xl">Title</h2>
			<InputText
				placeholder="This should match the embedding identifier"
				maxlength={32}
				bind:value={model_title}
			/>
			<h2 class="text-2xl">Description</h2>
			<InputTextArea
				placeholder="A short description of your model"
				bind:value={model_description}
			/>
			<h2 class="text-2xl">Preview</h2>
			<InputImage bind:value={model_preview} />
			<h2 class="text-2xl">Tags</h2>
			<InputText placeholder="Separate tags with spaces" maxlength={512} bind:value={model_tags} />
			<h2 class="text-2xl">Source</h2>
			<InputText placeholder="Link to source code" maxlength={512} bind:value={model_source} />
			<h2 class="text-2xl">Download</h2>
			<InputText placeholder="Link to download" maxlength={512} bind:value={model_download} />
		</div>
		<div>Empty for now</div>
	</div>
	<h2 class="text-2xl">Readme</h2>
	<div class="m-5 prose min-w-full">
		<MarkdownEditor bind:value={model_readme} placeholder="Enter markdown code" />
	</div>
</div>
