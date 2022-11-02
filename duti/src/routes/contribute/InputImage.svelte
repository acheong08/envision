<script lang="ts">
	export let value: string;
</script>

<div class="">
	<div class="mb-3 w-96">
		<input
			bind:value
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
			type="file"
			id="formFile"
		/>
	</div>
</div>
