<template>
  <main class="max-w-7xl mx-auto w-full min-h-screen space-y-8">
    <div
      class="w-full flex items-center justify-center"
      v-if="movieStatus === 'pending'"
    >
      <Skeleton class="w-full h-[50vh]" />
      <div class="flex flex-col space-y-2">
        <Skeleton class="w-full h-20" />
        <Skeleton class="w-1/2 h-20" />
      </div>
    </div>

    <div class="w-full flex flex-col gap-4" v-else>
      <NuxtImg
        :src="`${imageConfig.images.secure_base_url}${
          imageConfig.images.backdrop_sizes[
            imageConfig.images.backdrop_sizes.length - 1
          ]
        }/${movie?.backdrop_path}`"
        :alt="movie?.title || movie?.name"
        loading="lazy"
        class="h-[50vh] object-cover rounded-lg w-full"
      />

      <div class="flex gap-4 w-full">
        <div class="relative max-w-sm">
          <NuxtImg
            :src="`${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${movie?.poster_path}`"
            :alt="movie?.title || movie?.name"
            class="object-cover rounded size-full"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-2 w-full">
          <h1 class="text-2xl font-medium">
            {{ movie?.title || movie?.name }}
          </h1>
          <p class="italic text-muted-foreground text-xs">
            {{ movie.tagline }}
          </p>

          <div class="flex items-center gap-3 pt-1">
            <span class="text-xs flex items-center font-semibold">
              <LucideCalendar
                class="size-4 mr-2 text-rose-500"
                strokeWidth="{2.4}"
              />
              {{ movie.release_date }}
            </span>
            <p class="text-xs inline-flex items-center font-semibold">
              <LucideClock
                class="size-4 mr-2 text-yellow-500"
                strokeWidth="{2.4}"
              />
              <span>{{ movie.runtime }} Minutes</span>
            </p>
          </div>

          <hr class="w-full my-2 border-dashed" />

          <p class="text-sm text-muted-foreground">
            <span class="font-bold">
              Rating: {{ Number(movie.vote_average).toFixed(2) }}
            </span>
            &nbsp;({{ movie.vote_count }} votes)
          </p>

          <div class="flex items-center gap-x-4 my-2">
            <span
              class="rounded-full px-2.5 py-0.5 text-white text-sm font-medium bg-gray-500/40 dark:bg-gray-400/30"
              v-for="genre in movie!.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <article class="prose prose-slate dark:prose-invert w-full max-w-none">
        <p>
          <em>{{ movie.overview }}</em>
        </p>
      </article>
    </div>

    <div class="mt-8 space-y-1">
      <h2 class="text-2xl font-semibold tracking-wide">Similiar</h2>
      <p class="text-sm text-muted-foreground">You might like these.</p>
    </div>

    <div class="relative" v-if="similiarMoviesStatus === 'pending'">
      <div class="flex items-center space-x-4 pb-4">
        <div v-for="(_, index) in 8" :key="index" class="space-y-3 w-[150px]">
          <Skeleton class="w-full h-[250px]" />
          <div class="flex flex-col space-y-2">
            <Skeleton class="w-full h-4" />
            <Skeleton class="w-2/3 h-4" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative" v-else>
      <ScrollArea>
        <div class="flex space-x-4 pb-4">
          <div
            v-for="similiar in similiarMovies.results"
            :key="similiar.id"
            class="space-y-3 w-[150px]"
          >
            <NuxtLink
              :to="`/movie/${similiar.id}`"
              class="overflow-hidden rounded-md"
            >
              <NuxtImg
                :src="`${imageConfig.images.secure_base_url}${
                  imageConfig.images.poster_sizes[
                    imageConfig.images.poster_sizes.length - 1
                  ]
                }/${similiar.poster_path}`"
                :alt="similiar.title"
                :width="150"
                :height="150"
                loading="lazy"
                class="size-auto object-cover transition-all hover:scale-105 aspect-square rounded-md"
              />
            </NuxtLink>
            <div class="space-y-1 text-sm">
              <NuxtLink :to="`/movie/${similiar.id}`">
                <h3 class="font-medium leading-none line-clamp-1">
                  {{ similiar.title }}
                </h3>
              </NuxtLink>
              <p class="text-xs text-muted-foreground inline-flex items-center">
                <LucideStar
                  class="mr-2 size-3 text-yellow-500 fill-yellow-500"
                />
                {{ Number(similiar.vote_average).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  </main>
</template>

<script setup lang="ts">
import { options } from '@/lib/utils';
import { imageConfig } from '@/lib/image.config';
import type { Movie, ResponseMovies } from '~/types';

const { movieId } = useRoute().params;

const { data: movie, status: movieStatus } = await useLazyAsyncData<Movie>(
  `movie-${movieId}`,
  () =>
    $fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      ...options,
    })
);

const { data: similiarMovies, status: similiarMoviesStatus } =
  await useLazyAsyncData<ResponseMovies>(`similiar-movies`, () =>
    $fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      {
        ...options,
      }
    )
  );

definePageMeta({
  name: 'movie-details',
  path: '/movies/:movieId',
});

useSeoMeta({
  title: `${movie.value?.title || movie.value?.name} - Movie Drive`,
  description: movie.value?.overview || '',
  ogTitle: `${movie.value?.title || movie.value?.name} - Movie Drive`,
  ogDescription: movie.value?.overview,
  ogImage: `${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${movie.value?.poster_path}`,
  ogUrl: `http://localhost:3000/movies/${movieId}`,
  twitterTitle: `${movie.value?.title || movie.value?.name} - Movie Drive`,
  twitterDescription: movie.value?.overview,
  twitterImage: `${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${movie.value?.poster_path}`,
  twitterCard: 'summary',
});
</script>
