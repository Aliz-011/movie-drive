<template>
  <div class="max-w-screen-xl mx-auto w-full h-full">
    <div class="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 class="text-3xl font-bold">Popular Shows</h2>
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
        <ShowCard
          v-for="tv in shows!.results"
          :key="tv.id"
          :id="tv.id"
          :name="tv.name"
          :firstAirDate="tv.first_air_date"
          :voteAverage="tv.vote_average"
          :posterPath="tv.poster_path"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options } from '@/lib/utils';
import { Skeleton } from '~/components/ui/skeleton';
import type { ResponseTvShows } from '~/types';

const { query } = useRoute();

const filter = ref(query.filter ?? 'popular');

const { data: shows, status } = await useLazyAsyncData<ResponseTvShows>(
  `tvs-${filter.value}`,
  () =>
    $fetch(
      `https://api.themoviedb.org/3/tv/${filter.value}?language=en-US&page=1`,
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
  name: 'tv',
  path: '/tv',
});

useSeoMeta({
  title: 'Popular Tv Shows - Movie Drive',
  description: 'Watch popular TV Show you might interested on.',
  ogTitle: 'Popular Tv Shows - Movie Drive',
  ogDescription: 'Watch popular TV Show you might interested on.',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'Popular Tv Shows - Movie Drive',
  twitterDescription: 'Watch popular TV Show you might interested on.',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
});
</script>
