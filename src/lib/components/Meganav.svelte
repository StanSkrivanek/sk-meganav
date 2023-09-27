<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let title = '';
	let hasSubMenu;
	let menuLinks;
	let subMenus;
	let subMenuLinks;
	let activeSubMenu = null; // Initialize active submenu as null
	let isMenuActive = false;
	let isSubMenuActive = false;
	// Function to toggle the active submenu
	function toggleSubMenu(subMenu) {
		if (activeSubMenu === subMenu) {
			activeSubMenu = null; // Close the submenu
		} else {
			activeSubMenu = subMenu;
		}
	}

	// Function to close the active submenu
	function closeSubMenu() {
		activeSubMenu = null;
	}

	onMount(() => {
		hasSubMenu = [...document.querySelectorAll('.has-children > span')];
		subMenus = [...document.querySelectorAll('.sub-menu')];
		menuLinks = [...document.querySelectorAll('.menu-main a')];
		subMenuLinks = [...document.querySelectorAll('.sub-menu a')];

		menuLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (window.innerWidth < 991) {
					// close main sidebar menu
					isMenuActive = false;
				}
				closeSubMenu();
			});
		});
		hasSubMenu.forEach((node) => {
			node.addEventListener('click', () => {
				if (window.innerWidth < 991) {
					isSubMenuActive = !isSubMenuActive;
					// take node child -> prevent display chevron
					title = node.childNodes[0].nodeValue;
					return;
				}
				// do some stuff ??
			});
		});
		subMenus.forEach((node) => {
			node.addEventListener('mouseleave', () => {
				if (window.innerWidth < 991) {
					return;
				}
				closeSubMenu();
			});
		});

		subMenuLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (window.innerWidth < 991) {
					isMenuActive = false;
					isSubMenuActive = false;
				}
				closeSubMenu();
			});
		});
	});
</script>

<header class="header">
	<div class="nav-container">
		<div class="row">
			<a class="nav-logo" href="/"><img src="/images/svg/hiStranger-1.svg" alt="logo" /></a>
			<!-- menu starts here -->
			<div class="nav-center">
				<div
					class="menu-overlay"
					class:active={isMenuActive}
					role="button"
					tabindex="0"
					on:click={() => (isMenuActive = !isMenuActive)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							isMenuActive = !isMenuActive;
						}
					}}
				/>

				<nav class="menu" class:active={isMenuActive}>
					<div class="nav-header-mobile">
						{#if isSubMenuActive === true}
							<div
								class="nav-btn--back"
								role="button"
								tabindex="0"
								on:click={() => {
									toggleSubMenu();
									isSubMenuActive = false;
									title = '';
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										toggleSubMenu();
										isSubMenuActive = false;
									}
								}}
								aria-label="Go back"
							>
								&#10229;
							</div>
						{/if}

						<div class="nav-current-title">{title}</div>
						<div
							class="nav-btn--close"
							aria-label="Close menu"
							role="button"
							tabindex="0"
							on:click={() => (isMenuActive = !isMenuActive)}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									isMenuActive = !isMenuActive;
								}
							}}
						>
							<span>&#10005;</span>
						</div>
					</div>
					<ul role="list" class="menu-main">
						<li><a href="/">Home</a></li>
						<!-- <li><a href="/contact">Contact Us</a></li> -->
						<li class="has-children">
							<span
								role="button"
								aria-haspopup="true"
								on:click={() => toggleSubMenu(1)}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') toggleSubMenu(1);
								}}
								tabindex="0">COURSES <span class="chevron">&#x276F;</span></span
							>

							<div class="sub-menu mega-menu {activeSubMenu === 1 ? 'active' : ''}">
								<!-- Active -->
								<div class="sub-item__c">
									<ul>
										<li><a href="/">OVERVIEW</a></li>
										<li><a href="/contact">ALL TRAININGS</a></li>
										<li><a href="/">OPEN FOR APPLICATIONS</a></li>
									</ul>
									<div class="image-item">
										<img src="https://picsum.photos/300/200" alt="" />
									</div>
								</div>
								<div class="sub-item__c">
									<div class="sub--title">FUNDATION TRAINING</div>
									<ul>
										<li>
											<a href="/contact">Part 1: SHEP Certificate in Personal Development</a>
										</li>
										<li>
											<a href="/"
												>Part 2: The SHEP Certificate in Social Awareness and Community Empowerment</a
											>
										</li>
									</ul>
								</div>
								<div class="sub-item__c">
									<div class="sub--title">FACILITATOR TRAINING</div>
									<ul>
										<li><a href="/contact">SHEP Certificate in Facilitation</a></li>
										<li><a href="/">Specialised Tutor Training Courses</a></li>
										<li><a href="/contact">Leadership Course</a></li>
										<li><a href="/">Advocacy Training</a></li>
										<li><a href="/contact">Continuing Practitioner Development</a></li>
									</ul>
								</div>
							</div>
						</li>
						<li class="has-children">
							<span
								role="button"
								aria-haspopup="true"
								on:click={() => toggleSubMenu(2)}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') toggleSubMenu(2);
								}}
								tabindex="0">TRAININGS <span class="chevron">&#x276F;</span></span
							>

							<div class="sub-menu mega-menu {activeSubMenu === 2 ? 'active' : ''}">
								<!-- Active -->
								<div class="sub-item__c">
									<ul>
										<li><a href="/">OVERVIEW</a></li>
										<li><a href="/contact">ALL TRAININGS</a></li>
										<li><a href="/">OPEN FOR APPLICATIONS</a></li>
									</ul>
									<div class="image-item">
										<img src="https://picsum.photos/300/200" alt="" />
									</div>
								</div>
							</div>
						</li>
						<li><a href="/contact">Contact Us</a></li>
					</ul>
				</nav>
			</div>

			<button
				class="nav-btn--trigger"
				aria-label="Toggle menu"
				on:click={() => (isMenuActive = !isMenuActive)}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						isMenuActive = !isMenuActive;
					}
				}}
			>
				<span>&#9776;</span>
			</button>
		</div>
	</div>
