<template>
  <div class="max-w-screen-xl mx-auto w-full h-full">
    <div class="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 class="text-3xl font-bold">Popular Movies</h2>
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
          v-for="movie in popularMovies?.results"
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
import { Skeleton } from '~/components/ui/skeleton';
import type { ResponseMovies } from '~/types';

const { query } = useRoute();

const filter = ref(query.filter ?? 'popular');

const { data: popularMovies, status } = await useLazyAsyncData<ResponseMovies>(
  `movies-${filter.value}`,
  () =>
    $fetch(
      `https://api.themoviedb.org/3/movie/${filter.value}?language=en-US&page=1`,
      {
        ...options,
        query: {
          filter: filter.value,
        },
      }
    ),
  {
    watch: [filter],
  }
);

definePageMeta({
  name: 'movies',
  path: '/movies',
});

useSeoMeta({
  title: 'Popular Movies - Movie Drive',
  description: 'Watch popular movies you might interested on.',
  ogTitle: 'Popular Movies - Movie Drive',
  ogDescription: 'Watch popular movies you might interested on.',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'Popular Movies - Movie Drive',
  twitterDescription: 'Watch popular movies you might interested on.',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
});
</script>
