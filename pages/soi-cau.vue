<template>
  <div class="container mt-4">
    <h2 class="text-center text-primary animate__animated animate__fadeInDown">
      🔮 Soi Cầu Xổ Số - Dự Đoán Kết Quả
    </h2>

    <!-- Chọn loại xổ số -->
    <div class="row justify-content-center my-3">
      <div class="col-md-4">
        <label class="form-label fw-bold">Chọn tỉnh:</label>
        <select v-model="selectedProvince" class="form-select shadow" @change="predictLottery">
          <option v-for="(province, index) in provinces" :key="index" :value="province">
            {{ province }}
          </option>
        </select>
      </div>
    </div>

    <!-- Hiển thị kết quả dự đoán -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Đang tính toán kết quả...</p>
    </div>

    <div v-if="!loading && predictions.length > 0">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm p-3 mb-3 bg-light animate__animated animate__fadeInUp">
            <h5 class="text-center text-primary fw-bold">Dự đoán cho {{ selectedProvince }}</h5>
            <div class="text-center">
              <span
                v-for="(num, idx) in predictions"
                :key="idx"
                class="badge bg-primary fs-4 m-1 p-2 shadow-sm hover-effect"
              >
                {{ num }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && predictions.length === 0" class="alert alert-warning text-center">
      Không có dữ liệu soi cầu.
    </div>
    <Comments :province="province" />
  </div>
</template>

<script setup>
import Comments from '@/components/Comments.vue';
import { ref, onMounted } from 'vue'

// Danh sách tỉnh có xổ số
const provinces = ref(['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bình Dương', 'Cần Thơ'])
const selectedProvince = ref(provinces.value[0])
const predictions = ref([])
const loading = ref(false)

// Giả lập API dự đoán kết quả
const predictLottery = async () => {
  loading.value = true
  setTimeout(() => {
    predictions.value = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100))
    loading.value = false
  }, 1500)
}

onMounted(predictLottery)
</script>

<style>
/* Hiệu ứng hover cho số dự đoán */
.hover-effect {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.hover-effect:hover {
  transform: scale(1.2);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
