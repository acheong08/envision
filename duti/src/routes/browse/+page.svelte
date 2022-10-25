<script lang="ts">
	import { loginStatus } from '$lib/ts/store';
	import { auth, db } from '$lib/ts/firebase';
	import { getDoc, doc, collection, query, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

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

	async function getModel() {
		// Get models collection from firestore
		const q = await query(collection(db, 'models'));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => doc.data());
	}

	import Card from './card.svelte';
</script>

<div class="grid gap-4 m-8 auto-rows-auto grid-cols-auto grid-flow-col" id="model-list">
	{#if signedIn}
		{#await getModel()}
			<div>Loading...</div>
		{:then models}
			{#each models as model}
				<div>
					<Card
						title={model.title}
						description={model.description}
						preview={model.preview}
						tags={model.tags}
					/>
				</div>
			{/each}
		{:catch error}
			<div>Error: {error.message}</div>
		{/await}
	{/if}
</div>
