<template>
    <div>
        <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />

    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import {
    Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  
  const props = defineProps({
    rateData: Object,
    title: String,
  });
  
  const chartData = ref(null);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'right' },
      title: { display: true, text: props.title },
    },
  };
  
  watch(() => props.rateData, (newRateData) => {
  if (newRateData) {
    chartData.value = {
      labels: newRateData.labels,
      datasets: [
        {
          label: 'Tỷ lệ xuất hiện',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          data: newRateData.data,
        },
      ],
    };
  }
}, { deep: true, immediate: true });

  </script>
  