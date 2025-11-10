<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type FormState = {
    name: string
    phone: string
    email: string
    projectType: string
    budget: string
    message: string
}

const colorMode = useColorMode()
const isHydrated = ref(false)

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
    <section v-if="isHydrated" :class="[
        'transition-colors duration-500',
        colorMode.value === 'dark' ? 'bg-black' : 'bg-white'
    ]">
        <div class="contact-wrapper">
            <h1 :class="[
                'text-2xl font-bold text-center transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-black'
            ]">
                Liên hệ báo giá
            </h1>
            <p :class="[
                'text-sm my-5 text-center transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
            ]">
                Vui lòng điền thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá.
            </p>

            <form class="contact-form" @submit.prevent="submitForm" :class="[
                'border transition-colors duration-300',
                colorMode.value === 'dark'
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-gray-200'
            ]">
                <div class="grid">
                    <!-- Name -->
                    <div class="field">
                        <label for="name" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Họ và tên
                            <span class="req">*</span>
                        </label>
                        <input 
                            id="name" 
                            type="text" 
                            v-model="form.name" 
                            placeholder="Nguyễn Văn A"
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 placeholder-gray-400 focus:border-blue-500'
                            ]"
                        />
                    </div>

                    <!-- Phone -->
                    <div class="field">
                        <label for="phone" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Số điện thoại
                        </label>
                        <input 
                            id="phone" 
                            type="tel" 
                            v-model="form.phone" 
                            placeholder="090x xxx xxx"
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 placeholder-gray-400 focus:border-blue-500'
                            ]"
                        />
                    </div>

                    <!-- Email -->
                    <div class="field">
                        <label for="email" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Email
                        </label>
                        <input 
                            id="email" 
                            type="email" 
                            v-model="form.email" 
                            placeholder="your@email.com"
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 placeholder-gray-400 focus:border-blue-500'
                            ]"
                        />
                    </div>

                    <!-- Project Type -->
                    <div class="field">
                        <label for="projectType" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Loại dự án
                        </label>
                        <select 
                            id="projectType" 
                            v-model="form.projectType"
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 focus:border-blue-500'
                            ]"
                        >
                            <option value="">-- Chọn --</option>
                            <option>Thiết kế nội thất</option>
                            <option>Thi công nội thất</option>
                            <option>Thiết kế kiến trúc</option>
                            <option>Thi công xây dựng</option>
                            <option>Thi công trọn gói</option>
                            <option>Dịch vụ khác</option>
                        </select>
                    </div>

                    <!-- Budget -->
                    <div class="field">
                        <label for="budget" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Ngân sách dự kiến
                        </label>
                        <input 
                            id="budget" 
                            type="text" 
                            v-model="form.budget" 
                            placeholder="VD: 200 triệu"
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 placeholder-gray-400 focus:border-blue-500'
                            ]"
                        />
                    </div>

                    <!-- Message -->
                    <div class="field field-full">
                        <label for="message" :class="[
                            'text-base transition-colors duration-300',
                            colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-900'
                        ]">
                            Nội dung yêu cầu
                        </label>
                        <textarea 
                            id="message" 
                            rows="5" 
                            v-model="form.message" 
                            placeholder="Mô tả nhu cầu của bạn..."
                            :class="[
                                'px-3 py-2 border rounded-lg outline-none transition-all duration-300 resize-none',
                                colorMode.value === 'dark'
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 placeholder-slate-500 focus:border-blue-500'
                                    : 'bg-white text-black border-gray-300 placeholder-gray-400 focus:border-blue-500'
                            ]"
                        ></textarea>
                    </div>
                </div>

                <!-- Actions -->
                <div class="actions">
                    <button 
                        class="btn" 
                        type="submit" 
                        :disabled="submitting"
                        :class="[
                            'transition-all duration-300',
                            colorMode.value === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                                : 'bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                        ]"
                    >
                        {{ submitting ? 'Đang gửi...' : 'Gửi yêu cầu' }}
                    </button>
                </div>

                <!-- Messages -->
                <p v-if="!isValid" class="hint"></p>
                <p v-if="submitError" :class="[
                    'text-base mt-3 transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-red-400' : 'text-red-600'
                ]">
                    {{ submitError }}
                </p>
                <p v-if="submitSuccess" :class="[
                    'success transition-colors duration-300',
                    colorMode.value === 'dark' ? 'text-green-400' : 'text-green-600'
                ]">
                    {{ submitSuccess }}
                </p>
            </form>
        </div>
    </section>
</template>

<style scoped>
.contact-wrapper { max-width: 880px; margin: 0 auto; padding: 24px 16px; }
.title { font-size: 28px; font-weight: 700; margin: 8px 0 4px; }
.subtitle { margin: 0 0 20px; }

.contact-form { border-radius: 12px; padding: 16px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-full { grid-column: 1 / -1; }

label { font-weight: 600; }
.req { color: #e11d48; margin-left: 4px; }

input, select, textarea { 
    border-radius: 8px; 
    outline: none; 
    font-family: inherit;
}

input:focus, select:focus, textarea:focus { 
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.actions { margin-top: 8px; }
.btn { 
    color: #fff; 
    padding: 10px 16px; 
    border-radius: 8px; 
    border: none; 
    cursor: pointer;
    font-weight: 600;
    transition-property: background-color;
    transition-duration: 200ms;
}

.btn[disabled] { opacity: 0.6; cursor: not-allowed; }

.hint { margin-top: 8px; font-size: 14px; }
.error { margin-top: 8px; font-weight: 600; }
.success { margin-top: 8px; font-weight: 600; }

@media (min-width: 720px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .field-full { grid-column: 1 / 3; }
}
</style>