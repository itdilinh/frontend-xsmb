<template>
    <div class="container mt-4">
      <h1 class="mb-4">Quản lý Tin tức</h1>
      <button class="btn btn-success mb-3" @click="openAddArticle">+ Thêm bài viết</button>
  
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article._id">
            <td>{{ article.title }}</td>
            <td>{{ article.category }}</td>
            <td>
              <img :src="article.image" class="img-thumbnail" width="80" height="80" v-if="article.image" />
            </td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="openEditArticle(article)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteArticle(article._id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Thêm/Sửa -->
      <div v-if="showModal" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Sửa bài viết' : 'Thêm bài viết' }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Tiêu đề:</label>
                <input v-model="articleForm.title" class="form-control" type="text" />
              </div>
  
              <div class="mb-3">
                <label class="form-label">Nội dung:</label>
                <textarea v-model="articleForm.content" class="form-control"></textarea>
              </div>
  
              <div class="mb-3">
                <label class="form-label">Hình ảnh:</label>
                <input type="file" class="form-control" @change="uploadImage" />
                <img v-if="articleForm.image" :src="articleForm.image" class="img-thumbnail mt-2" width="100" />
              </div>
  
              <div class="mb-3">
                <label class="form-label">Danh mục:</label>
                <select v-model="articleForm.category" class="form-select">
                  <option value="news">Tin tức</option>
                  <option value="sports">Thể thao</option>
                  <option value="entertainment">Giải trí</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showModal = false">Hủy</button>
              <button class="btn btn-primary" @click="saveArticle">{{ isEditing ? 'Cập nhật' : 'Thêm mới' }}</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Phân trang -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="changePage(page - 1)">«</button>
          </li>
          <li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: n === page }">
            <button class="page-link" @click="changePage(n)">{{ n }}</button>
          </li>
          <li class="page-item" :class="{ disabled: page === totalPages }">
            <button class="page-link" @click="changePage(page + 1)">»</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const articles = ref([]);
  const showModal = ref(false);
  const isEditing = ref(false);
  const page = ref(1);
  const totalPages = ref(1);
  const limit = 5;
  
  const articleForm = ref({
    title: '',
    content: '',
    image: '',
    category: 'news',
  });
  
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
      fetchArticles();
    }
  };
  
  const fetchArticles = async () => {
    const res = await fetch(`http://localhost:3000/api/articles?page=${page.value}&limit=${limit}`);
    const data = await res.json();
    articles.value = data.data;
    totalPages.value = data.totalPages;
  };
  
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    articleForm.value.image = data.url;
  };
  
  const openAddArticle = () => {
    isEditing.value = false;
    articleForm.value = { title: '', content: '', image: '', category: 'news' };
    showModal.value = true;
  };
  
  const openEditArticle = (article) => {
    isEditing.value = true;
    articleForm.value = { ...article };
    showModal.value = true;
  };
  
  const saveArticle = async () => {
    if (isEditing.value) {
      await fetch(`http://localhost:3000/api/articles/${articleForm.value._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleForm.value),
      });
    } else {
      await fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleForm.value),
      });
    }
    showModal.value = false;
    fetchArticles();
  };
  
  const deleteArticle = async (id) => {
    await fetch(`http://localhost:3000/api/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };
  
  onMounted(fetchArticles);
  </script>
  