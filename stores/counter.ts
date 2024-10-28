import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', () => {
  const counter = ref(0);

  const increment = () => {
    counter.value++;
  };

  return {
    counter,
    increment,
  };
});
