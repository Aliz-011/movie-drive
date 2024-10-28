<template>
  <div class="max-w-screen-xl mx-auto w-full h-full">
    <div class="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 class="text-3xl font-bold">Now Trending</h2>
      <section
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6 xl:gap-8"
        v-if="status === 'pending'"
      >
        <div
          v-for="(_, index) in 8"
          class="flex flex-col space-y-3 max-w-sm"
          :key="index"
        >
          <Skeleton class="h-[300px] w-[250px] rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
          </div>
        </div>
      </section>

      <section
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6 xl:gap-8"
        v-else
      >
        <MovieCard
          v-for="movie in movies?.results"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title || movie.name"
          :releaseDate="movie.release_date"
          :voteAverage="movie.vote_average"
          :posterPath="movie.poster_path"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options } from '@/lib/utils';
import type { ResponseMovies } from '~/types';

import { Skeleton } from '@/components/ui/skeleton';

const { data: movies, status } = await useAsyncData<ResponseMovies>(
  'movies-trending',
  () =>
    $fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', {
      ...options,
    }),
  {
    lazy: true,
  }
);

useSeoMeta({
  title: 'Movie Drive',
  description: 'Watch all complete full movies you might interested on.',
  ogTitle: 'Movie Drive',
  ogDescription: 'Watch all complete full movies you might interested on.',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'Movie Drive',
  twitterDescription: 'Watch all complete full movies you might interested on.',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
});
</script>
