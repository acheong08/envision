<script lang="ts">
  import { db } from "$lib/ts/firebase";
  import {
    collection,
    query,
    getDocs,
    orderBy,
    startAfter,
    limit,
    endAt,
    limitToLast,
    where,
  } from "firebase/firestore";
  import { onMount } from "svelte";

  onMount(async () => {
    getModels();
  });

  let search: string;

  const db_ref = collection(db, "models");

  let models: any = [];
  let lastVisible: any = null;

  function generate_where_clause(tags: string): any {
    if (tags == "" || tags == " " || tags == undefined || tags == null) {
      return [];
    }
    let tags_array = tags.split(" ");
    let where_clause: any = [];
    tags_array.forEach((tag) => {
      where_clause.push(where(`search.${tag}.duplicates`, "<=", 0));
    });
    return where_clause;
  }

  async function getModels() {
    // Build search query from search string (if any)
    // Get models collection from firestore ordered by document id
    let q;
    q = await query(
      db_ref,
      // orderBy("title"),
      limit(12),
      ...generate_where_clause(search)
    );
    const querySnapshot = await getDocs(q);
    models = querySnapshot.docs.map((doc) => doc.data());
    // Get document id of last model
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return true;
  }

  async function nextPagination() {
    // Get models collection from firestore ordered by document id
    const q = await query(
      db_ref,
      // orderBy("title"),
      startAfter(lastVisible.id),
      limit(12),
      ...generate_where_clause(search)
    );
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
    const q = await query(
      db_ref,
      // orderBy("title"),
      endAt(lastVisible.id),
      limitToLast(12),
      ...generate_where_clause(search)
    );
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

  import Card from "./card.svelte";
</script>

<div class="container my-5">
  <div class="form-control h-13 m-5">
    <input
      type="text"
      placeholder="Search tags"
      class="input input-bordered ring-neutral w-full"
      bind:value={search}
    />
    <button on:click={getModels} type="submit" class="btn btn-neutral">
      Search
    </button>
  </div>
  <div
    class="mx-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center"
    id="model-list"
  >
    {#each models as model}
      <div class="flex">
        <Card
          title={model.title}
          description={model.description}
          preview={model.preview}
          tags={model.search}
          source={model.source}
          readme={model.readme}
          download={model.download}
          author={model.author}
        />
      </div>
    {/each}
  </div>
  <button on:click={previousPagination} class="btn btn-primary btn-xl m-5"
    >Previous</button
  >
  <button on:click={nextPagination} class="btn btn-primary btn-xl m-5"
    >Next</button
  >
</div>
