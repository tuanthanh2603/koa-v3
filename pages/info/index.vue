<script setup lang="ts">
import { ref } from 'vue'

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

const hoveredService = ref<number | null>(null)

const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    position: 'Giám đốc Điều hành',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    position: 'Kiến trúc sư trưởng',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
  },
  {
    id: 3,
    name: 'Phạm Văn C',
    position: 'Trưởng bộ phận thi công',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
  },
  {
    id: 4,
    name: 'Lê Thị D',
    position: 'Trưởng bộ phận thiết kế',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4'
  }
])

const achievements = ref<Achievement[]>([
  {
    number: '500+',
    title: 'Dự án hoàn thành',
    description: 'Các công trình từ nhỏ đến lớn'
  },
  {
    number: '1000+',
    title: 'Khách hàng hài lòng',
    description: 'Độ tin cậy và chất lượng cao'
  },
  {
    number: '25+',
    title: 'Giải thưởng',
    description: 'Công nhân kiến trúc xuất sắc'
  },
  {
    number: '4.8/5',
    title: 'Đánh giá trung bình',
    description: 'Từ khách hàng và đối tác'
  }
])

const values = ref<Value[]>([
  {
    title: 'Chất lượng',
    description: 'Cam kết mang đến sản phẩm tốt nhất, đáp ứng tiêu chuẩn quốc tế.'
  },
  {
    title: 'Sáng tạo',
    description: 'Luôn tìm tòi những ý tưởng mới, thiết kế độc đáo và hiện đại.'
  },
  {
    title: 'Đúng tiến độ',
    description: 'Quản lý chặt chẽ tiến độ dự án, giao hàng đúng thời gian hẹn.'
  },
  {
    title: 'Tin tưởng',
    description: 'Xây dựng mối quan hệ dài hạn dựa trên tính trung thực và minh bạch.'
  }
])

const services = ref<Service[]>([
  {
    title: 'Thiết kế nội thất',
    description: 'Thiết kế không gian nội thất theo phong cách hiện đại, tối ưu hóa công năng.'
  },
  {
    title: 'Thiết kế ngoại thất',
    description: 'Thiết kế cảnh quan, sân vườn, khu vui chơi với cây xanh và tiện ích.'
  },
  {
    title: 'Kiến trúc công trình',
    description: 'Thiết kế kiến trúc công trình nhà ở, văn phòng, công cộng, thương mại.'
  },
  {
    title: 'Thi công xây dựng',
    description: 'Thi công chất lượng cao với đội thợ chuyên nghiệp và kinh nghiệm.'
  },
  {
    title: 'Tư vấn thiết kế',
    description: 'Tư vấn toàn diện từ khái niệm, thiết kế đến thực hiện công trình.'
  },
  {
    title: 'Nội thất và trang trí',
    description: 'Lựa chọn và lắp đặt nội thất, trang trí ngoài thất chuyên nghiệp.'
  }
])
</script>

<template>
  <div class="min-h-screen bg-white py-[12%] px-4">
    <!-- Header Section -->
    <section class="pt-20 pb-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <h1
            class="text-7xl font-extrabold bg-gradient-to-b from-gray-900 via-gray-700 to-black bg-clip-text text-transparent drop-shadow-lg">
            Kiến Trúc KOA
          </h1>


          <p class="text-3xl font-semibold text-gray-700">Kiến Tạo Hơi Thở Không Gian
          </p>
          <div class="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-500 mt-4"></div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-3">
          <span class="w-1 h-12 bg-gradient-to-b from-blue-600 to-emerald-500 rounded"></span>
          Về chúng tôi
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <p class="text-base text-gray-700 leading-relaxed">
              KOA là công ty tiên phong trong lĩnh vực thiết kế và thi công nội ngoại thất, kiến trúc và xây dựng tại
              Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi đã trở thành đối tác tin cậy của hàng ngàn khách hàng cá
              nhân và doanh nghiệp.
            </p>
            <p class="text-base text-gray-700 leading-relaxed">
              Chúng tôi không chỉ cung cấp dịch vụ, mà còn tạo ra những không gian sống và làm việc tuyệt vời, phản ánh
              cá tính và nhu cầu của mỗi khách hàng.
            </p>
            <p class="text-base text-gray-700 leading-relaxed">
              Với đội ngũ gồm kiến trúc sư, kỹ sư xây dựng và thợ thi công có chuyên môn cao, chúng tôi cam kết mang lại
              chất lượng tốt nhất cho mỗi dự án.
            </p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 p-8 space-y-8 rounded-xl">
            <div class="group">
              <p class="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">Địa chỉ</p>
              <p class="text-xl font-bold text-gray-800">TP. Hồ Chí Minh, Việt Nam</p>
            </div>
            <div class="border-t border-blue-200 pt-6">
              <p class="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">Điện thoại</p>
              <p class="text-xl font-bold text-gray-800">0123 456 789</p>
            </div>
            <div class="border-t border-blue-200 pt-6">
              <p class="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">Email</p>
              <p class="text-xl font-bold text-gray-800 break-all">info@koa.vn</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Services Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-3">
          <span class="w-1 h-12 bg-gradient-to-b from-blue-600 to-emerald-500 rounded"></span>
          Dịch vụ
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(service, idx) in services" :key="idx" @mouseenter="hoveredService = idx"
            @mouseleave="hoveredService = null"
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 cursor-pointer group">
            <div class="flex items-start gap-3 mb-3">
              <svg class="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {{ service.title }}
              </h3>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
            <div v-if="hoveredService === idx" class="flex items-center gap-2 text-blue-600 font-semibold mt-4">
              Tìm hiểu thêm
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 px-4 bg-gradient-to-r from-blue-50 to-emerald-50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-3">
          <span class="w-1 h-12 bg-gradient-to-b from-blue-600 to-emerald-500 rounded"></span>
          Giá trị cốt lõi
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title"
            class="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-all">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg mb-4 flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-12 rounded-2xl shadow-2xl">
          <h2 class="text-4xl font-bold mb-4">Sẵn sàng bắt đầu dự án?</h2>
          <p class="text-lg text-blue-50 mb-8">Hãy liên hệ với chúng tôi để được tư vấn miễn phí</p>
          <div class="flex gap-4 flex-wrap">
            <a href="mailto:info@koa.vn"
              class="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
              Gửi email
            </a>
            <a href="tel:0123456789"
              class="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                </path>
              </svg>
              Gọi ngay
            </a>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<style scoped>
/* Tùy chỉnh styles nếu cần */
</style>