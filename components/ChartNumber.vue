<template>
    <div>
      <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const props = defineProps({
    numbers: Array, // Dữ liệu từ API
    title: String,  // Tiêu đề biểu đồ
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
    if (newVal.numbers) {
      chartData.value = {
        labels: newVal.numbers.map((_, index) => `Số ${index + 1}`),
        datasets: [
          {
            label: 'Số Xuất Hiện',
            backgroundColor: '#f87979',
            data: newVal.numbers,
          },
        ],
      };
    }
  }, { deep: true });
  </script>
  