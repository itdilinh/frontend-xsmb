<template>
    <div>
      <LineChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale,
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  const props = defineProps({
    trendData: Object, // Nhận dữ liệu từ API
    title: String,
  });
  
  const chartData = ref(null);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: props.title },
    },
  };
  
  watch(props, (newVal) => {
    if (newVal.trendData) {
      chartData.value = {
        labels: newVal.trendData.labels,
        datasets: [
          {
            label: 'Tần suất xuất hiện',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: newVal.trendData.data,
            fill: false,
          },
        ],
      };
    }
  }, { deep: true });
  </script>
  