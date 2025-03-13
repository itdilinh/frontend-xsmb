<template>
    <div class="container mt-4">
      <h1 class="text-center">📊 Thống Kê & Dự Đoán Xổ Số</h1>
  
      <div class="mb-3">
        <label for="province" class="form-label">Chọn Tỉnh Thành:</label>
        <select v-model="province" class="form-select">
          <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
  
      <button class="btn btn-success w-100" @click="fetchStatistics">🔍 Xem Thống Kê</button>
  
      <div v-if="statistics" class="mt-4">
        <h2 class="text-center">📌 Thống Kê - {{ province }}</h2>
  
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-success">🔥 Số Nóng</h3>
            <ChartNumber v-if="statistics.hotNumbers.length" :numbers="statistics.hotNumbers" title="Số Nóng" />
          </div>
          <div class="col-md-6">
            <h3 class="text-primary">❄️ Số Lạnh</h3>
            <ChartNumber v-if="statistics.coldNumbers.length" :numbers="statistics.coldNumbers" title="Số Lạnh" />
          </div>
        </div>
  
        <h3 class="mt-4">📍 Tỷ Lệ Xuất Hiện Số Theo Tỉnh</h3>
        <ChartRate v-if="rateData" :rateData="rateData" title="Tỷ Lệ Xuất Hiện Số Theo Tỉnh" />
  
        <h3 class="mt-4">🎯 Số Gợi Ý Hôm Nay</h3>
        <SuggestedNumbers v-if="suggestions" :suggestions="suggestions" />
      </div>
  
      <div v-else class="text-center text-muted mt-4">Chưa có dữ liệu.</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ChartNumber from '@/components/ChartNumber.vue';
  import ChartRate from '@/components/ChartRate.vue';
  import SuggestedNumbers from '@/components/SuggestedNumbers.vue';
  
  const province = ref('Hà Nội');
  const statistics = ref(null);
  const rateData = ref(null);
  const suggestions = ref(null);
  const provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];
  
  const fetchStatistics = async () => {
    try {
      const { data } = await useFetch(`/lottery/statistics?province=${province.value}`);
      statistics.value = data.value || null;
  
      const { data: rate } = await useFetch(`/lottery/statistics/rate?province=${province.value}`);
      rateData.value = rate.value || null;
  
      const { data: suggest } = await useFetch(`/lottery/suggestion?province=${province.value}`);
      suggestions.value = suggest.value || null;
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    }
  };
  </script>
  