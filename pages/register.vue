<template>
    <div class="container mt-5">
      <h2 class="text-center text-danger">Đăng Ký</h2>
      <form @submit.prevent="registerUser" class="w-50 mx-auto p-4 border rounded shadow">
        <div class="mb-3">
          <label class="form-label">Tên đăng nhập</label>
          <input v-model="form.username" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Số Điện Thoại</label>
          <input v-model="form.phone" type="phone" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="form.password" type="password" class="form-control" required minlength="6" />
        </div>
        <button type="submit" class="btn btn-danger w-100">Đăng Ký</button>
      </form>
  
      <p v-if="message" class="text-center text-success mt-3">{{ message }}</p>
      <p v-if="error" class="text-center text-danger mt-3">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useFetch } from '#app'
  
  const form = ref({ username: '', email: '', password: '', phone:'' })
  const message = ref('')
  const error = ref('')
  
  const registerUser = async () => {
    message.value = ''
    error.value = ''
    try {
      const { data } = await useFetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: form.value
      })
      message.value = data.value.message
    } catch (err) {
      error.value = 'Đăng ký thất bại: ' + (err.data?.message || 'Lỗi không xác định')
    }
  }
  </script>
  