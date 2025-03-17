<script setup>
import { ref, onMounted } from 'vue';

const ketQuaXoSo = ref([]);

const fetchKqxs = async () => {
  try {
    const res = await fetch('http://localhost:3000/kqxs');
    ketQuaXoSo.value = await res.json();
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu kết quả xổ số:', error);
  }
};

onMounted(fetchKqxs);
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-2xl font-bold">Kết Quả Xổ Số</h1>
    
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>Ngày</th>
          <th>Đài</th>
          <th>Giải Đặc Biệt</th>
          <th>Giải Nhất</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kq in ketQuaXoSo" :key="kq.date">
          <td>{{ kq.date }}</td>
          <td>{{ kq.region }}</td>
          <td class="fw-bold text-danger">{{ kq.jackpot }}</td>
          <td>{{ kq.firstPrize }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
