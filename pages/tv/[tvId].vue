<template>
  <main class="max-w-7xl mx-auto w-full min-h-screen space-y-8">
    <div
      class="w-full flex items-center justify-center"
      v-if="tvStatus === 'pending'"
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
        }/${tv?.backdrop_path}`"
        :alt="tv?.name"
        loading="lazy"
        class="h-[50vh] object-cover rounded-lg w-full"
      />

      <div class="flex gap-4 w-full">
        <div class="relative max-w-sm">
          <NuxtImg
            :src="`${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${tv?.poster_path}`"
            :alt="tv?.name"
            class="object-cover rounded size-full"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-2 w-full">
          <h1 class="text-2xl font-medium">
            {{ tv?.name }}
          </h1>
          <p class="italic text-muted-foreground text-xs">
            {{ tv?.tagline }}
          </p>

          <div class="flex items-center gap-3 pt-1">
            <span class="text-xs flex items-center font-semibold">
              <LucideMonitorCheck
                class="size-4 mr-2 text-rose-500"
                strokeWidth="{2.4}"
              />
              {{ tv?.status }}
            </span>
            <p class="text-xs inline-flex items-center font-semibold">
              <LucideLayers3
                class="size-4 mr-2 text-yellow-500"
                strokeWidth="{2.4}"
              />
              <span
                >{{ tv?.number_of_seasons }} seasons ({{
                  tv?.number_of_episodes
                }}
                episodes)</span
              >
            </p>
          </div>

          <hr class="w-full my-2 border-dashed" />

          <p class="text-sm text-muted-foreground">
            <span class="font-bold">
              Rating: {{ Number(tv.vote_average).toFixed(2) }}
            </span>
            &nbsp;({{ tv.vote_count }} votes)
          </p>

          <div class="flex items-center gap-x-4 my-2">
            <span
              class="rounded-full px-2.5 py-0.5 text-white text-sm font-medium bg-gray-500/40 dark:bg-gray-400/30"
              v-for="genre in tv!.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <article class="prose prose-slate dark:prose-invert w-full max-w-none">
        <p>
          <em>{{ tv.overview }}</em>
        </p>
      </article>
    </div>

    <div class="mt-8 space-y-1">
      <h2 class="text-2xl font-semibold tracking-wide">Similiar</h2>
      <p class="text-sm text-muted-foreground">You might like these.</p>
    </div>

    <div class="relative">
      <ScrollArea>
        <div class="flex space-x-4 pb-4">
          <div
            v-for="similiar in similiarShows.results"
            :key="similiar.id"
            class="space-y-3 w-[150px]"
          >
            <NuxtLink
              :to="`/tv/${similiar.id}`"
              class="overflow-hidden rounded-md"
            >
              <NuxtImg
                :src="`${imageConfig.images.secure_base_url}${
                  imageConfig.images.poster_sizes[
                    imageConfig.images.poster_sizes.length - 1
                  ]
                }/${similiar.poster_path}`"
                :alt="similiar.name"
                :width="150"
                :height="150"
                loading="lazy"
                class="size-auto object-cover transition-all hover:scale-105 aspect-square rounded-md"
              />
            </NuxtLink>
            <div class="space-y-1 text-sm">
              <NuxtLink :to="`/tv/${similiar.id}`">
                <h3 class="font-medium leading-none line-clamp-1">
                  {{ similiar.name }}
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
import type { ResponseTvShows, TvShowDetails } from '~/types';

const { params } = useRoute();

const { data: tv, status: tvStatus } = await useLazyAsyncData<TvShowDetails>(
  `tv-${params.tvId}`,
  () =>
    $fetch(`https://api.themoviedb.org/3/tv/${params.tvId}?language=en-US`, {
      ...options,
    })
);

const { data: similiarShows } = await useLazyAsyncData<ResponseTvShows>(
  `similiar-tvs`,
  () =>
    $fetch(
      `https://api.themoviedb.org/3/tv/${params.tvId}/similar?language=en-US&page=1`,
      {
        ...options,
      }
    )
);

definePageMeta({
  name: 'tv-details',
  path: '/tv/:tvId',
});

useSeoMeta({
  title: `${tv.value?.name} - Movie Drive`,
  description: tv.value?.overview || '',
  ogTitle: `${tv.value?.name} - Movie Drive`,
  ogDescription: tv.value?.overview,
  ogImage: `${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${tv.value?.poster_path}`,
  ogUrl: `http://localhost:3000/tv/${params.tvId}`,
  twitterTitle: `${tv.value?.name} - Movie Drive`,
  twitterDescription: tv.value?.overview,
  twitterImage: `${imageConfig.images.secure_base_url}${imageConfig.images.poster_sizes[3]}/${tv.value?.poster_path}`,
  twitterCard: 'summary',
});
</script>
