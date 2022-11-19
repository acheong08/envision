<script lang="ts">
  import { loginStatus } from "$lib/ts/stores/status";
  import { auth, db } from "$lib/ts/firebase";
  import { doc, addDoc, collection } from "firebase/firestore";

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
  import InputText from "./InputText.svelte";
  import InputTextArea from "./InputTextArea.svelte";
  import InputImage from "./InputImage.svelte";
  import MarkdownEditor from "./MarkdownEditor.svelte";
  let model_title: string;
  let model_description: string;
  let model_preview: any = [];
  let model_tags: string;
  let model_source: string;
  let model_readme: string;
  let model_download: string;

  async function toBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async function submit() {
    ///// Check if user is signed in /////
    if (!signedIn) {
      const tags = model_tags.split(" ");
      // Map tags to object 'tag': true (not an array)
      const tags_obj: any = {};
      tags.forEach((tag) => {
        tags_obj[tag] = true;
      });
	  console.log(tags_obj)
      alert("You must be signed in to submit a model.");
      return;
    }
    ///// Model preview /////
    // If model_preview is empty, error
    if (!model_preview) {
      alert("You must upload a preview image.");
      return;
    }
    // Convert model_preview to base64
    let preview_base64: string = await toBase64(model_preview[0]);
    // remove data:image/png;base64, and other data url from base64
    preview_base64 = preview_base64.replace(/^data:image\/[a-z]+;base64,/, "");
    // Upload model preview to freeimage.host
    const formData = new FormData();
    formData.append("key", "6d207e02198a847aa98d0a2a901485a5");
    formData.append("source", preview_base64);
    formData.append("format", "json");
    // Bypass CORS via proxy
    const response = await fetch("https://images.duti.tech/proxy/api/1/upload", {
      method: "POST",
      body: formData,
    });
    // Parse response as JSON and check status code
    let data = await response.json();
    // Remove first 2 characters ?( and last character )
    // Parse data as JSON
    if (data.status_code !== 200) {
      alert("Error uploading model preview");
      return;
    }
    console.log(data);
    // Get URL of uploaded image from parsed JSON
    const preview_url = data.image.url;
    ///// Model tags /////
    // Split tags by spaces
    const tags = model_tags.split(" ");
    // Map tags to object 'tag': true (not an array)
    const tags_obj: any = {};
    tags.forEach((tag) => {
      tags_obj[tag] = true;
    });
    /// Author ///
    const model_author: string = auth.currentUser?.displayName!;
    ///// Upload model to Firebase /////
    // Create model object
    const model = {
      title: model_title,
      description: model_description,
      preview: preview_url,
      tags: tags,
      search: tags_obj,
      source: model_source,
      readme: model_readme,
      download: model_download,
      uid: auth.currentUser!.uid,
      author: model_author,
    };
    // Upload model to Firebase
    await addDoc(collection(db, "models"), model);
    // Save model into local storage
    localStorage.setItem("model_title", model_title);
    localStorage.setItem("model_author", model_author)
    localStorage.setItem("model_description", model_description);
    localStorage.setItem("model_preview", preview_url);
    localStorage.setItem("model_tags", model_tags);
    localStorage.setItem("model_source", model_source);
    localStorage.setItem("model_readme", model_readme);
    localStorage.setItem("model_download", model_download);
    // Redirect to model page
    window.location.href = `/browse/model`;
  }
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
      <InputImage bind:files={model_preview} />
      {#if model_preview}
        {#each model_preview as file}
          <p>{file.name} ({file.size} bytes)</p>
        {/each}
      {/if}
      <h2 class="text-2xl">Tags</h2>
      <InputText
        placeholder="Separate tags with spaces"
        maxlength={512}
        bind:value={model_tags}
      />
      <h2 class="text-2xl">Source</h2>
      <InputText
        placeholder="Link to source code"
        maxlength={2000}
        bind:value={model_source}
      />
      <h2 class="text-2xl">Download</h2>
      <InputText
        placeholder="Link to download"
        maxlength={2000}
        bind:value={model_download}
      />
    </div>
    <div>Empty for now</div>
  </div>
  <h2 class="text-2xl">Readme</h2>
  <div class="m-5 prose min-w-full">
    <MarkdownEditor
      bind:value={model_readme}
      placeholder="Enter markdown code"
    />
  </div>
  <button class="btn btn-primary btn-2xl w-full mt-5" on:click={submit}
    >Submit</button
  >
</div>
