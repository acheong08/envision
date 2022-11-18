<script lang="ts">
	export let files: any = [];
</script>

<div class="">
	<div class="mb-3 w-96">
		<input
			bind:files
            accept="image/*"
            type="file"
			class="form-control
                block
                w-full
                px-3
                py-1.5
                w-full max-w-xl ml-5 my-2
                font-normal
                bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:border-blue-600 focus:outline-none"
			id="formFile"
		/>
	</div>
</div>
