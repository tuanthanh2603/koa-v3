<script setup lang="ts">
import { ref } from 'vue'

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
const submitError = ref('')

const submitForm = () => {
  submitError.value = ''

  if (!form.value.fullName || !form.value.email || !form.value.phone || !form.value.position) {
    submitError.value = 'Vui lòng điền đầy đủ thông tin bắt buộc'
    return
  }

  submitted.value = true
  console.log('Application submitted:', form.value)

  setTimeout(() => {
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
    submitted.value = false
  }, 5000)
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
  <section class="min-h-screen bg-white py-[12%] px-4">
    <!-- Header Banner -->


    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- Success Message -->
      <div v-if="submitted" class="mb-8 bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <div>
            <h3 class="text-lg font-bold text-green-800 mb-1">Ứng tuyển thành công!</h3>
            <p class="text-green-700">Cảm ơn bạn đã quan tâm đến KOA.vn. Chúng tôi sẽ liên hệ bạn sớm nhất có thể.</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <!-- Left Column - About Company and Process -->
        <div class="lg:col-span-2 space-y-12">
          <!-- About Company -->
          <div class="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Về KOA
            </h2>
            <p class="text-sm text-gray-700 leading-relaxed mb-4">
              KOA là công ty chuyên về thiết kế và thi công nội thất, ngoại thất, kiến trúc và xây dựng với hơn 10 năm
              kinh nghiệm. Chúng tôi tự hào về những công trình chất lượng cao, sáng tạo và bền vững.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed mb-4">
              Với đội ngũ kiến trúc sư, kỹ sư xây dựng, và thợ thi công giỏi, chúng tôi đã hoàn thành hàng trăm dự án từ
              nhỏ đến lớn cho các khách hàng cá nhân và doanh nghiệp.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed">
              Chúng tôi luôn tìm kiếm những nhân tài mới để cùng phát triển và xây dựng những công trình tuyệt vời.
            </p>
          </div>

          <!-- Recruitment Process -->
          <div class="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
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
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">1
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-2 text-base">Nộp hồ sơ</h3>
                  <p class="text-gray-600 text-sm">Điền đầy đủ thông tin cá nhân, chọn vị trí ứng tuyển và gửi hồ sơ qua form.
                  </p>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">2
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-2 text-base">Kiểm tra hồ sơ</h3>
                  <p class="text-gray-600 text-sm">Đội HR của chúng tôi sẽ xem xét hồ sơ và liên hệ bạn trong vòng 3-5 ngày.</p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">3
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-2 text-base">Phỏng vấn sơ bộ</h3>
                  <p class="text-gray-600 text-sm">Cuộc phỏng vấn trực tuyến hoặc qua điện thoại để tìm hiểu thêm về bạn.</p>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">4
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-2 text-base">Phỏng vấn chuyên môn</h3>
                  <p class="text-gray-600 text-sm">Gặp trực tiếp với bộ phận chuyên môn để đánh giá kỹ năng và kiến thức.</p>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">5
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-2 text-base">Quyết định cuối cùng</h3>
                  <p class="text-gray-600 text-sm">Nếu đạt yêu cầu, chúng tôi sẽ gửi offer và thuyết phục về lương, thời gian.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Why KOA -->
          <div class="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
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
                  <p class="font-bold text-gray-900 text-base">Môi trường chuyên nghiệp</p>
                  <p class="text-gray-600 text-sm">Làm việc với đội ngũ tàn tài, sáng tạo</p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="font-bold text-gray-900 text-base">Lương và phúc lợi cạnh tranh</p>
                  <p class="text-gray-600 text-sm">Mức lương xứng đáng với năng lực</p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="font-bold text-gray-900 text-base">Cơ hội phát triển</p>
                  <p class="text-gray-600 text-sm">Đào tạo và phát triển kỹ năng</p>
                </div>
              </div>

              <div class="flex gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="font-bold text-gray-900 text-base">Dự án đa dạng</p>
                  <p class="text-gray-600 text-sm">Làm việc trên các dự án thú vị, quy mô khác nhau</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Application Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-8 shadow-lg border border-gray-200 sticky top-4">
            <h2 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Ứng tuyển ngay
            </h2>
            <p class="text-gray-600 text-sm mb-6">Điền đầy đủ thông tin để ứng tuyển</p>

            <!-- Error Message -->
            

            <form @submit.prevent="submitForm" class="space-y-4" v-if="!submitted">
              <!-- Full Name -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Họ và tên *</label>
                <input v-model="form.fullName" type="text" placeholder="Nhập họ và tên"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />

              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input v-model="form.email" type="email" placeholder="your@email.com"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                <input v-model="form.phone" type="tel" placeholder="0123 456 789"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <!-- Position -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Vị trí ứng tuyển *</label>
                <select v-model="form.position"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="">-- Chọn vị trí --</option>
                  <option v-for="pos in positions" :key="pos.id" :value="pos.title">
                    {{ pos.title }}
                  </option>
                </select>
              </div>


              <!-- Experience -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kinh nghiệm</label>
                <textarea v-model="form.experience" placeholder="Mô tả kinh nghiệm làm việc của bạn..." rows="3"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
              </div>

              <!-- Skills -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kỹ năng</label>
                <textarea v-model="form.skills" placeholder="Liệt kê các kỹ năng chính (VD: Photoshop, ...)"
                  rows="2"
                  class="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
              </div>


              <!-- Submit Button -->
              <button type="submit"
                class="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Gửi ứng tuyển
              </button>

              <!-- Reset Button -->
              <button type="button" @click="resetForm"
                class="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:border-gray-400 transition-all">
                Xóa form
              </button>
            </form>

            <div v-if="submitError"
              class="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ submitError }}
            </div>

            <!-- Contact Info -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <p class="text-sm text-gray-600 mb-4 font-semibold">Có câu hỏi? Liên hệ chúng tôi:</p>
              <div class="space-y-3 text-sm">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span class="text-black">koastudio.vn@gmail.com</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.547 1.318 1.608 2.88 3.33 4.602 1.722 1.722 3.285 2.783 4.602 3.33l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57c-8.235 0-15-6.765-15-15V5a1 1 0 011-1z" />
                  </svg>
                  <span class="text-black">078.596.8888</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>