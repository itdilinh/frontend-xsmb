<template>
  <div class="card p-3 shadow-sm mt-4">
    <h5 class="text-primary fw-bold">💬 Bình luận</h5>
    
    <!-- Form nhập bình luận -->
    <div class="input-group mt-3">
      <input v-model="newComment" type="text" class="form-control" placeholder="Nhập bình luận..." />
      <button @click="postComment" class="btn btn-primary">Gửi</button>
    </div>

    <!-- Danh sách bình luận -->
    <ul class="list-group mt-3">
      <li v-for="comment in comments" :key="comment._id" class="list-group-item">
        <strong>{{ comment.name }}</strong>: {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const comments = ref([]);
const newComment = ref('');
const apiUrl = 'http://localhost:3000/comments'; // API backend NestJS

const fetchComments = async () => {
  try {
    const res = await fetch(apiUrl);
    comments.value = await res.json();
  } catch (error) {
    console.error('Lỗi lấy danh sách bình luận:', error);
  }
};

const postComment = async () => {
  if (!newComment.value.trim()) return;

  const commentData = {
    name: 'Người dùng ẩn danh', // Sau này có thể dùng user thực
    content: newComment.value,
  };

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      newComment.value = '';
      fetchComments(); // Cập nhật danh sách bình luận
    }
  } catch (error) {
    console.error('Lỗi gửi bình luận:', error);
  }
};

onMounted(fetchComments);
</script>
