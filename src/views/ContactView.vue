<script setup lang="ts">
import { reactive, ref } from 'vue'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const form = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const validateForm = (): boolean => {
  const newErrors: FormErrors = {}

  if (!form.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!form.message.trim()) {
    newErrors.message = 'Message is required'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  // Reset form
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''

  // Reset success message after 5 seconds
  setTimeout(() => {
    isSubmitted.value = false
  }, 5000)
}

const contactInfo = [
  {
    icon: 'location',
    title: 'Our Office',
    lines: ['123 Innovation Drive, Suite 400', 'San Francisco, CA 94105'],
  },
  {
    icon: 'email',
    title: 'Email Us',
    lines: ['hello@nexora.digital', 'support@nexora.digital'],
  },
  {
    icon: 'phone',
    title: 'Call Us',
    lines: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm PST'],
  },
]
</script>

<template>
  <div class="pt-20">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-900 to-primary-800 py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
          Get in Touch
        </h1>
        <p class="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
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
              <p class="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <!-- Success Message -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div
                  v-if="isSubmitted"
                  class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3"
                >
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 class="text-sm font-semibold text-green-800">Message Sent Successfully!</h4>
                    <p class="text-sm text-green-700 mt-1">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </transition>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      :class="[
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white',
                        errors.name
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
                      ]"
                      placeholder="John Doe"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      :class="[
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white',
                        errors.email
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
                      ]"
                      placeholder="john@example.com"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                </div>

                <!-- Subject -->
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
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
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    :class="[
                      'w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white resize-none',
                      errors.message
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-primary-200 focus:border-primary-500',
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
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin -ml-1 mr-3 w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Contact Cards -->
            <div class="space-y-4">
              <div
                v-for="info in contactInfo"
                :key="info.title"
                class="bg-white rounded-2xl shadow-sm p-6 flex items-start space-x-4"
              >
                <div
                  class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    v-if="info.icon === 'location'"
                    class="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    v-else-if="info.icon === 'email'"
                    class="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">{{ info.title }}</h4>
                  <p
                    v-for="(line, i) in info.lines"
                    :key="i"
                    class="text-gray-600 text-sm"
                  >
                    {{ line }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="relative aspect-[4/3] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555096471!2d-122.50764017948502!3d37.75780956920463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  class="absolute inset-0 w-full h-full border-0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
              <div class="p-5">
                <h4 class="font-semibold text-gray-900 mb-1">Visit Our Office</h4>
                <p class="text-gray-600 text-sm">
                  We're located in the heart of San Francisco's tech district. Come say hello!
                </p>
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