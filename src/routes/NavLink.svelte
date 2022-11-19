<!--This is a nested link type -->

<script lang="ts">
    export let href: string;
    export let text: string;
</script>

<a href={href} class="btn btn-ghost text-sm rounded-btn btn-md lg:btn-lg">{text}</a>