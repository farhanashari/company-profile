<script setup lang="ts">
import { reactive, ref } from "vue";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const form = reactive<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref<FormErrors>({});
const isSubmitting = ref(false);
const isSubmitted = ref(false);

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!form.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  if (!form.message.trim()) {
    newErrors.message = "Message is required";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  isSubmitting.value = false;
  isSubmitted.value = true;

  // Reset form
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";

  // Reset success message after 5 seconds
  setTimeout(() => {
    isSubmitted.value = false;
  }, 5000);
};

const waNumber = "6281212874021";
const waMessage = encodeURIComponent("Halo, saya ingin bertanya mengenai produk Anda");

const contactInfo = [
  {
    icon: "location",
    title: "Our Office",
    lines: ["Rukan Sunter Permai Blok D1-2", "Jl. Danau Sunter Utara", "Jakarta Utara 14350, Indonesia"],
  },
  {
    icon: "email",
    title: "Email Us",
    lines: ["myllmulyanto56@gmail.com", ""],
  },
  {
    icon: "phone",
    title: "Call Us",
    lines: ["+62 853-1208-4879 - Mulyanto"],
    waLink: `https://wa.me/${waNumber}?text=${waMessage}`,
  },
];
</script>

<template>
  <div class="pt-20">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-900 to-primary-800 pt-36 pb-0 lg:pt-44 -mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16 lg:pb-24">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">Get in Touch</h1>
        <p class="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <!-- SVG Wave Divider -->
      <div class="w-full overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-16 lg:h-20 block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 lg:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <!-- Contact Form -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <!-- Success Message -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="isSubmitted" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <h4 class="text-sm font-semibold text-green-800">Message Sent Successfully!</h4>
                    <p class="text-sm text-green-700 mt-1">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </transition>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2"> Full Name <span class="text-red-500">*</span> </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      :class="[
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white',
                        errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
                      ]"
                      placeholder="John Doe"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email Address <span class="text-red-500">*</span> </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      :class="[
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white',
                        errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
                      ]"
                      placeholder="john@example.com"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                </div>

                <!-- Subject -->
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2"> Subject </label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:bg-white"
                    placeholder="How can we help?"
                  />
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2"> Message <span class="text-red-500">*</span> </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    :class="[
                      'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white resize-none',
                      errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
                    ]"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {{ isSubmitting ? "Sending..." : "Send Message" }}
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Contact Cards -->
            <div class="space-y-4">
              <div v-for="info in contactInfo" :key="info.title" class="bg-white rounded-2xl shadow-sm p-6 flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg v-if="info.icon === 'location'" class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else-if="info.icon === 'email'" class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <component
                  :is="info.waLink ? 'a' : 'div'"
                  :href="info.waLink || undefined"
                  :target="info.waLink ? '_blank' : undefined"
                  :rel="info.waLink ? 'noopener noreferrer' : undefined"
                  :class="info.waLink ? 'cursor-pointer group' : ''"
                >
                  <h4 class="font-semibold text-gray-900 mb-1">{{ info.title }}</h4>
                  <p v-for="(line, i) in info.lines" :key="i" class="text-gray-600 text-sm">{{ line }}</p>

                  <!-- Badge WA -->
                  <span v-if="info.waLink" class="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 group-hover:bg-green-100 transition-colors">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                      />
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.233-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.7.97.988-3.61-.235-.371A9.818 9.818 0 1112 21.818z"
                      />
                    </svg>
                    Chat via WhatsApp
                  </span>
                </component>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="relative aspect-[4/3] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.933855759733!2d106.87639236537464!3d-6.1385359960460235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f50795a3f525%3A0x9385b0efeda02726!2sDucting%20AC%20PU%20-%20PIR%20First%20Duct%20PT.%20Andalan%20Cipta%20Cemerlang!5e0!3m2!1sen!2sus!4v1779873429162!5m2!1sen!2sus"
                  class="absolute inset-0 w-full h-full border-0"
                  allowFullScreen="{true}"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
              <div class="p-5">
                <h4 class="font-semibold text-gray-900 mb-1">Visit Our Office</h4>
                <p class="text-gray-600 text-sm">We're located in Rukan Sunter Permai. Come say hello!</p>
              </div>
            </div>

            <!-- Working Hours -->
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h4 class="font-semibold text-gray-900 mb-4">Business Hours</h4>
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Monday - Friday</span>
                  <span class="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Saturday</span>
                  <span class="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Sunday</span>
                  <span class="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
