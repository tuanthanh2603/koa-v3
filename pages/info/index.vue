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
</script>

<template>
  <div class="min-h-screen bg-white text-black py-[10%] px-4">
    <!-- Header Section -->
    <section class="pt-20 pb-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-6xl font-extrabold text-black">Kiến Trúc KOA</h1>
        <p class="text-2xl font-medium text-gray-600 mt-2">Kiến Tạo Hơi Thở Không Gian</p>
        <div class="h-[2px] w-24 bg-black mt-4"></div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 px-4 border-t border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-black mb-12">Về chúng tôi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-700 leading-relaxed">
            <p class="text-sm">KOA là công ty tiên phong trong lĩnh vực thiết kế và thi công nội ngoại thất, kiến trúc
              và xây dựng tại Việt Nam.</p>
            <p class="text-sm">Chúng tôi không chỉ cung cấp dịch vụ, mà còn tạo ra những không gian sống và làm việc
              tuyệt vời, phản ánh cá tính và nhu cầu của mỗi khách hàng.</p>
            <p class="text-sm">Với đội ngũ gồm kiến trúc sư, kỹ sư xây dựng và thợ thi công có chuyên môn cao, chúng tôi
              cam kết mang lại chất lượng tốt nhất cho mỗi dự án.</p>
          </div>
          <div class="border border-gray-200 p-8 rounded-xl space-y-6">
            <div>
              <p class="text-sm font-semibold uppercase text-gray-500 mb-1">Địa chỉ</p>
              <p class="text-base font-bold text-black">183/48 Huỳnh Thị Hai, Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh
              </p>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <p class="text-sm font-semibold uppercase text-gray-500 mb-1">Điện thoại</p>
              <p class="text-base font-bold text-black">078.596.8888</p>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <p class="text-sm font-semibold uppercase text-gray-500 mb-1">Email</p>
              <p class="text-base font-bold text-black">koastudio.vn@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 px-4 border-t border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-12 text-black">Dịch vụ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(service, idx) in services" :key="idx"
            class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md cursor-pointer transition-all"
            @mouseenter="hoveredService = idx" @mouseleave="hoveredService = null">
            <h3 class="text-base font-bold text-black mb-2">{{ service.title }}</h3>
            <p class="text-gray-600 text-sm">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 px-4 border-t border-gray-200 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-12 text-black">Giá trị cốt lõi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title"
            class="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div class="flex items-center gap-2">
              <div class="text-2xl font-bold mb-3">✓</div>
              <h3 class="text-base font-semibold text-black mb-2">{{ value.title }}</h3>
            </div>
            <p class="text-gray-600 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 border-t border-gray-200">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Sẵn sàng bắt đầu dự án?</h2>
        <p class="text-gray-600 mb-8 text-base">Hãy liên hệ với chúng tôi để được tư vấn miễn phí</p>
        <div class="flex gap-4 justify-center flex-wrap">
          <a href="mailto:info@koa.vn"
            class="px-8 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-all">
            Gửi email
          </a>
          <a href="tel:0123456789"
            class="px-8 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-all">
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
