<template>
    <div class="container">
      <h2 class="text-2xl font-bold my-4">Quản lý Bình luận</h2>
  
      <label class="block mb-2">Chọn bài viết:</label>
      <select v-model="selectedArticle" class="form-select mb-3" @change="fetchComments">
        <option v-for="article in articles" :key="article._id" :value="article._id">
          {{ article.title }}
        </option>
      </select>
  
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nội dung</th>
            <th>Người bình luận</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment._id">
            <td>{{ comment.content }}</td>
            <td>{{ comment.author }}</td>
            <td>{{ new Date(comment.createdAt).toLocaleString() }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="deleteComment(comment._id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Phân trang -->
      <nav class="mt-4">
        <ul class="pagination">
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
  import { ref, onMounted } from "vue";
  
  const comments = ref([]);
  const articles = ref([]);
  const selectedArticle = ref(null);
  const page = ref(1);
  const totalPages = ref(1);
  const limit = 5;
  
  const fetchArticles = async () => {
    const res = await fetch("http://localhost:3000/api/articles");
    const data = await res.json();
    articles.value = data.data;
    if (articles.value.length > 0) {
      selectedArticle.value = articles.value[0]._id;
      fetchComments();
    }
  };
  
  const fetchComments = async () => {
    if (!selectedArticle.value) return;
    const res = await fetch(`http://localhost:3000/api/comments?articleId=${selectedArticle.value}&page=${page.value}&limit=${limit}`);
    const data = await res.json();
    comments.value = data.data;
    totalPages.value = data.totalPages;
  };
  
  const deleteComment = async (id) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, { method: "DELETE" });
    fetchComments();
  };
  
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
      fetchComments();
    }
  };
  
  onMounted(fetchArticles);
  </script>
  