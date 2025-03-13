<template>
    <li class="list-group-item">
      <strong class="text-success">{{ comment.username }}</strong> nói:
      <p class="m-0">{{ comment.comment }}</p>
      <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
  
      <div class="d-flex gap-2 mt-2">
        <button class="btn btn-sm btn-outline-success" @click="like(comment._id)">
          👍 {{ comment.likes.length }}
        </button>
        <button class="btn btn-sm btn-outline-danger" @click="dislike(comment._id)">
          👎 {{ comment.dislikes.length }}
        </button>
        <button class="btn btn-sm btn-outline-primary" @click="toggleReply">
          💬 Trả lời
        </button>
      </div>
  
      <div v-if="showReply" class="mt-2">
        <textarea v-model="replyText" class="form-control" placeholder="Nhập phản hồi..."></textarea>
        <button class="btn btn-success btn-sm mt-2" @click="submitReply">Gửi</button>
      </div>
  
      <ul v-if="comment.replies.length" class="list-group mt-3">
        <CommentItem v-for="reply in comment.replies" :key="reply._id" :comment="reply" :reply="replyComment" :like="like" :dislike="dislike" />
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  defineProps(['comment', 'reply', 'like', 'dislike']);
  
  const replyText = ref('');
  const showReply = ref(false);
  
  const toggleReply = () => {
    showReply.value = !showReply.value;
  };
  
  const submitReply = () => {
    if (replyText.value.trim()) {
      reply(comment._id, replyText.value);
      replyText.value = '';
      showReply.value = false;
    }
  };
  
  const formatDate = (date) => new Date(date).toLocaleString();
  </script>
  