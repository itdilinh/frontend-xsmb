<template>
    <div class="container mt-4">
      <!-- Tiêu đề -->
      <h1 class="text-center text-uppercase text-danger fw-bold">{{ post.title }}</h1>
  
      <!-- Hình ảnh -->
      <div class="text-center my-4">
        <img :src="post.image" class="img-fluid rounded shadow-sm" :alt="post.title" />
      </div>
  
      <!-- Nội dung bài viết -->
      <div class="mt-3">
        <p class="text-muted" v-html="post.content"></p>
      </div>
  
      <!-- Quay lại danh sách -->
      <div class="text-center mt-4">
        <NuxtLink to="/" class="btn btn-outline-danger">Quay lại trang chủ</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const post = ref({})
  
  const fetchPost = () => {
    // Giả lập dữ liệu bài viết
    const postsData = [
      {
        slug: 'soi-cau-mien-bac-12-03',
        title: 'Soi Cầu Miền Bắc Ngày 12/03',
        image: 'https://via.placeholder.com/600x300',
        content: '<p>Dự đoán kết quả xổ số miền Bắc ngày 12/03 chuẩn nhất.</p><p>...</p>',
      },
      {
        slug: 'cach-bat-lo-roi',
        title: 'Cách Bắt Lô Rơi Chính Xác',
        image: 'https://via.placeholder.com/600x300',
        content: '<p>Hướng dẫn cách bắt lô rơi chuẩn xác từ các cao thủ.</p><p>...</p>',
      },
      {
        slug: 'soi-cau-mien-nam-12-03',
        title: 'Soi Cầu Miền Nam Ngày 12/03',
        image: 'https://via.placeholder.com/600x300',
        content: '<p>Dự đoán xổ số miền Nam ngày 12/03 với tỷ lệ cao.</p><p>...</p>',
      },
    ]
  
    // Tìm bài viết theo slug
    post.value = postsData.find(p => p.slug === route.params.slug) || {}
  }
  
  onMounted(() => {
    fetchPost()
  })
  </script>
  