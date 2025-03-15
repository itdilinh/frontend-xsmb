<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <nav class="bg-dark text-white vh-100 p-3 overflow-auto" style="width: 250px;">
        <h4 class="text-center">Admin Panel</h4>
        <ul class="nav flex-column">
          <li class="nav-item">
            <NuxtLink to="/admin/dashboard" class="nav-link text-white">📊 Dashboard</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/users" class="nav-link text-white">👥 Quản lý User</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/ArticleList" class="nav-link text-white">📰 Quản lý Tin tức</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/admincomments" class="nav-link text-white">💬 Quản lý Comment</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/thongke" class="nav-link text-white">💬 Quản lý thống kê</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/xoso" class="nav-link text-white">🎟️ Kết quả Xổ số</NuxtLink>
          </li>
        </ul>
      </nav>
  
      <!-- Nội dung Dashboard -->
      <div class="container-fluid p-4">
        <h2 v-if="loading">⏳ Đang tải dữ liệu...</h2>
        <h2 v-else>📊 Dashboard Admin</h2>
  
        <div class="row" v-if="!loading">
          <div class="col-md-4">
            <div class="card bg-primary text-white p-3">
              <h5>Tổng User</h5>
              <h2>{{ totalUsers }}</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-warning text-white p-3">
              <h5>Tổng Bài Viết</h5>
              <h2>{{ totalPosts }}</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-success text-white p-3">
              <h5>Kết quả Xổ số</h5>
              <h2>{{ totalResults }}</h2>
            </div>
          </div>
        </div>
  
        <!-- Danh sách User -->
        <div class="mt-4" v-if="!loading">
          <h4>Danh sách User mới nhất</h4>
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Quyền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.slice(0, 5)" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
          <NuxtLink to="/admin/users" class="btn btn-outline-primary">Xem tất cả</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const totalUsers = ref(0);
  const totalPosts = ref(0);
  const totalResults = ref(0);
  const users = ref([]);
  const loading = ref(true);
  
  // Fetch dữ liệu từ API
  const fetchData = async () => {
    loading.value = true;
    try {
      const [userRes, postRes, resultRes] = await Promise.all([
        fetch('http://localhost:3000/api/users'),
        fetch('http://localhost:3000/api/posts'),
        fetch('http://localhost:3000/api/results')
      ]);
  
      const [userData, postData, resultData] = await Promise.all([
        userRes.json(),
        postRes.json(),
        resultRes.json()
      ]);
  
      totalUsers.value = userData.length;
      users.value = userData;
      totalPosts.value = postData.length;
      totalResults.value = resultData.length;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchData);
  </script>
  