<template>
  <header class="w-full text-gray-700 bg-white">
    <div
      class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl"
    >
      <div class="relative flex flex-col md:flex-row">
        <a
          href="/"
          class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
        >
          <span
            class="mx-auto text-xl font-black leading-none text-gray-900 select-none"
            >tails<span class="text-indigo-600" data-primary="indigo-600"
              >.</span
            ></span
          >
        </a>
        <nav
          class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  to="/"
                  :class="navigationMenuTriggerStyle()"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  >
                    <li v-for="component in movieRoutes" :key="component.title">
                      <NavigationMenuLink as-child>
                        <NuxtLink
                          :to="component.href"
                          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div class="text-sm font-medium leading-none">
                            {{ component.title }}
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                          >
                            {{ component.description }}
                          </p>
                        </NuxtLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Tv Shows</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  >
                    <li
                      v-for="component in tvShowRoutes"
                      :key="component.title"
                    >
                      <NavigationMenuLink as-child>
                        <NuxtLink
                          :to="component.href"
                          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div class="text-sm font-medium leading-none">
                            {{ component.title }}
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                          >
                            {{ component.description }}
                          </p>
                        </NuxtLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
        <!--  -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

const movieRoutes: { title: string; href: string; description: string }[] = [
  {
    title: 'Popular',
    href: '/movies',
    description: 'Watch popular movies you might missed.',
  },
  {
    title: 'Top Rated',
    href: '/movies?filter=top_rated',
    description: 'What movies most people watch nowadays.',
  },
  {
    title: 'Upcoming',
    href: '/movies?filter=upcoming',
    description: 'See what the upcoming movies so you dont want to missed out.',
  },
  {
    title: 'Now Playing',
    href: '/movies?filter=now_playing',
    description: 'Watch movies that now playing.',
  },
];

const tvShowRoutes: { title: string; href: string; description: string }[] = [
  {
    title: 'Popular',
    href: '/tv',
    description: 'Watch popular TV Shows you might missed.',
  },
  {
    title: 'Top Rated',
    href: '/tv?filter=top_rated',
    description: 'What TV Shows most people watch nowadays.',
  },
  {
    title: 'On The Air',
    href: '/tv?filter=on_the_air',
    description:
      'See what the upcoming TV Shows so you dont want to missed out.',
  },
  {
    title: 'Airing Today',
    href: '/tv?filter=airing_today',
    description: 'Watch TV Shows that now playing.',
  },
];
</script>
