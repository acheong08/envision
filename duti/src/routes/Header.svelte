<script lang="ts">
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	import svg_icon from '$lib/svg/ENVISION.svg';
	// Path list for the breadcrumbs split by '/'
	$: pathList = $page.url.pathname.split('/');
</script>

<!--Navbar-->
<nav
	class="navbar bg-base-100/25 backdrop-blur text-primary-content rounded-xm p-0 max-h-1 sticky top-0 z-50 relative "
>
	<div class="navbar-start flex-1">
		<button class="btn btn-square btn-ghost">
			<img src={svg_icon} alt="Envision" class="w-10 h-10" />
		</button>
		<a href="/" class="btn btn-ghost btn-xl normal-case text-xl text-purple-500">Envision</a>
		<div class="flex-1">
			<div class="items-stretch hidden lg:flex">
				<NavLink href="#about" text="About" />
				<NavLink href="/browse" text="Browse" />
				<NavLink href="/contribute" text="Contribute" />
			</div>
		</div>
	</div>
	<div class="flex-none navbar-end">
		<ul class="menu menu-horizontal p-1 menu-sm">
			<li>
				<!--Resources dropdown-->
				<div class="dropdown dropdown-end p-0">
					<div tabindex="0" class="m-1 btn btn-ghost btn-lg text-sm rounded-btn">Resources</div>
					<ul
						tabindex="0"
						class="p-2 shadow menu dropdown-content bg-neutral rounded-box w-52 top-20"
					>
						<li>
							<a href="/resources/textual_inversion" class="btn btn-ghost btn-sm w-full p-5"
								>Textual Inversion</a
							>
						</li>
						<a href="/resources/stable_diffusion" class="btn btn-ghost btn-sm w-full p-5">Stable Diffusion</a>
					</ul>
				</div>
			</li>
			<li>
				<div class="form-control h-13">
					<input type="text" placeholder="Search" class="input input-bordered ring-neutral" />
				</div>
			</li>
			<li>
				<a href="https://github.com/acheong08/">
					<svg
						width="20"
						height="20"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						/></svg
					>
				</a>
			</li>
		</ul>
	</div>
</nav>
<div class="text-sm breadcrumbs">
	<ul>
		{#each pathList as path, i}
			{#if i === 0}
				<li>
					<a href="/" class="text-purple-500">Home</a>
				</li>
			{:else}
				<li>
					<a href={pathList.slice(0, i + 1).join('/')}>{path}</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
<slot />
