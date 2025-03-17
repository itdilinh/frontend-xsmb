<template>
  <div class="row mt-4">
    <!-- Cột trái: Phòng Chat -->
    <div class="col-lg-9">
      <div class="card p-3 shadow-sm">
        <h5 class="text-primary fw-bold">💬 Bình luận</h5>

        <!-- Form nhập bình luận -->
        <div class="input-group mt-3">
          <input v-model="newComment" type="text" class="form-control" placeholder="Nhập bình luận..." @keyup.enter="postComment" />
          <button @click="postComment" class="btn btn-primary">
            <i class="bi bi-send"></i> Gửi
          </button>
        </div>

        <!-- Nút xem nội quy -->
        <button class="btn btn-info mt-3" data-bs-toggle="modal" data-bs-target="#chatRulesModal">
          <i class="bi bi-book"></i> Xem nội quy phòng chat
        </button>

        <!-- Danh sách bình luận -->
        <ul class="list-group mt-3 chat-box">
          <li
            v-for="comment in reversedComments"
            :key="comment._id"
            class="list-group-item d-flex align-items-center"
          >
            <span class="fw-bold text-primary me-2">{{ comment.name }}</span>:
            <span class="text-dark">{{ comment.content }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Cột phải: Tốp chốt số chuẩn nhất -->
    <div class="col-lg-3">
      <div class="card p-3 shadow-sm">
        <h5 class="text-success fw-bold">🏆 Tốp Chốt Số Chuẩn Nhất</h5>
        <ul class="list-group list-group-flush">
          <li v-for="player in topPlayers" :key="player.id" class="list-group-item">
            <strong class="text-danger">{{ player.name }}</strong> - {{ player.score }} điểm
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Modal Nội Quy -->
  <div class="modal fade" id="chatRulesModal" tabindex="-1" aria-labelledby="chatRulesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger fw-bold" id="chatRulesModalLabel">📜 Nội Quy Phòng Chat</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Vui lòng tuân thủ các quy định sau để giữ môi trường vui vẻ:</p>
          <ul class="list-group">
            <li class="list-group-item">🚫 Không sử dụng ngôn từ phản cảm.</li>
            <li class="list-group-item">❌ Không spam tin nhắn.</li>
            <li class="list-group-item">📢 Không quảng cáo.</li>
            <li class="list-group-item">⚠️ Không đặt tên giả mạo.</li>
          </ul>
          <p class="mt-3 text-center text-muted"><strong>Hãy giữ phòng chat văn minh!</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const comments = ref([]);
const newComment = ref('');
const apiUrl = 'http://localhost:3000/comments'; // API backend NestJS

// Danh sách người chơi tốp chốt số
const topPlayers = ref([
  { id: 1, name: 'Nguyễn Văn A', score: 98 },
  { id: 2, name: 'Trần Thị B', score: 95 },
  { id: 3, name: 'Lê Văn C', score: 92 },
]);

// Hiển thị tin nhắn mới nhất trên cùng
const reversedComments = computed(() => [...comments.value].reverse());

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
    name: 'Người dùng ẩn danh',
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
      fetchComments();
    }
  } catch (error) {
    console.error('Lỗi gửi bình luận:', error);
  }
};

onMounted(fetchComments);
</script>

<style scoped>
/* Danh sách bình luận cuộn xuống */
.chat-box {
  max-height: 300px;
  overflow-y: auto;
}

/* Tùy chỉnh danh sách */
.list-group-item {
  transition: background 0.2s ease-in-out;
}
.list-group-item:hover {
  background: #f8f9fa;
}

/* Tùy chỉnh nút gửi bình luận */
.btn-primary {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Giao diện cột phải */
.col-lg-3 {
  max-width: auto;
}

/* Tốp chốt số đẹp hơn */
.card h5 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
