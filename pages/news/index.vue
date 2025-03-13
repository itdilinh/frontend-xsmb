<template>
    <div class="container mt-4">
      <h2 class="text-primary">📰 Tin Tức Mới Nhất</h2>
  
      <div class="row">
        <div v-for="news in newsList" :key="news._id" class="col-md-4">
          <div class="card shadow-sm mb-4">
            <img :src="news.image" class="card-img-top" alt="news image" />
            <div class="card-body">
              <h5 class="card-title">{{ news.title }}</h5>
              <p class="card-text text-muted">{{ news.summary }}</p>
              <NuxtLink :to="'/news/' + news._id" class="btn btn-primary">Xem chi tiết</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { data: newsList } = await useFetch("http://localhost:3000/news");
  </script>
  