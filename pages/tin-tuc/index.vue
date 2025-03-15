<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">📢 Tin Tức Xổ Số</h2>
  
      <!-- Bộ lọc & tìm kiếm -->
      <div class="mb-3 d-flex">
        <input v-model="searchQuery" class="form-control me-2" placeholder="🔍 Tìm kiếm tin tức..." />
        <select v-model="selectedCategory" class="form-select">
          <option value="">Tất cả danh mục</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
  
      <!-- Danh sách bài viết -->
      <div class="row">
        <div v-for="news in filteredNews" :key="news.id" class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img :src="news.image" class="card-img-top" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">{{ news.title }}</h5>
              <p class="card-text">{{ news.description }}</p>
              <NuxtLink :to="`/tin-tuc/${news.id}`" class="btn btn-primary">Xem chi tiết</NuxtLink>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Phân trang -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">⬅ Trước</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Tiếp ➡</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const newsList = ref([]);
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 6;
  
  onMounted(async () => {
    const res = await fetch("/news.json");
    newsList.value = await res.json();
  });
  
  // Danh sách danh mục
  const categories = computed(() => [...new Set(newsList.value.map(news => news.category))]);
  
  // Lọc tin tức theo tìm kiếm & danh mục
  const filteredNews = computed(() => {
    let filtered = newsList.value;
    if (searchQuery.value) {
      filtered = filtered.filter(news => news.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    if (selectedCategory.value) {
      filtered = filtered.filter(news => news.category === selectedCategory.value);
    }
    return filtered.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage);
  });
  
  // Tổng số trang
  const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage));
  
  // Thay đổi trang
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  </script>
  