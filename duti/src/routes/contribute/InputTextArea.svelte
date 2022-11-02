<script lang="ts">
    export let placeholder: string;
    export let value: string;
</script>

<textarea class="textarea textarea-bordered w-full max-w-xl ml-5 my-2" maxlength="128" placeholder={placeholder} bind:value></textarea>