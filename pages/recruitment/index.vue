<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Position {
  id: number
  title: string
  department: string
}

interface ApplicationForm {
  fullName: string
  email: string
  phone: string
  position: string
  experience: string
  education: string
  skills: string
  coverLetter: string
}

const colorMode = useColorMode()
const isHydrated = ref(false)

const positions = ref<Position[]>([
  { id: 1, title: 'Kiến trúc sư thiết kế', department: 'Kiến trúc & Thiết kế' },
  { id: 2, title: 'Nhân viên thi công - Nội thất', department: 'Thi công' },
  { id: 3, title: 'Nhân viên thi công - Ngoại thất', department: 'Thi công' },
  { id: 4, title: 'Giám sát công trường', department: 'Thi công' },
  { id: 5, title: 'Thiết kế 3D - Nội ngoại thất', department: 'Kiến trúc & Thiết kế' },
  { id: 6, title: 'Kiến trúc sư tư vấn xây dựng', department: 'Kiến trúc & Thiết kế' },
  { id: 7, title: 'Nhân viên Martketing', department: 'Martketing' }
])

const form = ref<ApplicationForm>({
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  education: '',
  skills: '',
  coverLetter: ''
})

const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

onMounted(() => {
  // Load color mode from localStorage
  if (process.client) {
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }
    isHydrated.value = true
  }
})

