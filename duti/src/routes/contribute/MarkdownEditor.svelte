<script lang="ts">
	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	const plugins = [
		gfm()
		// Add more plugins here
	];
	import 'bytemd/dist/index.css';
	export let value: string;
	export let placeholder: string;
	function handleChange(e: { detail: { value: string; }; }) {
		value = e.detail.value;
	}
</script>

<Editor {value} {plugins} on:change={handleChange} {placeholder} />
