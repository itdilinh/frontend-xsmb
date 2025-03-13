<template>
  <div class="container mt-4">
    <h2 class="text-center text-danger animate__animated animate__fadeInDown">
      🔴 Kết Quả Xổ Số Trực Tiếp
    </h2>

    <!-- Bộ lọc ngày xổ số -->
    <div class="row justify-content-center my-3 animate__animated animate__fadeIn">
      <div class="col-md-4">
        <label class="form-label fw-bold">Chọn ngày:</label>
        <input v-model="selectedDate" type="date" class="form-control shadow" @change="getResults" />
      </div>
    </div>

    <!-- Hiển thị danh sách kết quả -->
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-danger" role="status"></div>
          <p>Đang tải kết quả...</p>
        </div>

        <div v-if="!loading && results.length > 0">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="card shadow-sm mb-3 p-3 bg-light animate__animated animate__fadeInUp"
          >
            <h5 class="text-center text-danger fw-bold">{{ result.province }}</h5>
            <p class="text-center">Ngày: {{ result.date }}</p>
            <div class="text-center">
              <span
                v-for="(num, idx) in result.numbers"
                :key="idx"
                class="badge bg-danger fs-4 m-1 p-2 shadow-sm hover-effect"
              >
                {{ num }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="!loading && results.length === 0" class="alert alert-warning text-center">
          Không có kết quả xổ số cho ngày {{ selectedDate }}.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchLotteryResults } from '@/services/lotteryService'
import { getLotteryResults } from '~/services/api';

const selectedDate = ref(new Date().toISOString().split('T')[0])
const results = ref([])
const loading = ref(false)

const getResults = async () => {
  loading.value = true
  const data = await fetchLotteryResults(selectedDate.value)
  
  if (data) {
    results.value = data.results
  } else {
    results.value = []
  }
  
  loading.value = false
}

onMounted(getResults)
</script>

<style>
/* Hiệu ứng hover cho số xổ số */
.hover-effect {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.hover-effect:hover {
  transform: scale(1.2);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
