<template>
    <div class="container mt-4">
      <h2>📅 Quản lý Kết quả Xổ số</h2>
  
      <div class="row mb-3">
        <div class="col-md-4">
          <input v-model="searchDate" type="date" class="form-control" placeholder="Chọn ngày" />
        </div>
        <div class="col-md-4">
          <select v-model="searchProvince" class="form-control">
            <option value="">Tất cả đài</option>
            <option v-for="province in provinces" :key="province">{{ province }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary" @click="fetchResults">🔍 Tìm kiếm</button>
        </div>
      </div>
  
      <button class="btn btn-success mb-3" @click="openAddResult">➕ Thêm Kết quả</button>
  
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Ngày</th>
            <th>Đài</th>
            <th>Kết quả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result._id">
            <td>{{ result.date }}</td>
            <td>{{ result.province }}</td>
            <td>{{ result.numbers.join(', ') }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="openEditResult(result)">✏️ Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteResult(result._id)">🗑️ Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button class="btn btn-secondary" :disabled="page === 1" @click="prevPage">⬅️</button>
        Trang {{ page }}
        <button class="btn btn-secondary" :disabled="!hasMore" @click="nextPage">➡️</button>
      </div>
  
      <!-- Modal Thêm/Sửa -->
      <div class="modal fade show d-block" v-if="showModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? '✏️ Sửa Kết quả' : '➕ Thêm Kết quả' }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <label>Ngày:</label>
              <input v-model="form.date" type="date" class="form-control mb-2" required />
              <label>Đài xổ số:</label>
              <select v-model="form.province" class="form-control mb-2">
                <option v-for="province in provinces" :key="province">{{ province }}</option>
              </select>
              <label>Kết quả (cách nhau bằng dấu phẩy):</label>
              <input v-model="form.numbers" type="text" class="form-control" required />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showModal = false">Hủy</button>
              <button class="btn btn-primary" @click="saveResult">Lưu</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const results = ref([]);
  const provinces = ref(["TP.HCM", "Hà Nội", "Đà Nẵng", "Cần Thơ"]);
  const searchDate = ref("");
  const searchProvince = ref("");
  const page = ref(1);
  const hasMore = ref(false);
  const showModal = ref(false);
  const isEditing = ref(false);
  const selectedId = ref(null);
  const form = ref({ date: "", province: "", numbers: "" });
  
  // Lấy danh sách kết quả xổ số
  const fetchResults = async () => {
    const query = new URLSearchParams({
      date: searchDate.value,
      province: searchProvince.value,
      page: page.value,
    }).toString();
  
    const res = await fetch(`http://localhost:3000/api/xoso?${query}`);
    const data = await res.json();
    results.value = data.results;
    hasMore.value = data.hasMore;
  };
  
  // Phân trang
  const nextPage = () => { page.value++; fetchResults(); };
  const prevPage = () => { if (page.value > 1) page.value--; fetchResults(); };
  
  // Mở modal thêm mới
  const openAddResult = () => {
    form.value = { date: "", province: "", numbers: "" };
    isEditing.value = false;
    showModal.value = true;
  };
  
  // Mở modal sửa
  const openEditResult = (result) => {
    form.value = { ...result, numbers: result.numbers.join(", ") };
    selectedId.value = result._id;
    isEditing.value = true;
    showModal.value = true;
  };
  
  // Lưu kết quả xổ số
  const saveResult = async () => {
    const method = isEditing.value ? "PUT" : "POST";
    const url = isEditing.value
      ? `http://localhost:3000/api/xoso/${selectedId.value}`
      : "http://localhost:3000/api/xoso";
  
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form.value, numbers: form.value.numbers.split(",") }),
    });
  
    showModal.value = false;
    fetchResults();
  };
  
  // Xóa kết quả
  const deleteResult = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa kết quả này?")) return;
    await fetch(`http://localhost:3000/api/xoso/${id}`, { method: "DELETE" });
    fetchResults();
  };
  
  onMounted(fetchResults);
  </script>
  