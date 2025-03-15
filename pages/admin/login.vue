<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 400px;">
        <h3 class="text-center">🔐 Đăng nhập Admin</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
          </button>
        </form>
        <p v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  definePageMeta({
  middleware: "admin",
});
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMessage = ref("");
  
  const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = "";
  
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
  
      if (data.user.role !== "admin") {
        throw new Error("Bạn không có quyền truy cập Admin!");
      }
  
      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));
  
      // Chuyển hướng đến Dashboard Admin
      router.push("/admin/dashboard");
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      loading.value = false;
    }
  };
  </script>
  