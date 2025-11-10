<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
}

interface Achievement {
  number: string
  title: string
  description: string
}

interface Value {
  title: string
  description: string
}

interface Service {
  title: string
  description: string
}

const colorMode = useColorMode()
const isHydrated = ref(false)
const hoveredService = ref<number | null>(null)

const values = ref<Value[]>([
  { title: 'Chất lượng', description: 'Cam kết mang đến sản phẩm tốt nhất, đáp ứng tiêu chuẩn quốc tế.' },
  { title: 'Sáng tạo', description: 'Luôn tìm tòi những ý tưởng mới, thiết kế độc đáo và hiện đại.' },
  { title: 'Đúng tiến độ', description: 'Quản lý chặt chẽ tiến độ dự án, giao hàng đúng thời gian hẹn.' },
  { title: 'Tin tưởng', description: 'Xây dựng mối quan hệ dài hạn dựa trên tính trung thực và minh bạch.' }
])

const services = ref<Service[]>([
  { title: 'Thiết kế nội thất', description: 'Thiết kế không gian nội thất theo phong cách hiện đại, tối ưu hóa công năng.' },
  { title: 'Thiết kế ngoại thất', description: 'Thiết kế cảnh quan, sân vườn, khu vui chơi với cây xanh và tiện ích.' },
  { title: 'Kiến trúc công trình', description: 'Thiết kế kiến trúc công trình nhà ở, văn phòng, công cộng, thương mại.' },
  { title: 'Thi công xây dựng', description: 'Thi công chất lượng cao với đội thợ chuyên nghiệp và kinh nghiệm.' },
  { title: 'Tư vấn thiết kế', description: 'Tư vấn toàn diện từ khái niệm, thiết kế đến thực hiện công trình.' },
  { title: 'Nội thất và trang trí', description: 'Lựa chọn và lắp đặt nội thất, trang trí ngoài thất chuyên nghiệp.' }
])

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
</script>

