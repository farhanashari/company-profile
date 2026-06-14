<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import WaIcon from "@/components/icons/WaIcon.vue";

// ─── Types ───────────────────────────────────────────────
interface WaContact {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
  phone: string;
  message: string;
  gradient: string;
}

// ─── Router ──────────────────────────────────────────────
const route = useRoute();
const router = useRouter();

// ─── State ───────────────────────────────────────────────
const isMobileMenuOpen = ref(false);
const isWaModalOpen = ref(false);
const scrollY = ref(0);
const isDownloadLoading = ref(false);

// ─── Computed ────────────────────────────────────────────
const isHomePage = computed(() => route.path === "/");
const scrollProgress = computed(() => (isHomePage.value ? Math.min(scrollY.value / 80, 1) : 1));
const isLight = computed(() => scrollProgress.value > 0.5 || !isHomePage.value);

const navStyle = computed(() => {
  const p = scrollProgress.value;
  // Before scroll: white-tinted glass (iOS-style)
  // After scroll: white solid-ish
  const r = Math.round(255 * p);
  const g = Math.round(255 * p);
  const b = Math.round(255 * p);
  const bgAlpha =
    p < 0.5
      ? (0.12 + p * 0.3).toFixed(2) // glass phase: white glass
      : (0.75 + p * 0.2).toFixed(2); // solid phase: near white
  const borderAlpha =
    p < 0.5
      ? (0.25 - p * 0.1).toFixed(2) // bright border saat glass
      : (p * 0.12).toFixed(2);
  const shadowAlpha = (p * 0.1).toFixed(2);
  const shadowBlur = Math.round(p * 24);
  const shadowY = Math.round(p * 8);

  return {
    background: p < 0.5 ? `rgba(255, 255, 255, ${bgAlpha})` : `rgba(${r}, ${g}, ${b}, ${bgAlpha})`,
    borderColor: `rgba(255, 255, 255, ${borderAlpha})`,
    boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`,
  };
});

// ─── Data ────────────────────────────────────────────────
const navLinks = [
  { name: "dashboard", label: "Dashboard", path: "/" },
  { name: "products", label: "Products", path: "/products" },
  { name: "contact", label: "Contact Us", path: "/contact" },
];

const waContacts: WaContact[] = [
  {
    id: "retail",
    label: "Mulyanto",
    sublabel: "Consultation & purchase ",
    emoji: "🛍️",
    phone: "6285312084879",
    message: "Halo,%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20FirstDuct",
    gradient: "from-green-400 to-emerald-500",
  },
];

// ─── Helpers ─────────────────────────────────────────────
const isActive = (path: string) => route.path === path;

const downloadBrochure = async () => {
  try {
    isDownloadLoading.value = true;
    // Ganti path ini dengan path brochure PDF Anda yang sesungguhnya
    const pdfPath = "@/assets/FirstDuct-Catalog.pdf";

    // Create link element
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "FirstDuct-Brochure.pdf"; // Nama file saat di-download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // SweetAlert2 Success notification
    await Swal.fire({
      icon: "success",
      title: "Congratulations! 🎉",
      text: "FirstDuct brochure has been downloaded.",
      confirmButtonText: "Oke",
      confirmButtonColor: "#3b82f6",
      timer: 3500,
      showConfirmButton: true,
      backdrop: "rgba(0, 0, 0, 0.3)",
      allowOutsideClick: true,
      allowEscapeKey: true,
    });
  } catch (error) {
    console.error("Error downloading brochure:", error);

    // SweetAlert2 Error notification
    await Swal.fire({
      icon: "error",
      title: "Failed! ❌",
      text: "An error occurred while downloading the brochure. Please try again..",
      confirmButtonText: "Try again",
      confirmButtonColor: "#ef4444",
      backdrop: "rgba(0, 0, 0, 0.3)",
      allowOutsideClick: true,
      allowEscapeKey: true,
    });
  } finally {
    isDownloadLoading.value = false;
  }
};

// const scrollToSection = async (sectionId: string) => {
//   if (route.path !== "/") {
//     await router.push("/");
//     setTimeout(() => {
//       document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
//     }, 300);
//   } else {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
//   }
//   isMobileMenuOpen.value = false;
// };

const openWa = (contact: WaContact) => {
  window.open(`https://wa.me/${contact.phone}?text=${contact.message}`, "_blank", "noopener,noreferrer");
  isWaModalOpen.value = false;
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <div class="fixed top-8 left-0 right-0 z-50 flex justify-center px-3">
    <!-- ── Navbar ─────────────────────────────── -->
    <nav :style="navStyle" class="border backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between gap-6 w-full max-w-4xl transition-all duration-300">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 flex-shrink-0">
        <img src="@/assets/logo.png" alt="Logo" :class="['w-7 h-7 object-contain transition-all duration-300', isLight ? 'brightness-100' : 'brightness-0 invert']" />
        <span :class="['text-sm font-bold tracking-tight transition-colors duration-300', isLight ? 'text-gray-900' : 'text-white']"> Ducting FirstDuct </span>
      </router-link>

      <!-- Desktop Links -->
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
        <!-- Desktop WA CTA -->
        <button
          @click="isWaModalOpen = true"
          :class="[
            'hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
            isLight ? 'bg-black/5 hover:bg-black/10 text-gray-800' : 'bg-white/15 hover:bg-white/25 text-white',
          ]"
        >
          <WaIcon class="w-3.5 h-3.5 flex-shrink-0 text-green-500" />
          Chat via WhatsApp
        </button>

        <!-- Desktop Download PDF Button -->
        <button
          @click="downloadBrochure"
          :disabled="isDownloadLoading"
          :class="[
            'hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap',
            isLight ? 'bg-black/5 hover:bg-black/10 text-gray-800 disabled:opacity-50' : 'bg-white/15 hover:bg-white/25 text-white disabled:opacity-50',
          ]"
          title="Download Brochure PDF"
        >
          <svg v-if="!isDownloadLoading" class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v16m8-8l-8 8-8-8M4 20h16" />
          </svg>
          <svg v-else class="w-3.5 h-3.5 flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Download Brochure
        </button>

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

    <!-- ── Mobile Menu ────────────────────────── -->
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
        <!-- Drag pill -->
        <div class="flex justify-center pt-2.5 pb-1">
          <div :class="['w-9 h-1 rounded-full', isLight ? 'bg-gray-300/80' : 'bg-white/30']" />
        </div>

        <!-- Links -->
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
        <div class="px-3 pb-3 pt-2">
          <button
            @click="
              isWaModalOpen = true;
              isMobileMenuOpen = false;
            "
            :class="[
              'flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150 active:scale-[0.98]',
              isLight ? 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-800' : 'bg-white/15 hover:bg-white/25 text-white',
            ]"
          >
            <WaIcon class="w-4 h-4 text-green-500" />
            Chat via WhatsApp
          </button>

          <button
            @click="
              downloadBrochure();
              isMobileMenuOpen = false;
            "
            :disabled="isDownloadLoading"
            :class="[
              'flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50',
              isLight ? 'bg-blue-100/80 hover:bg-blue-200/80 text-blue-800' : 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-300',
            ]"
          >
            <svg v-if="!isDownloadLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v16m8-8l-8 8-8-8M4 20h16" />
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Download Brochure
          </button>
        </div>
      </div>
    </transition>
  </div>

  <!-- ── WA Floating Badge (Mobile only) ───────── -->
  <div class="fixed bottom-8 right-5 z-40 md:hidden flex items-center gap-3">
    <!-- Label tooltip -->
    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-x-2" enter-to-class="opacity-100 translate-x-0">
      <span v-show="!isWaModalOpen" class="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none"> Chat dengan kami </span>
    </transition>

    <!-- Badge Button -->
    <button
      @click="isWaModalOpen = true"
      class="relative w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.5)] flex items-center justify-center animate-wa-pulse active:scale-95 transition-transform duration-150"
      aria-label="Hubungi via WhatsApp"
    >
      <!-- Red dot badge -->
      <!-- <span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white leading-none">
        {{ waContacts.length }}
      </span> -->
      <WaIcon class="w-7 h-7 text-white" />
    </button>
  </div>

  <!-- ── WA Modal (Centered dialog desktop) ──────── -->
  <teleport to="body">
    <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isWaModalOpen" class="fixed inset-0 z-[999] flex items-end md:items-center justify-center md:pb-0 pb-6 px-4" style="background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px)" @click.self="isWaModalOpen = false">
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 translate-y-8 md:translate-y-0 md:scale-95"
          enter-to-class="opacity-100 translate-y-0 md:scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 md:scale-100"
          leave-to-class="opacity-0 translate-y-8 md:translate-y-0 md:scale-95"
          appear
        >
          <div class="w-full max-w-sm bg-white/95 backdrop-blur-3xl md:rounded-3xl rounded-3xl overflow-hidden shadow-2xl">
            <!-- Drag pill — mobile only -->
            <div class="flex justify-center pt-3 pb-2 md:hidden">
              <div class="w-9 h-1 bg-black/20 rounded-full" />
            </div>

            <!-- Header — desktop only -->
            <div class="hidden md:flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/[0.06]">
              <div>
                <p class="text-[15px] font-semibold text-gray-900">Contact via WhatsApp</p>
              </div>
              <button @click="isWaModalOpen = false" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Title — mobile only -->
            <p class="md:hidden text-center text-xs font-medium text-gray-400 pb-3 border-b border-black/[0.08] mx-4">Contact via WhatsApp</p>

            <!-- Contacts -->
            <button
              v-for="(contact, i) in waContacts"
              :key="contact.id"
              @click="openWa(contact)"
              :class="['flex items-center gap-3 w-full px-4 py-3.5 text-left transition-colors duration-150 hover:bg-black/[0.03] active:bg-black/5', i < waContacts.length - 1 ? 'border-b border-black/[0.06]' : '']"
            >
              <div :class="['w-11 h-11 rounded-full bg-gradient-to-br flex items-center justify-center text-xl flex-shrink-0 shadow-sm', contact.gradient]">
                {{ contact.emoji }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[15px] font-semibold text-gray-900">{{ contact.label }}</p>
                <p class="text-xs text-gray-400 mt-0.5 truncate">{{ contact.sublabel }}</p>
              </div>
              <WaIcon class="w-6 h-6 text-[#25D366] flex-shrink-0" />
            </button>

            <!-- Cancel — mobile only -->
            <div class="md:hidden px-3 pb-3 pt-2">
              <button @click="isWaModalOpen = false" class="w-full py-3.5 rounded-2xl bg-gray-100 text-[15px] font-semibold text-blue-600 transition-colors duration-150 active:bg-gray-200">Batal</button>
            </div>

            <!-- Footer — desktop only -->
            <div class="hidden md:block px-4 py-3 bg-gray-50/80 border-t border-black/[0.04]">
              <p class="text-[11px] text-gray-400 text-center">Our team usually responds within a few minutes</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>
