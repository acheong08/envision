<!-- Layout for the index page. Uses daisyUI for CSS -->
<script>
	import '$lib/css/styles.css';
	import Header from './Header.svelte'
	import Footer from './Footer.svelte';
</script>
<Header/>
<slot/>
<Footer/>