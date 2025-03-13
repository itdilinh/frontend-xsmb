<template>
    <div class="container my-4">
      <div id="bannerCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(banner, index) in banners" :key="index" class="carousel-item" :class="{ active: index === 0 }">
            <img :src="banner" class="d-block w-100 rounded" alt="Quảng cáo" />
          </div>
        </div>
  
        <!-- Nút điều hướng -->
        <button class="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const banners = ref([
    '/images/1.webp',
    '/images/2.jpg',
    '/images/3.jfif',


    
  ])
  </script>
  
  <style scoped>
  .carousel-item img {
    max-height: 200px;
    object-fit: cover;
  }
  </style>
  