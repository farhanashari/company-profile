<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isHomePage = computed(() => route.path === "/");
const isLight = computed(() => isScrolled.value || !isHomePage.value);

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
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <div class="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
    <nav
      :class="[
        'transition-all duration-300 rounded-full px-5 py-3 flex items-center justify-between gap-6 w-full max-w-3xl',
        isLight ? 'bg-white/90 backdrop-blur-md shadow-lg border border-gray-200' : 'bg-black/10 backdrop-blur-sm shadow-lg border border-white/10',
      ]"
    >
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
        <button
          @click="scrollToSection('contact')"
          :class="['hidden md:block px-4 py-1.5 text-sm font-medium tracking-tight rounded-lg transition-all duration-200', isLight ? 'text-white bg-primary-600 hover:bg-primary-700' : 'text-black bg-white hover:bg-gray-100']"
        >
          Get in Touch
        </button>

        <!-- Mobile hamburger -->
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
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="isMobileMenuOpen" :class="['md:hidden absolute top-20 left-0 right-0 mx-4 rounded-full shadow-xl border p-4 space-y-1', isLight ? 'bg-white border-gray-200' : 'bg-black/80 backdrop-blur-md border-white/10']">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          :class="['block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors', isActive(link.path) ? 'bg-primary-50 text-primary-700' : isLight ? 'text-gray-600 hover:bg-gray-50' : 'text-white/80 hover:bg-white/10']"
        >
          {{ link.label }}
        </router-link>
        <button @click="scrollToSection('contact')" class="w-full mt-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">Get in Touch</button>
      </div>
    </transition>
  </div>
</template>
