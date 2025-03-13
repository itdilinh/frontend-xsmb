<template>
    <div class="card shadow-sm border-0 mt-4">
  <div class="card-header bg-danger text-white text-center fw-bold">
    🔥 TOP CHỐT SỐ HÔM NAY 🔥
  </div>
  <div class="card-body">
    <!-- Form nhập chốt số -->
    <form @submit.prevent="addPrediction">
      <div class="mb-3">
        <label class="form-label fw-bold">Tên người chơi:</label>
        <input v-model="newUser.name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">Số dự đoán:</label>
        <input v-model="newUser.number" type="text" class="form-control" required />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-danger w-100">💰 Gửi chốt số 💰</button>
      </div>
    </form>
  </div>
</div>

<!-- Danh sách top chốt số -->
<div class="card shadow-sm border-0 mt-3">
  <div class="card-header bg-warning text-dark text-center fw-bold">
    🏆 DANH SÁCH CHỐT SỐ 🏆
  </div>
  <div class="card-body p-0">
    <table class="table table-hover mb-0">
      <thead class="table-light">
        <tr>
          <th class="text-center">#</th>
          <th>Người chơi</th>
          <th class="text-center">Số chốt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in predictions" :key="index">
          <td class="text-center fw-bold">{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td class="text-center text-success fw-bold">{{ user.number }} 🔥</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>
<script setup>
import { ref } from 'vue';

// Danh sách chốt số
const predictions = ref([
  { name: 'Nguyễn Văn A', number: '12 - 45 - 78' },
  { name: 'Trần Thị B', number: '34 - 56 - 89' },
  { name: 'Lê Văn C', number: '11 - 22 - 33' },
]);

// Dữ liệu nhập từ form
const newUser = ref({ name: '', number: '' });

// Hàm thêm số dự đoán
const addPrediction = () => {
  if (newUser.value.name && newUser.value.number) {
    predictions.value.push({ ...newUser.value });
    newUser.value = { name: '', number: '' }; // Reset form
  }
};
</script>
