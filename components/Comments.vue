<template>
  <div class="mt-4">
    <!-- Tiêu đề -->
    <h3 class="text-center text-uppercase fw-bold text-primary bg-light p-3 shadow-sm rounded">
      🗣️ .:: Giao lưu - Thảo luận ::.
    </h3>
    <p class="text-center text-muted fst-italic">
      Chào mừng bạn đến với phòng chat, xin vui lòng đọc kỹ 
      <span class="text-danger fw-bold">nội quy</span> trước khi tham gia thảo luận.
    </p>

    <!-- Danh sách bình luận -->
    <div v-if="comments.length" class="mt-3">
      <ul class="list-group">
        <CommentItem 
          v-for="comment in comments" 
          :key="comment._id" 
          :comment="comment" 
          :reply="replyComment"
          :like="likeComment"
          :dislike="dislikeComment"
        />
      </ul>
    </div>
    <div v-else class="text-muted text-center mt-3">Chưa có bình luận nào.</div>

    <!-- Form nhập bình luận -->
    <div class="mt-4">
      <textarea 
        v-model="newComment" 
        class="form-control border border-primary rounded shadow-sm p-2" 
        placeholder="Nhập bình luận của bạn..."
      ></textarea>
      <button class="btn btn-primary w-100 mt-2 d-flex align-items-center justify-content-center gap-2" 
        @click="submitComment">
        💬 Gửi Bình Luận
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';

const comments = ref([]);
const newComment = ref('');
const province = ref('Hà Nội');
const userId = ref('user123');

// Lấy danh sách bình luận
const fetchComments = async () => {
  const { data } = await useFetch(`/comments?province=${province.value}`);
  comments.value = data.value || [];
};

// Gửi bình luận mới
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  await useFetch('/comments', {
    method: 'POST',
    body: { username: 'User123', province: province.value, number: 12, comment: newComment.value },
  });

  newComment.value = '';
  fetchComments();
};

// Trả lời bình luận
const replyComment = async (commentId, text) => {
  if (!text.trim()) return;

  await useFetch('/comments', {
    method: 'POST',
    body: { username: 'User123', province: province.value, number: 12, comment: text, parentId: commentId },
  });

  fetchComments();
};

// Like bình luận
const likeComment = async (commentId) => {
  await useFetch(`/comments/${commentId}/like`, {
    method: 'PATCH',
    body: { userId: userId.value },
  });
  fetchComments();
};

// Dislike bình luận
const dislikeComment = async (commentId) => {
  await useFetch(`/comments/${commentId}/dislike`, {
    method: 'PATCH',
    body: { userId: userId.value },
  });
  fetchComments();
};

onMounted(fetchComments);
</script>