const submitForm = async () => {
  submitError.value = ''

  if (!form.value.fullName || !form.value.email || !form.value.phone || !form.value.position) {
    submitError.value = 'Vui lòng điền đầy đủ thông tin bắt buộc'
    return
  }

  submitting.value = true
  try {
    const res = await fetch('/api/recruitment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    const data = await res.json()
    if (!res.ok || !data?.ok) {
      throw new Error(data?.statusMessage || 'Gửi không thành công')
    }
    submitted.value = true
    form.value = {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      education: '',
      skills: '',
      coverLetter: ''
    }
    // Auto hide success message after 5 seconds
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (err: any) {
    submitError.value = err?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    coverLetter: ''
  }
  submitError.value = ''
}
</script>

<template>
  <section v-if="isHydrated" :class="[
    'transition-colors duration-500',
    colorMode.value === 'dark' ? 'bg-slate-950' : 'bg-white'
  ]">
    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- Success Message -->
      <div v-if="submitted" :class="[
        'mb-8 border-l-4 p-6 rounded-lg transition-colors duration-300',
        colorMode.value === 'dark'
          ? 'bg-green-900/30 border-green-500'
          : 'bg-green-50 border-green-600'
      ]">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <div>
            <h3 :class="[
              'text-lg font-bold mb-1 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-green-400' : 'text-green-800'
            ]">
              Ứng tuyển thành công!
            </h3>
            <p :class="colorMode.value === 'dark' ? 'text-green-300' : 'text-green-700'">
              Cảm ơn bạn đã quan tâm đến KOA.vn. Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <!-- Left Column - About Company and Process -->
        <div class="lg:col-span-2 space-y-12">
          <!-- About Company -->
          <div :class="[
            'rounded-lg p-8 shadow-lg border transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-gray-200'
          ]">
            <h2 :class="[
              'text-2xl font-bold mb-6 flex items-center gap-3 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
            ]">
              <svg :class="['w-8 h-8', colorMode.value === 'dark' ? 'text-slate-200' : 'text-black']" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Về KOA
            </h2>
            <p :class="[
              'text-sm leading-relaxed mb-4 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-700'
            ]">
              KOA là công ty chuyên về thiết kế và thi công nội thất, ngoại thất, kiến trúc và xây dựng với hơn 10 năm
              kinh nghiệm. Chúng tôi tự hào về những công trình chất lượng cao, sáng tạo và bền vững.
            </p>
            <p :class="[
              'text-sm leading-relaxed mb-4 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-700'
            ]">
              Với đội ngũ kiến trúc sư, kỹ sư xây dựng, và thợ thi công giỏi, chúng tôi đã hoàn thành hàng trăm dự án từ
              nhỏ đến lớn cho các khách hàng cá nhân và doanh nghiệp.
            </p>
            <p :class="[
              'text-sm leading-relaxed transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-700'
            ]">
              Chúng tôi luôn tìm kiếm những nhân tài mới để cùng phát triển và xây dựng những công trình tuyệt vời.
            </p>
          </div>

          <!-- Recruitment Process -->
          <div :class="[
            'rounded-lg p-8 shadow-lg border transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-gray-200'
          ]">
            <h2 :class="[
              'text-2xl font-bold mb-8 flex items-center gap-3 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
            ]">
              <svg :class="['w-8 h-8', colorMode.value === 'dark' ? 'text-slate-200' : 'text-black']" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd" />
              </svg>
              Quy trình tuyển dụng
            </h2>

            <div class="space-y-6">
              <!-- Step 1 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'flex items-center justify-center h-10 w-10 rounded-full text-white font-bold',
                    colorMode.value === 'dark' ? 'bg-blue-600' : 'bg-black'
                  ]">
                    1
                  </div>
                </div>
                <div>
                  <h3 :class="[
                    'font-bold mb-2 text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Nộp hồ sơ
                  </h3>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Điền đầy đủ thông tin cá nhân, chọn vị trí ứng tuyển và gửi hồ sơ qua form.
                  </p>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'flex items-center justify-center h-10 w-10 rounded-full text-white font-bold',
                    colorMode.value === 'dark' ? 'bg-blue-600' : 'bg-black'
                  ]">
                    2
                  </div>
                </div>
                <div>
                  <h3 :class="[
                    'font-bold mb-2 text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Kiểm tra hồ sơ
                  </h3>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Đội HR của chúng tôi sẽ xem xét hồ sơ và liên hệ bạn trong vòng 3-5 ngày.
                  </p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'flex items-center justify-center h-10 w-10 rounded-full text-white font-bold',
                    colorMode.value === 'dark' ? 'bg-blue-600' : 'bg-black'
                  ]">
                    3
                  </div>
                </div>
                <div>
                  <h3 :class="[
                    'font-bold mb-2 text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Phỏng vấn sơ bộ
                  </h3>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Cuộc phỏng vấn trực tuyến hoặc qua điện thoại để tìm hiểu thêm về bạn.
                  </p>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'flex items-center justify-center h-10 w-10 rounded-full text-white font-bold',
                    colorMode.value === 'dark' ? 'bg-blue-600' : 'bg-black'
                  ]">
                    4
                  </div>
                </div>
                <div>
                  <h3 :class="[
                    'font-bold mb-2 text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Phỏng vấn chuyên môn
                  </h3>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Gặp trực tiếp với bộ phận chuyên môn để đánh giá kỹ năng và kiến thức.
                  </p>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'flex items-center justify-center h-10 w-10 rounded-full text-white font-bold',
                    colorMode.value === 'dark' ? 'bg-blue-600' : 'bg-black'
                  ]">
                    5
                  </div>
                </div>
                <div>
                  <h3 :class="[
                    'font-bold mb-2 text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Quyết định cuối cùng
                  </h3>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Nếu đạt yêu cầu, chúng tôi sẽ gửi offer và thuyết phục về lương, thời gian.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Why KOA -->
          <div :class="[
            'rounded-lg p-8 shadow-lg border transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-gray-200'
          ]">
            <h2 :class="[
              'text-2xl font-bold mb-6 flex items-center gap-3 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
            ]">
              <svg :class="['w-8 h-8', colorMode.value === 'dark' ? 'text-slate-200' : 'text-black']" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Tại sao chọn KOA?
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p :class="[
                    'font-bold text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Môi trường chuyên nghiệp
                  </p>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Làm việc với đội ngũ tàn tài, sáng tạo
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p :class="[
                    'font-bold text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Lương và phúc lợi cạnh tranh
                  </p>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Mức lương xứng đáng với năng lực
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p :class="[
                    'font-bold text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Cơ hội phát triển
                  </p>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Đào tạo và phát triển kỹ năng
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p :class="[
                    'font-bold text-base transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  ]">
                    Dự án đa dạng
                  </p>
                  <p :class="[
                    'text-sm transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  ]">
                    Làm việc trên các dự án thú vị, quy mô khác nhau
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Application Form -->
        <div class="lg:col-span-1">
          <div :class="[
            'rounded-lg p-8 shadow-lg border sticky top-4 transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-gray-200'
          ]">
            <h2 :class="[
              'text-2xl font-bold mb-2 flex items-center gap-2 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
            ]">
              <svg :class="['w-6 h-6', colorMode.value === 'dark' ? 'text-slate-200' : 'text-black']" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Ứng tuyển ngay
            </h2>
            <p :class="[
              'text-sm mb-6 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
            ]">
              Điền đầy đủ thông tin để ứng tuyển
            </p>

            <form @submit.prevent="submitForm" class="space-y-4" v-if="!submitted">
              <!-- Full Name -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Họ và tên *
                </label>
                <input v-model="form.fullName" type="text" placeholder="Nhập họ và tên"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500'
                      : 'bg-white text-black border-gray-300 placeholder-gray-400'
                  ]"
                />
              </div>

              <!-- Email -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Email *
                </label>
                <input v-model="form.email" type="email" placeholder="your@email.com"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500'
                      : 'bg-white text-black border-gray-300 placeholder-gray-400'
                  ]"
                />
              </div>

              <!-- Phone -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Số điện thoại *
                </label>
                <input v-model="form.phone" type="tel" placeholder="0123 456 789"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500'
                      : 'bg-white text-black border-gray-300 placeholder-gray-400'
                  ]"
                />
              </div>

              <!-- Position -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Vị trí ứng tuyển *
                </label>
                <select v-model="form.position"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700'
                      : 'bg-white text-black border-gray-300'
                  ]"
                >
                  <option value="">-- Chọn vị trí --</option>
                  <option v-for="pos in positions" :key="pos.id" :value="pos.title">
                    {{ pos.title }}
                  </option>
                </select>
              </div>

              <!-- Experience -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Kinh nghiệm
                </label>
                <textarea v-model="form.experience" placeholder="Mô tả kinh nghiệm làm việc của bạn..." rows="3"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500'
                      : 'bg-white text-black border-gray-300 placeholder-gray-400'
                  ]"
                />
              </div>

              <!-- Skills -->
              <div>
                <label :class="[
                  'block text-sm font-semibold mb-2 transition-colors duration-300',
                  colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'
                ]">
                  Kỹ năng
                </label>
                <textarea v-model="form.skills" placeholder="Liệt kê các kỹ năng chính (VD: Photoshop, ...)"
                  rows="2"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none',
                    colorMode.value === 'dark'
                      ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500'
                      : 'bg-white text-black border-gray-300 placeholder-gray-400'
                  ]"
                />
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="submitting"
                :class="[
                  'w-full font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2',
                  colorMode.value === 'dark'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {{ submitting ? 'Đang gửi...' : 'Gửi ứng tuyển' }}
              </button>

              <!-- Reset Button -->
              <button type="button" @click="resetForm"
                :class="[
                  'w-full border-2 font-semibold py-2 rounded-lg transition-all',
                  colorMode.value === 'dark'
                    ? 'border-slate-700 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                Xóa form
              </button>
            </form>

            <div v-if="submitError"
              :class="[
                'mt-4 border px-4 py-3 rounded-lg text-sm transition-colors duration-300',
                colorMode.value === 'dark'
                  ? 'bg-red-900/30 border-red-700 text-red-400'
                  : 'bg-red-50 border-red-300 text-red-700'
              ]"
            >
              {{ submitError }}
            </div>

            <!-- Contact Info -->
            <div :class="[
              'mt-8 pt-6 border-t transition-colors duration-300',
              colorMode.value === 'dark' ? 'border-slate-700' : 'border-gray-200'
            ]">
              <p :class="[
                'text-sm mb-4 font-semibold transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-300' : 'text-gray-600'
              ]">
                Có câu hỏi? Liên hệ chúng tôi:
              </p>
              <div class="space-y-3 text-sm">
                <div class="flex items-center gap-2">
                  <svg :class="[
                    'w-5 h-5 flex-shrink-0 transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-300' : 'text-black'
                  ]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-black'">
                    koastudio.vn@gmail.com
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <svg :class="[
                    'w-5 h-5 flex-shrink-0 transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-slate-300' : 'text-black'
                  ]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.547 1.318 1.608 2.88 3.33 4.602 1.722 1.722 3.285 2.783 4.602 3.33l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57c-8.235 0-15-6.765-15-15V5a1 1 0 011-1z" />
                  </svg>
                  <span :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-black'">
                    078.596.8888
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>