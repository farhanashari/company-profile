<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Client {
  name: string;
  logo: string;
}

interface Props {
  clients: Client[];
}

const props = defineProps<Props>();

const scrollContainer = ref<HTMLElement | null>(null);
const currentIndex = ref(0);

// Double duplicate buat infinite
const displayedClients = computed(() => {
  return [...props.clients, ...props.clients, ...props.clients];
});

const scrollToIndex = (index: number) => {
  if (scrollContainer.value) {
    // Scroll ke tengah duplicate
    const element = scrollContainer.value.children[index + props.clients.length] as HTMLElement;
    if (element) {
      scrollContainer.value.scrollLeft = element.offsetLeft - scrollContainer.value.clientWidth / 2 + element.clientWidth / 2;
    }
  }
};

// Track scroll position dan update dots
const onScroll = () => {
  if (!scrollContainer.value) return;

  const children = scrollContainer.value.children;
  const scrollLeft = scrollContainer.value.scrollLeft;
  const containerCenter = scrollLeft + scrollContainer.value.clientWidth / 2;

  // Cari item yang paling dekat dengan center
  let closestIndex = 0;
  let closestDistance = Infinity;

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    const childCenter = child.offsetLeft + child.clientWidth / 2;
    const distance = Math.abs(childCenter - containerCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  // Update index dengan modulo buat infinite effect
  currentIndex.value = closestIndex % props.clients.length;

  // RESET position ketika reach akhir (seamless infinite)
  if (closestIndex >= props.clients.length * 2 - 2) {
    const resetElement = scrollContainer.value.children[closestIndex - props.clients.length] as HTMLElement;
    if (resetElement) {
      scrollContainer.value.removeEventListener("scroll", onScroll);
      scrollContainer.value.scrollLeft = resetElement.offsetLeft - scrollContainer.value.clientWidth / 2 + resetElement.clientWidth / 2;
      setTimeout(() => {
        scrollContainer.value?.addEventListener("scroll", onScroll);
      }, 0);
    }
  }
};

onMounted(() => {
  if (scrollContainer.value) {
    // Start dari tengah
    const startElement = scrollContainer.value.children[props.clients.length] as HTMLElement;
    if (startElement) {
      scrollContainer.value.scrollLeft = startElement.offsetLeft - scrollContainer.value.clientWidth / 2 + startElement.clientWidth / 2;
    }

    scrollContainer.value.addEventListener("scroll", onScroll);
  }
});
</script>

<template>
  <div class="w-full">
    <!-- Scroll Container -->
    <div ref="scrollContainer" class="flex overflow-x-auto scroll-smooth gap-4 px-4 pb-4" style="scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none">
      <div
        v-for="(client, idx) in displayedClients"
        :key="`${client.name}-${idx}`"
        style="scroll-snap-align: center; scroll-snap-stop: always"
        class="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-grab active:cursor-grabbing"
      >
        <img :src="client.logo" :alt="client.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
    </div>

    <!-- Dots Indicator -->
    <div class="flex justify-center gap-2 mt-6">
      <button
        v-for="(_, idx) in props.clients"
        :key="idx"
        @click="scrollToIndex(idx)"
        :class="['h-2 rounded-full transition-all duration-300', currentIndex === idx ? 'bg-primary-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400']"
        :aria-label="`Go to client ${idx + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
