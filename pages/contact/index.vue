<script setup lang="ts">
import { ref, computed } from 'vue'

type FormState = {
    name: string
    phone: string
    email: string
    projectType: string
    budget: string
    message: string
}

const form = ref<FormState>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
})

const submitting = ref(false)
const submitSuccess = ref<string>('')
const submitError = ref<string>('')

const isValid = computed(() => {
    return form.value.name.trim().length > 0 && (form.value.phone.trim().length > 0 || form.value.email.trim().length > 0)
})

async function submitForm() {
    submitSuccess.value = ''
    submitError.value = ''
    if (!isValid.value) {
        submitError.value = 'Vui lòng nhập tên và ít nhất số điện thoại hoặc email.'
        return
    }

    submitting.value = true
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value),
        })
        const data = await res.json()
        if (!res.ok || !data?.ok) {
            throw new Error(data?.statusMessage || 'Gửi không thành công')
        }
        submitSuccess.value = 'Gửi liên hệ thành công. Chúng tôi sẽ phản hồi sớm!'
        form.value = { name: '', phone: '', email: '', projectType: '', budget: '', message: '' }
    } catch (err: any) {
        submitError.value = err?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
    } finally {
        submitting.value = false
    }
}
</script>
<template>
    <section >
        <div class="contact-wrapper">
            <h1 class="text-2xl font-bold text-center">Liên hệ báo giá</h1>
            <p class="text-sm my-5 text-center">Vui lòng điền thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá.</p>

            <form class="contact-form" @submit.prevent="submitForm">
                <div class="grid">
                    <div class="field">
                        <label for="name" class="text-base">Họ và tên<span class="req">*</span></label>
                        <input class="text-black placeholder-gray-400" id="name" type="text" v-model="form.name" placeholder="Nguyễn Văn A" />
                    </div>
                    <div class="field">
                        <label for="phone" class="text-base">Số điện thoại</label>
                        <input class="text-black placeholder-gray-400" id="phone" type="tel" v-model="form.phone" placeholder="090x xxx xxx" />
                    </div>
                    <div class="field">
                        <label for="email" class="text-base">Email</label>
                        <input class="text-black placeholder-gray-400" id="email" type="email" v-model="form.email" placeholder="your@email.com" />
                    </div>
                    <div class="field">
                        <label for="projectType" class="text-base">Loại dự án</label>
                        <select id="projectType" v-model="form.projectType">
                            <option value="">-- Chọn --</option>
                            <option>Thiết kế nội thất</option>
                            <option>Thi công nội thất</option>
                            <option>Thiết kế kiến trúc</option>
                            <option>Thi công xây dựng</option>
                            <option>Thi công trọn gói</option>
                            <option>Dịch vụ khác</option>
                        </select>
                    </div>
                    <div class="field">
                        <label for="budget" class="text-base">Ngân sách dự kiến</label>
                        <input id="budget" type="text" v-model="form.budget" placeholder="VD: 200 triệu" class="text-black placeholder-gray-400"/>
                    </div>
                    <div class="field field-full">
                        <label for="message" class="text-base">Nội dung yêu cầu</label>
                        <textarea class="text-black placeholder-gray-400" id="message" rows="5" v-model="form.message" placeholder="Mô tả nhu cầu của bạn..."></textarea>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn" type="submit" :disabled="submitting">
                        {{ submitting ? 'Đang gửi...' : 'Gửi yêu cầu' }}
                    </button>
                </div>

                <p v-if="!isValid" class="hint"></p>
                <p v-if="submitError" class="text-[#dc2626] text-base">{{ submitError }}</p>
                <p v-if="submitSuccess" class="success">{{ submitSuccess }}</p>
            </form>
        </div>
    </section>
</template>

<style scoped>
.contact-wrapper { max-width: 880px; margin: 0 auto; padding: 24px 16px; }
.title { font-size: 28px; font-weight: 700; margin: 8px 0 4px; }
.subtitle { color: #666; margin: 0 0 20px; }

.contact-form { background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 16px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-full { grid-column: 1 / -1; }
label { font-weight: 600; }
.req { color: #e11d48; margin-left: 4px; }
input, select, textarea { padding: 10px 12px; border: 1px solid #ddd; border-radius: 8px; outline: none; }
input:focus, select:focus, textarea:focus { border-color: #999; }

.actions { margin-top: 8px; }
.btn { background: #111; color: #fff; padding: 10px 16px; border-radius: 8px; border: none; cursor: pointer; }
.btn[disabled] { opacity: 0.6; cursor: not-allowed; }

.hint { margin-top: 8px; color: #888; font-size: 14px; }
.error { margin-top: 8px; color: #dc2626; font-weight: 600; }
.success { margin-top: 8px; color: #16a34a; font-weight: 600; }

@media (min-width: 720px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .field-full { grid-column: 1 / 3; }
}
</style>