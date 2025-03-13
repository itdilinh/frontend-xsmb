<template>
    <div class="container mt-4">
      <div v-if="news">
        <h2 class="text-primary">{{ news.title }}</h2>
        <p class="text-muted">Ngày đăng: {{ news.date }}</p>
        <img :src="news.image" class="img-fluid rounded mb-3" alt="news image" />
        <p>{{ news.content }}</p>
        <NuxtLink to="/news" class="btn btn-secondary mt-3">⬅ Quay lại</NuxtLink>
      </div>
      <div v-else class="text-center">
        <p class="text-danger">Không tìm thấy bài viết!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const { data: news } = await useFetch(`http://localhost:3000/news/${route.params.id}`);
  </script>
  