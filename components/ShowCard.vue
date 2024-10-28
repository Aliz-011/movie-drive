<template>
  <div class="rounded relative w-full cursor-pointer">
    <NuxtLink
      :to="{ name: 'tv-details', params: { tvId: id } }"
      :prefetch="true"
      prefetch-on="interaction"
      class="relative w-full max-w-sm overflow-hidden"
    >
      <NuxtImg
        :src="`${imageConfig.images.secure_base_url}${
          imageConfig.images.poster_sizes[
            imageConfig.images.poster_sizes.length - 1
          ]
        }/${posterPath}`"
        :alt="name"
        loading="lazy"
        class="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square rounded-xl"
      />
    </NuxtLink>
    <div class="py-4 flex flex-col gap-3">
      <NuxtLink
        :to="{ name: 'tv-details', params: { tvId: id } }"
        :prefetch="true"
        prefetch-on="interaction"
        class="flex justify-between items-center gap-1"
      >
        <h2 class="font-semibold text-xl line-clamp-1 w-full">{{ name }}</h2>
        <div
          class="py-1 px-2 text-white bg-gray-400 dark:bg-[#161921] rounded-sm"
        >
          <p class="text-sm font-bold capitalize">Action</p>
        </div>
      </NuxtLink>
      <div class="flex items-center w-full justify-between">
        <div class="flex flex-row gap-2 items-center">
          <LucideLayers3 :size="20" class="text-rose-500" />
          <p class="text-base font-bold">{{ firstAirDate }}</p>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <LucideStar :size="18" class="text-yellow-500" />

          <p class="text-base font-bold text-[#FFAD49]">
            {{ voteAverage.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imageConfig } from '~/lib/image.config';

defineProps<{
  id: number;
  posterPath: string;
  name?: string;
  firstAirDate?: Date | string;
  voteAverage: number;
}>();
</script>
