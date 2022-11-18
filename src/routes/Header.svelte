<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	import svg_icon from '$lib/svg/ENVISION.svg';
	import known_user from '$lib/svg/known_user.svg';
	import unknown_user from '$lib/svg/unknown_user.svg';
	// Path list for the breadcrumbs split by '/'
	$: pathList = $page.url.pathname.split('/');

	// Firebase
	import { initializeApp } from 'firebase/app';
	const firebaseConfig = {
		apiKey: 'AIzaSyBp3sb7VaYx6PrlugxqI-phwncNoSjFiZ4',
		authDomain: 'diffusion-561b0.firebaseapp.com',
		projectId: 'diffusion-561b0',
		storageBucket: 'diffusion-561b0.appspot.com',
		messagingSenderId: '608701698816',
		appId: '1:608701698816:web:4c9b292a88c6778e6499e5',
		measurementId: 'G-CE1DMWW123'
	};
	const app = initializeApp(firebaseConfig);

	// Auth
	import { signInWithPopup, signOut } from 'firebase/auth';
	import { provider, auth } from '$lib/ts/firebase';
	import { loginStatus } from '$lib/ts/stores/status';

	let signedIn: boolean;
	loginStatus.subscribe((value) => {
		signedIn = value;
	});

	let username: any = 'Not logged in';

	function login() {
		signInWithPopup(auth, provider);
	}
	function logout() {
		signOut(auth);
	}
	auth.onAuthStateChanged((user) => {
		if (user) {
			loginStatus.set(true);
			username = user.displayName;
		} else {
			loginStatus.set(false);
		}
	});
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
				<NavLink href="/about" text="About" />
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
						<a href="/resources/stable_diffusion" class="btn btn-ghost btn-sm w-full p-5"
							>Stable Diffusion</a
						>
					</ul>
				</div>
			</li>
			<!-- <li>
				<div class="form-control h-13">
					<input type="text" placeholder="Search" class="input input-bordered ring-neutral" />
				</div>
			</li> -->
			<li>
				<div>
					{#if !signedIn}
						<img
							src={unknown_user}
							class="w-8 h-8 bg-white rounded"
							id="signInBtn"
							alt="User icon"
							on:click={login}
						/>
					{:else}
						<img
							src={known_user}
							class="w-8 h-8 rounded"
							id="signOutBtn"
							alt="User icon"
							on:click={logout}
						/>
					{/if}
				</div>
			</li>
		</ul>
	</div>
</nav>
<div class="grid grid-cols-2 gap-2 mx-5">
	<div class="text-sm breadcrumbs max-w-sm flex-1">
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
	<div class="">
		<!-- Logged in status -->
		{#if signedIn}
			<p class="text-sm text-right">Logged in as {username}</p>
		{:else}
			<p class="text-sm text-right">Not logged in</p>
		{/if}
	</div>
</div>
<slot />