<template>
  <div v-if="isHydrated" :class="[
    'transition-colors duration-500',
    colorMode.value === 'dark' ? 'bg-black' : 'bg-white'
  ]">
    <!-- Header Section -->
    <section class="pt-20 pb-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 :class="[
          'text-6xl font-extrabold transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
        ]">
          Kiến Trúc KOA
        </h1>
        <p :class="[
          'text-2xl font-medium mt-2 transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
        ]">
          Kiến Tạo Hơi Thở Không Gian
        </p>
        <div :class="[
          'h-[2px] w-24 mt-4 transition-colors duration-300',
          colorMode.value === 'dark' ? 'bg-slate-200' : 'bg-black'
        ]"></div>
      </div>
    </section>

    <!-- About Section -->
    <section :class="[
      'py-16 px-4 border-t transition-colors duration-300',
      colorMode.value === 'dark'
        ? 'border-slate-800'
        : 'border-gray-200'
    ]">
      <div class="max-w-6xl mx-auto">
        <h2 :class="[
          'text-2xl font-bold mb-12 transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
        ]">
          Về chúng tôi
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div :class="[
            'space-y-6 leading-relaxed text-sm transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-700'
          ]">
            <p>
              KOA là công ty tiên phong trong lĩnh vực thiết kế và thi công nội ngoại thất, kiến trúc
              và xây dựng tại Việt Nam.
            </p>
            <p>
              Chúng tôi không chỉ cung cấp dịch vụ, mà còn tạo ra những không gian sống và làm việc
              tuyệt vời, phản ánh cá tính và nhu cầu của mỗi khách hàng.
            </p>
            <p>
              Với đội ngũ gồm kiến trúc sư, kỹ sư xây dựng và thợ thi công có chuyên môn cao, chúng tôi
              cam kết mang lại chất lượng tốt nhất cho mỗi dự án.
            </p>
          </div>
          <div :class="[
            'border p-8 rounded-xl space-y-6 transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'border-slate-800 bg-slate-900'
              : 'border-gray-200 bg-white'
          ]">
            <div>
              <p :class="[
                'text-sm font-semibold uppercase mb-1 transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
              ]">
                Địa chỉ
              </p>
              <p :class="[
                'text-base font-bold transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
              ]">
                183/48 Huỳnh Thị Hai, Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh
              </p>
            </div>
            <div :class="[
              'border-t pt-4 transition-colors duration-300',
              colorMode.value === 'dark' ? 'border-slate-800' : 'border-gray-200'
            ]">
              <p :class="[
                'text-sm font-semibold uppercase mb-1 transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
              ]">
                Điện thoại
              </p>
              <p :class="[
                'text-base font-bold transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
              ]">
                078.596.8888
              </p>
            </div>
            <div :class="[
              'border-t pt-4 transition-colors duration-300',
              colorMode.value === 'dark' ? 'border-slate-800' : 'border-gray-200'
            ]">
              <p :class="[
                'text-sm font-semibold uppercase mb-1 transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
              ]">
                Email
              </p>
              <p :class="[
                'text-base font-bold transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
              ]">
                koastudio.vn@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section :class="[
      'py-16 px-4 border-t transition-colors duration-300',
      colorMode.value === 'dark'
        ? 'border-slate-800'
        : 'border-gray-200'
    ]">
      <div class="max-w-6xl mx-auto">
        <h2 :class="[
          'text-2xl font-bold mb-12 transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
        ]">
          Dịch vụ
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(service, idx) in services" 
            :key="idx"
            :class="[
              'p-6 rounded-xl border cursor-pointer transition-all duration-300',
              colorMode.value === 'dark'
                ? hoveredService === idx
                  ? 'bg-slate-800 border-slate-700 shadow-lg shadow-blue-900/20'
                  : 'bg-slate-900 border-slate-800 hover:shadow-md hover:shadow-slate-800'
                : hoveredService === idx
                  ? 'bg-white border-gray-300 shadow-md'
                  : 'bg-white border-gray-200 hover:shadow-md'
            ]"
            @mouseenter="hoveredService = idx" 
            @mouseleave="hoveredService = null"
          >
            <h3 :class="[
              'text-base font-bold mb-2 transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
            ]">
              {{ service.title }}
            </h3>
            <p :class="[
              'text-sm transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
            ]">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section :class="[
      'py-16 px-4 border-t transition-colors duration-300',
      colorMode.value === 'dark'
        ? 'border-slate-800 bg-slate-900'
        : 'border-gray-200 bg-gray-50'
    ]">
      <div class="max-w-6xl mx-auto">
        <h2 :class="[
          'text-2xl font-bold mb-12 transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
        ]">
          Giá trị cốt lõi
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="value in values" 
            :key="value.title"
            :class="[
              'border p-6 rounded-xl transition-all duration-300 hover:shadow-md',
              colorMode.value === 'dark'
                ? 'bg-slate-800 border-slate-700 shadow-sm'
                : 'bg-white border-gray-200 shadow-sm'
            ]"
          >
            <div class="flex items-start gap-3 mb-3">
              <div :class="[
                'text-2xl font-bold flex-shrink-0 transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-blue-400' : 'text-green-600'
              ]">
                ✓
              </div>
              <h3 :class="[
                'text-base font-semibold transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
              ]">
                {{ value.title }}
              </h3>
            </div>
            <p :class="[
              'text-sm transition-colors duration-300',
              colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
            ]">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section :class="[
      'py-16 px-4 border-t transition-colors duration-300',
      colorMode.value === 'dark'
        ? 'border-slate-800'
        : 'border-gray-200'
    ]">
      <div class="max-w-6xl mx-auto text-center">
        <h2 :class="[
          'text-2xl font-bold mb-4 transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
        ]">
          Sẵn sàng bắt đầu dự án?
        </h2>
        <p :class="[
          'mb-8 text-base transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
        ]">
          Hãy liên hệ với chúng tôi để được tư vấn miễn phí
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <a 
            href="tel:0785968888"
            :class="[
              'px-8 py-3 border rounded-lg font-semibold transition-all duration-300',
              colorMode.value === 'dark'
                ? 'border-slate-300 text-slate-200 hover:bg-slate-200 hover:text-black'
                : 'border-black text-black hover:bg-black hover:text-white'
            ]"
          >
            Gọi ngay
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Giữ style tối giản */
</style>