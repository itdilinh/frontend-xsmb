<template>
    <div class="login-container">
      <div class="login-box">
        <h2 class="text-center text-danger">🔑 Đăng Nhập</h2>
  
        <form @submit.prevent="login" class="fade-in">
          <div class="mb-3">
            <label class="form-label">📧 Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">🔑 Mật khẩu</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
  
          <button class="btn btn-danger w-100 shadow">🚀 Đăng Nhập</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const login = async () => {
    try {
      const { data } = await useFetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: { email: email.value, password: password.value },
      })
      if (data.value.token) {
        localStorage.setItem('token', data.value.token)
        router.push('/')
      }
    } catch (error) {
      alert('Sai email hoặc mật khẩu')
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
  }
  .login-box {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 350px;
  }
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>
  