<template>
    <div class="container mt-5">
      <div v-if="article" class="card shadow-lg">
        <img :src="article.image" class="card-img-top" alt="Article Image">
        <div class="card-body">
          <h2 class="card-title">{{ article.title }}</h2>
          <p class="text-muted">Danh mục: {{ article.category }}</p>
          <p class="card-text">{{ article.content }}</p>
          <NuxtLink to="/tin-tuc" class="btn btn-secondary">⬅ Quay lại danh sách</NuxtLink>
        </div>
      </div>
      <div v-else class="text-center">
        <p>🛑 Không tìm thấy bài viết.</p>
        <NuxtLink to="/tin-tuc" class="btn btn-warning">Quay lại</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const article = ref(null);
  
  onMounted(async () => {
    const res = await fetch("/news.json");
    const newsList = await res.json();
    article.value = newsList.find(item => item.id == route.params.id);
  });
  </script>
  