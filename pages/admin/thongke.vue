<template>
    <div class="container mt-4">
      <h2>📊 Quản lý Thống kê & Dự đoán Xổ số</h2>
  
      <div class="row mb-3">
        <div class="col-md-4">
          <input v-model="searchDate" type="date" class="form-control" />
        </div>
        <div class="col-md-4">
          <select v-model="searchProvince" class="form-control">
            <option value="">Tất cả đài</option>
            <option v-for="province in provinces" :key="province">{{ province }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary" @click="fetchStatistics">📊 Xem thống kê</button>
        </div>
      </div>
  
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Số</th>
            <th>Số lần xuất hiện</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, number) in statistics" :key="number">
            <td>{{ number }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
  
      <hr />
      <h3>🔮 Quản lý Dự đoán</h3>
      <button class="btn btn-success mb-3" @click="openAddPrediction">➕ Thêm Dự đoán</button>
  
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Ngày</th>
            <th>Đài</th>
            <th>Dự đoán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prediction in predictions" :key="prediction._id">
            <td>{{ prediction.date }}</td>
            <td>{{ prediction.province }}</td>
            <td>{{ prediction.numbers.join(', ') }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="openEditPrediction(prediction)">✏️</button>
              <button class="btn btn-danger btn-sm" @click="deletePrediction(prediction._id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Thêm/Sửa Dự đoán -->
      <div class="modal fade show d-block" v-if="showModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? '✏️ Sửa Dự đoán' : '➕ Thêm Dự đoán' }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <label>Ngày:</label>
              <input v-model="form.date" type="date" class="form-control mb-2" required />
              <label>Đài xổ số:</label>
              <select v-model="form.province" class="form-control mb-2">
                <option v-for="province in provinces" :key="province">{{ province }}</option>
              </select>
              <label>Dự đoán (cách nhau bằng dấu phẩy):</label>
              <input v-model="form.numbers" type="text" class="form-control" required />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showModal = false">Hủy</button>
              <button class="btn btn-primary" @click="savePrediction">Lưu</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const statistics = ref({});
  const predictions = ref([]);
  const provinces = ref(["TP.HCM", "Hà Nội", "Đà Nẵng", "Cần Thơ"]);
  const searchDate = ref("");
  const searchProvince = ref("");
  const showModal = ref(false);
  const isEditing = ref(false);
  const selectedId = ref(null);
  const form = ref({ date: "", province: "", numbers: "" });
  
  // Lấy thống kê xổ số
  const fetchStatistics = async () => {
    const res = await fetch(`http://localhost:3000/api/thongke?date=${searchDate.value}&province=${searchProvince.value}`);
    statistics.value = await res.json();
  };
  
  // Lấy danh sách dự đoán
  const fetchPredictions = async () => {
    const res = await fetch(`http://localhost:3000/api/dudoan`);
    predictions.value = await res.json();
  };
  
  // Mở modal thêm mới
  const openAddPrediction = () => {
    form.value = { date: "", province: "", numbers: "" };
    isEditing.value = false;
    showModal.value = true;
  };
  
  // Mở modal sửa
  const openEditPrediction = (prediction) => {
    form.value = { ...prediction, numbers: prediction.numbers.join(", ") };
    selectedId.value = prediction._id;
    isEditing.value = true;
    showModal.value = true;
  };
  
  // Lưu dự đoán
  const savePrediction = async () => {
    const method = isEditing.value ? "PUT" : "POST";
    const url = isEditing.value
      ? `http://localhost:3000/api/dudoan/${selectedId.value}`
      : "http://localhost:3000/api/dudoan"
  
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form.value, numbers: form.value.numbers.split(",") }),
    });
  
    showModal.value = false;
    fetchPredictions();
  };
  
  // Xóa dự đoán
  const deletePrediction = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    await fetch(`http://localhost:3000/api/dudoan/${id}`, { method: "DELETE" });
    fetchPredictions();
  };
  
  onMounted(() => {
    fetchStatistics();
    fetchPredictions();
  });
  </script>
  