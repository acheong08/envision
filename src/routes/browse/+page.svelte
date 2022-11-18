<script lang="ts">
	import { loginStatus } from '$lib/ts/stores/status';
	import { auth, db } from '$lib/ts/firebase';
	import {
		collection,
		query,
		getDocs,
		orderBy,
		startAfter,
		limit,
		endAt,
		limitToLast,
		where
	} from 'firebase/firestore';

	let signedIn: boolean = false;

	loginStatus.subscribe((value) => {
		signedIn = value;
	});

	auth.onAuthStateChanged(async (user) => {
		if (user) {
			loginStatus.set(true);
			getModels();
		} else {
			loginStatus.set(false);
		}
	});

	let search: string;

	const db_ref = collection(db, 'models');

	let models: any = [];
	let lastVisible: any = null;

	async function getModels() {
		// Build search query from search string (if any)
		// Get models collection from firestore ordered by document id
		let q;
		if (search == undefined || search == '') {
			q = await query(db_ref, orderBy('__name__'), limit(12));
		} else {
			// Split search string into array of words
			let search_words: string[] = search.split(' ');
			let where_clauses: any[] = [];
			search_words.forEach(word => {
				// Add where clause for each word
				where_clauses.push(where(`search.${word}`, '==', true));
			});
			q = await query(db_ref, orderBy('__name__'), limit(12), ...where_clauses);
		}
		const querySnapshot = await getDocs(q);
		models = querySnapshot.docs.map((doc) => doc.data());
		// Get document id of last model
		lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
		return true;
	}

	async function nextPagination() {
		// Get models collection from firestore ordered by document id
		const q = await query(db_ref, orderBy('title'), startAfter(lastVisible.id), limit(12));
		const querySnapshot = await getDocs(q);
		models = querySnapshot.docs.map((doc) => doc.data());
		// Get document id of last model
		if (querySnapshot.docs.length > 0) {
			lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
		}
		// Print document id of last model
		console.log(lastVisible);
		return true;
	}

	async function previousPagination() {
		// Get models collection from firestore ordered by document id
		const q = await query(db_ref, orderBy('title'), endAt(lastVisible.id), limitToLast(12));
		const querySnapshot = await getDocs(q);
		// If only one model is returned, then we are at the beginning of the collection
		if (querySnapshot.docs.length == 1) {
			return false;
		}
		models = querySnapshot.docs.map((doc) => doc.data());
		// Get document id of last model
		if (models.length > 0) {
			lastVisible = querySnapshot.docs[0];
		}
		// Debug log lastVisible
		console.log(lastVisible);
		return true;
	}
	// Array-contains-all for firestore
	

	import Card from './card.svelte';
</script>

<div class="container my-5">
	<div class="form-control h-13 m-5">
		<input
			type="text"
			placeholder="Search tags"
			class="input input-bordered ring-neutral w-full"
			bind:value={search}
		/>
		<button on:click={getModels} type="submit" class="btn btn-neutral"> Search </button>
	</div>
	<div class="grid gap-4 m-8 auto-rows-auto grid-cols-3 grid-flow-row" id="model-list">
		{#if signedIn}
			{#each models as model}
				<div>
					<Card
						title={model.title}
						description={model.description}
						preview={model.preview}
						tags={model.tags}
						source={model.source}
						readme={model.readme}
						download={model.download}
						author={model.author}
					/>
				</div>
			{/each}
		{:else}
			<div class="text-center">
				<h1 class="text-4xl">Please sign in to view models</h1>
			</div>
		{/if}
	</div>
	<button on:click={previousPagination} class="btn btn-primary btn-xl m-5">Previous</button>
	<button on:click={nextPagination} class="btn btn-primary btn-xl m-5">Next</button>
</div>
