<script setup lang="ts">
import { ref } from "vue";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  price: string;
}

const products = ref<Product[]>([
  {
    id: 1,
    name: "Enterprise Web Platform",
    category: "Web Development",
    description: "A scalable, secure web platform built for enterprise-level businesses. Features include multi-tenant architecture, real-time analytics, and seamless third-party integrations.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Enterprise+Platform",
    features: ["Multi-tenant Architecture", "Real-time Analytics", "API Integration", "SSO Support"],
    price: "Custom",
  },
  {
    id: 2,
    name: "Mobile App Suite",
    category: "Mobile Development",
    description: "Cross-platform mobile applications that deliver native-like performance. Built with React Native and Flutter for iOS and Android platforms.",
    image: "https://placehold.co/600x400/7c3aed/ffffff?text=Mobile+App+Suite",
    features: ["iOS & Android", "Offline Mode", "Push Notifications", "Biometric Auth"],
    price: "From $25k",
  },
]);

// const categories = ref<string[]>(["All", "Web Development", "Mobile Development", "DevOps", "Data Science", "Design", "Security"]);

// const activeCategory = ref("All");

const filteredProducts = ref<Product[]>(products.value);

// const filterProducts = (category: string) => {
//   activeCategory.value = category;
//   if (category === "All") {
//     filteredProducts.value = products.value;
//   } else {
//     filteredProducts.value = products.value.filter((p) => p.category === category);
//   }
// };

const selectedProduct = ref<Product | null>(null);

const openProductModal = (product: Product) => {
  selectedProduct.value = product;
};

const closeProductModal = () => {
  selectedProduct.value = null;
};
</script>

<template>
  <div class="pt-20">
    <!-- Header -->
    <section class="bg-gradient-to-br from-primary-900 to-primary-800 pt-36 pb-20 lg:pt-44 lg:pb-28 -mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">Our Products & Services</h1>
        <p class="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">Discover our comprehensive range of digital solutions designed to help your business thrive in the modern digital landscape.</p>
      </div>
    </section>

    <!-- Filter Bar -->
    <!-- <section class="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          <button
            v-for="category in categories"
            :key="category"
            @click="filterProducts(category)"
            :class="['px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200', activeCategory === category ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section> -->

    <!-- Products Grid -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <transition-group name="product-grid" tag="div" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="product in filteredProducts" :key="product.id" class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <!-- Image -->
            <div class="relative overflow-hidden aspect-[3/2]">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                  {{ product.category }}
                </span>
              </div>
              <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-white font-semibold">{{ product.price }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                {{ product.description }}
              </p>

              <!-- Features -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="feature in product.features.slice(0, 2)" :key="feature" class="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {{ feature }}
                </span>
                <span v-if="product.features.length > 2" class="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500"> +{{ product.features.length - 2 }} more </span>
              </div>

              <!-- Button -->
              <button @click="openProductModal(product)" class="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-primary-700 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group/btn">
                Learn More
                <svg class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p class="text-gray-600">Try selecting a different category.</p>
        </div>
      </div>
    </section>

    <!-- Product Modal -->
    <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="closeProductModal">
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="selectedProduct" class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Image -->
            <div class="relative aspect-video">
              <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full h-full object-cover rounded-t-2xl" />
              <button @click="closeProductModal" class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="absolute bottom-4 left-4">
                <span class="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700">
                  {{ selectedProduct.category }}
                </span>
              </div>
            </div>

            <!-- Modal Content -->
            <div class="p-6 sm:p-8">
              <div class="flex items-start justify-between mb-4">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
                  {{ selectedProduct.name }}
                </h2>
                <span class="text-lg font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-lg">
                  {{ selectedProduct.price }}
                </span>
              </div>

              <p class="text-gray-600 leading-relaxed mb-6">
                {{ selectedProduct.description }}
              </p>

              <div class="mb-8">
                <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Features</h4>
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="feature in selectedProduct.features" :key="feature" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm text-gray-700 font-medium">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <router-link
                  to="/contact"
                  @click="closeProductModal"
                  class="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Get Started
                </router-link>
                <button @click="closeProductModal" class="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Close</button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.product-grid-move,
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.4s ease;
}

.product-grid-enter-from,
.product-grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.product-grid-leave-active {
  position: absolute;
}
</style>
