<template>
    <div v-if="suggestions" class="mt-4">
      <h3 class="text-warning">🎯 Số Gợi Ý Hôm Nay</h3>
      <div class="row">
        <div v-for="(num, index) in suggestions.suggestedNumbers" :key="index" class="col-2">
          <div class="card text-center">
            <div class="card-body">
              <h4 class="card-title text-success">{{ num }}</h4>
              <p class="text-muted">🔮 {{ suggestions.confidence[index] }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    suggestions: Object,
  });
  </script>
  