</header>

<style>
	/* NAVIGATION */
	.nav-container {
		width: 100%;
		background-color: #fff;
		border: var(--border);
		height: var(--mobile-nav-header);
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	.nav-logo {
		width: var(--mobile-nav-header);
		height: var(--mobile-nav-header);
		padding: 0.5rem;
	}

	/* MENU */
	.menu,
	.menu-main {
		position: relative;
		/* height: 100%; */
		background-color: #fff;
		height: 100%;
	}
	.menu-main > li > span,
	.menu-main > li > a {
		display: flex;
		height: 100%;
		align-items: center;
		text-decoration: none;
		padding: 10px;
		color: var(--clr-text-secondary);
	}

	.has-children:hover,
	.menu-main > li > a:hover {
		background-color: var(--nav-link-hover);
		border-radius: 0.4rem;
	}
	.menu-main {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.chevron {
		display: inline-block;
		font-size: 0.9rem;
		margin-left: 0.5rem;
		color: var(--clr-text-secondary);
		transform: rotate(90deg);
	}
	.nav-btn--trigger {
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem 1rem;
	}
	/* subMenus */
	.sub-menu {
		position: absolute;
		display: flex;
		grid-gap: 1rem;
		margin-top: 0.5rem;
		background-color: #fff;
		border: var(--border);
		padding: 1rem 1.5rem;
		box-shadow: -2px 2px 70px -25px rgba(0, 0, 0, 0.8);
		border-radius: 8px;
		font-size: 1rem;
		transform: translateX(-50%);
		transition: all 0.3s ease;
		width: 75vw;
		max-width: 1100px;
		left: 50%;
		visibility: hidden;
		opacity: 0;
	}
	.sub-menu ul {
		display: block;
		list-style: none;
		padding: 0;
	}
	.sub-menu ul li {
		transition: all 0.3s ease;
	}
	.sub-menu ul li:hover {
		background-color: var(--nav-link-hover);
		border-radius: 0.4rem;
	}

	/* ul li > span {
		display: block;
		padding: 0.5rem;
		text-decoration: none;
		cursor: pointer;
		color: var(--clr-text-secondary);
	} */
	li > span,
	.sub-menu a {
		display: block;
		padding: 0.5rem;
		text-decoration: none;
		cursor: pointer;
		color: var(--clr-text-secondary);
	}

	.sub-item__c {
		flex-basis: 33%;
	}

	.sub--title {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: var(--border);
	}
	.image-item img {
		width: 100%;
		margin-top: 0.5rem;
		overflow: hidden;
		border-radius: 8px;
	}

	/* MOBILE NAV */
	.nav-header-mobile {
		display: none;
		position: sticky;
		top: 0;
		background-color: #ffffff;
		justify-content: space-between;
		align-items: center;
		z-index: 200;
	}

	/* ================ MEDIA QUERIES ================ */

	@media (width > 991px) {
		/* .has-children:hover .sub-menu {
			visibility: visible;
			opacity: 1;
		} */
		.sub-menu.active {
			visibility: visible;
			opacity: 1;
			transition: all 0.5s ease;
		}

		.nav-btn--trigger {
			visibility: hidden;
		}
	}

	@media (width < 991px) {
		/* .menu-overlay.active {
			visibility: visible;
			opacity: 1;
			transition: all 0.5s ease;
		} */

		.nav-btn--back {
			display: flex;
			justify-content: center;
			align-items: center;
			width: var(--mobile-nav-header);
			height: var(--mobile-nav-header);
			font-size: 1.5rem;
			cursor: pointer;
			border-right: var(--border);
		}
		.nav-current-title {
			flex-grow: 1;
			text-align: center;
			font-size: 1.2rem;
			font-weight: 600;
		}
		.nav-btn--close {
			display: flex;
			justify-content: center;
			align-items: center;
			width: var(--mobile-nav-header);
			height: var(--mobile-nav-header);
			font-size: 1.5rem;
			cursor: pointer;
			border-left: var(--border);
		}
		.menu {
			position: fixed;
			display: block;
			min-width: 320px;
			max-width: 400px;
			left: 0%;
			top: 0%;
			overflow: hidden;
			overflow-y: auto;
			height: 100%;
			transform: translate(-100%);
			transition: transform 0.5s ease;
			z-index: 200;
		}

		.menu.active {
			transform: translate(0%);
			transition: transform 0.5s ease;
		}

		.nav-header-mobile {
			display: flex;
			height: var(--mobile-nav-header);
			border-bottom: var(--border);
		}

		.menu-main {
			position: relative;
			top: 0;
			display: block;
			height: calc(100% - var(--mobile-nav-header));
			overflow: hidden;
			overflow-y: auto;
		}
		.menu-main > li > span,
		.menu-main > li > a {
			display: block;
			padding: 1rem;
			transition: all 0.3s ease;
		}
		.menu-main > li > span:hover,
		.menu-main > li > a:hover {
			background-color: var(--nav-link-hover);
			border-radius: 0;
		}

		.sub-menu {
			position: absolute;
			display: block;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			max-height: 100%;
			margin-top: 0;
			border-radius: 0;
			border: none;
			box-shadow: none;
			transform: translate(50%);
			width: auto;
			padding: 1rem;
			transition: all 0.5s ease;
			overflow-y: auto;
			visibility: hidden;
			opacity: 0;
			z-index: 105;
		}
		.sub-menu ul li a {
			display: block;
			padding: 1rem 0.5rem;
		}
		.sub-menu ul li:last-child {
			border-bottom: none;
		}
		.sub--title {
			font-size: 1.2rem;
			padding: 1rem 0;
		}

		.sub-menu.active {
			display: block;
			transform: translate(0%);
			visibility: visible;
			opacity: 1;
			transition: transform 0.5s ease;
		}

		@keyframes slideLeft {
			0% {
				/* opacity: 0; */
				transform: translateX(100%);
			}
			100% {
				/* opacity: 1; */
				transform: translateX(0%);
			}
		}

		@keyframes slideRight {
			0% {
				/* opacity: 1; */
				transform: translateX(0%);
			}
			100% {
				/* opacity: 0; */
				transform: translateX(100%);
			}
		}

		.menu-overlay {
			position: fixed;
			background-color: var(--clr-text-base);
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			visibility: hidden;
			opacity: 0;
			/* transition: all 0.5s ease; */
			z-index: 105;
		}

		.menu-overlay.active {
			visibility: visible;
			opacity: 0.6;
			transition: all 0.5s ease;
		}
	}
</style>
