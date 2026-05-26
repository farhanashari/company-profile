<script setup lang="ts">
import { ref, onMounted } from "vue";
import DotGrid from "@/component/DotGrid/DotGrid.vue";

const clients = ref([
  { name: "TechCorp", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=TechCorp" },
  { name: "InnovateCo", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=InnovateCo" },
  { name: "DataFlow", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=DataFlow" },
  { name: "CloudNine", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=CloudNine" },
  { name: "AppWorks", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=AppWorks" },
  { name: "NextGen", logo: "https://placehold.co/120x60/e5e7eb/9ca3af?text=NextGen" },
]);

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[92vh] flex items-center overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
      </div>

      <!-- DotGrid background -->
      <div class="absolute inset-0 opacity-20">
        <DotGrid :dot-size="6" :gap="28" base-color="#ffffff" active-color="#7dd3fc" :proximity="150" :speed-trigger="100" :shock-radius="250" :shock-strength="5" :max-speed="5000" :resistance="750" :return-duration="1.5" />
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div :class="['transition-all duration-1000 ease-out', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          <div class="max-w-3xl">
            <!-- Badge -->
            <div class="inline-flex items-center px-3 py-1.5 bg-white/10 rounded-full mb-6 border border-white/10">
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span class="text-white/80 text-xs font-medium tracking-wide">Solution to a wide variety of projects</span>
            </div>

            <!-- Headline -->
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Professional<br />Ducting HVAC
              <span class="block text-primary-300 mt-1">For Industries</span>
            </h1>

            <!-- Subtext -->
            <p class="text-base sm:text-lg text-white/70 mb-10 max-w-xl leading-relaxed tracking-tight font-normal">
              In any environment, we need fresh clean air. Our pre-insulated aluminium panel for air duct is the perfect solution for all your ducting needs.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <router-link
                to="/products"
                class="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-tight text-primary-700 bg-white rounded-2xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Our Products
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </router-link>
              <router-link to="/contact" class="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-tight text-white border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-200">
                Start a Project
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div>
            <!-- Label -->
            <span class="text-primary-600 font-semibold text-xs tracking-widest uppercase mb-3 block">About Us</span>

            <!-- Heading -->
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">A Glimpse About<br />First Duct</h2>

            <!-- Body -->
            <div class="space-y-4 text-[15px] text-gray-500 leading-relaxed tracking-tight">
              <p>Incorporated in 2003, we have dedicated ourselves in the air-conditioning industry by supplying high quality airconditioning units, ducting construction and installations.</p>
              <p>With our expertise and a built-up factory area of 12,000 sq meters, we are able to offer you our quality products and quality services for your needs in the HVAC industry.</p>
              <p>
                We are a company with several ISO certifications (ISO 14001:2004, ISO 9001:2008, OHSAS 18001:2007) and also a member of the Indonesian Green Building Council. Our product have also been tested by the National Laboratory of
                Fire Fighting and Disaster Mitigation of DKI Jakarta (SK No. 3428/-1.784.25).
              </p>
            </div>

            <!-- Cert logos -->
            <div class="mt-8 flex flex-wrap gap-3">
              <img src="@/assets/cert1.png" alt="cert1" class="w-12 h-12 lg:w-16 lg:h-16 object-contain" />
              <img src="@/assets/cert2.png" alt="cert2" class="w-12 h-12 lg:w-16 lg:h-16 object-contain" />
              <img src="@/assets/cert3.png" alt="cert3" class="w-12 h-12 lg:w-16 lg:h-16 object-contain" />
              <img src="@/assets/cert4.png" alt="cert4" class="w-12 h-12 lg:w-16 lg:h-16 object-contain" />
            </div>
          </div>

          <!-- Image -->
          <div class="relative h-full">
            <div class="relative h-full min-h-[350px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl">
              <img src="@/assets/catalog.jpg" alt="Our Team" class="absolute inset-0 w-full h-full object-cover" style="object-position: center 10%" />
            </div>
            <div class="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-6 bg-white rounded-2xl shadow-xl p-3 lg:p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div class="text-xl font-bold text-gray-900 tracking-tight">480+</div>
                  <div class="text-xs text-gray-400 tracking-tight">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Clients Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-xl font-bold text-gray-900 mb-2 tracking-tight">Trusted by Industry Leaders</h3>
          <p class="text-sm text-gray-400 max-w-xl mx-auto tracking-tight">We've partnered with businesses of all sizes to deliver exceptional digital experiences.</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          <div v-for="client in clients" :key="client.name" class="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
            <img :src="client.logo" :alt="client.name" class="h-10 sm:h-12 w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-primary-600">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">Ready to Start Your<br />Next Project?</h2>
        <p class="text-white/60 text-base mb-10 max-w-xl mx-auto tracking-tight leading-relaxed">Let's collaborate to bring your vision to life. Our team is ready to help you create something amazing.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link to="/contact" class="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-tight text-primary-700 bg-white rounded-2xl hover:bg-primary-50 transition-all duration-200 shadow-lg">
            Get a Free Consultation
          </router-link>
          <router-link to="/products" class="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-tight text-white border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-200">
            View Our Services
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
