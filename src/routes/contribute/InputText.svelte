<script lang="ts">
    export let placeholder: string;
    export let maxlength: number;
    export let value: string;
</script>

<input type="text" {maxlength} placeholder={placeholder} class="input input-bordered w-full max-w-xl ml-5 my-2 overflow-auto" bind:value />