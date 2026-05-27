<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);
const scrollY = ref(0);
const isHomePage = computed(() => route.path === "/");

const scrollProgress = computed(() => (isHomePage.value ? Math.min(scrollY.value / 80, 1) : 1));

const isLight = computed(() => scrollProgress.value > 0.5 || !isHomePage.value);

const navStyle = computed(() => {
  const p = scrollProgress.value;
  const r = Math.round(255 * p);
  const bgAlpha = (0.1 + p * 0.8).toFixed(2);
  const borderAlpha = (p * 0.15).toFixed(2);
  const shadowAlpha = (p * 0.1).toFixed(2);
  const shadowBlur = Math.round(p * 24);
  const shadowY = Math.round(p * 8);
  return {
    background: `rgba(${r}, ${r}, ${r}, ${bgAlpha})`,
    borderColor: `rgba(209, 213, 219, ${borderAlpha})`,
    boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`,
  };
});

const navLinks = [
  { name: "dashboard", label: "Dashboard", path: "/" },
  { name: "products", label: "Products", path: "/products" },
  { name: "contact", label: "Contact Us", path: "/contact" },
];

const isActive = (path: string) => route.path === path;

const scrollToSection = async (sectionId: string) => {
  if (route.path !== "/") {
    await router.push("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 300);
  } else {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <div class="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
    <!-- Navbar -->
    <nav :style="navStyle" :class="['border backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between gap-6 w-full max-w-3xl']">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 flex-shrink-0">
        <img src="@/assets/logo.png" alt="Logo" :class="['w-7 h-7 object-contain transition-all duration-300', isLight ? 'brightness-100' : 'brightness-0 invert']" />
        <span :class="['text-sm font-bold tracking-tight transition-colors duration-300', isLight ? 'text-gray-900' : 'text-white']"> Ducting FirstDuct </span>
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-medium tracking-tight transition-all duration-200',
            isActive(link.path) ? (isLight ? 'bg-primary-50 text-primary-700' : 'bg-white/15 text-white') : isLight ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/10',
          ]"
        >
          {{ link.label }}
        </router-link>
      </div>

      <!-- CTA + Hamburger -->
      <div class="flex items-center gap-2">
        <!-- Desktop WhatsApp CTA -->

        <a
          href="https://wa.me/6281212874021?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20Anda"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
            isLight ? 'bg-black/5 hover:bg-black/10 text-gray-800' : 'bg-white/15 hover:bg-white/25 text-white',
          ]"
        >
          <svg class="w-3.5 h-3.5 flex-shrink-0 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            />
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.233-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.7.97.988-3.61-.235-.371A9.818 9.818 0 1112 21.818z"
            />
          </svg>
          Chat via WhatsApp
        </a>

        <!-- Mobile Hamburger -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" :class="['md:hidden p-1.5 rounded-lg transition-colors', isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10']">
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-3 scale-95"
    >
      <div
        v-show="isMobileMenuOpen"
        :class="['md:hidden absolute top-20 left-0 right-0 mx-4 rounded-3xl border overflow-hidden', isLight ? 'bg-white/75 backdrop-blur-2xl border-white/60' : 'bg-white/10 backdrop-blur-2xl border-white/15']"
        style="
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 1px 0 rgba(255, 255, 255, 0.8) inset;
        "
      >
        <!-- iOS drag indicator -->
        <div class="flex justify-center pt-2.5 pb-1">
          <div :class="['w-9 h-1 rounded-full', isLight ? 'bg-gray-300/80' : 'bg-white/30']" />
        </div>

        <!-- Nav Links -->
        <div class="px-2 py-1">
          <router-link
            v-for="(link, index) in navLinks"
            :key="link.name"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            :class="[
              'flex items-center justify-between px-4 py-3.5 text-[15px] font-medium transition-all duration-150 active:scale-[0.98]',
              index < navLinks.length - 1 ? (isLight ? 'border-b border-gray-100/80' : 'border-b border-white/8') : '',
              isActive(link.path) ? (isLight ? 'text-blue-600' : 'text-white') : isLight ? 'text-gray-800' : 'text-white/85',
            ]"
          >
            <span>{{ link.label }}</span>
            <svg :class="['w-4 h-4', isActive(link.path) ? (isLight ? 'text-blue-400' : 'text-white/60') : isLight ? 'text-gray-300' : 'text-white/25']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <!-- Bottom Actions -->
        <div class="px-3 pb-3 pt-2 space-y-2">
          <!-- WhatsApp -->

          <a
            href="https://wa.me/6281212874021?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150 active:scale-[0.98]',
              isLight ? 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-800' : 'bg-white/15 hover:bg-white/25 text-white',
            ]"
          >
            <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              />
              <path
                d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.233-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.7.97.988-3.61-.235-.371A9.818 9.818 0 1112 21.818z"
              />
            </svg>
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
