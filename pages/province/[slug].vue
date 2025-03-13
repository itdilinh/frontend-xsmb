<template>
    <div class="container mx-auto mt-6">
      <h2 class="text-2xl font-bold text-center text-red-600 uppercase">
        Kết quả xổ số {{ provinceName }}
      </h2>
  
      <!-- Bộ lọc ngày -->
      <div class="flex justify-center my-4">
        <input
          v-model="selectedDate"
          type="date"
          class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          @change="fetchResults"
        />
      </div>
  
      <div class="bg-white shadow-lg rounded-lg p-4">
        <table v-if="results.length" class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-red-600 text-white">
              <th class="border border-gray-300 px-4 py-2">Giải</th>
              <th class="border border-gray-300 px-4 py-2">Số Trúng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(prize, index) in results"
              :key="index"
              class="text-center hover:bg-yellow-200 transition-all"
            >
              <td class="border border-gray-300 px-4 py-2 font-bold bg-gray-100">
                {{ prize.name }}
              </td>
              <td
                class="border border-gray-300 px-4 py-2 text-red-600 text-lg font-semibold tracking-widest"
              >
                {{ prize.numbers }}
              </td>
            </tr>
          </tbody>
        </table>
  
        <p v-else class="text-center text-gray-500">Đang tải dữ liệu...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const results = ref([])
  const selectedDate = ref(new Date().toISOString().slice(0, 10)) // Ngày hôm nay
  const provinceSlug = computed(() => route.params.slug)
  const provinceName = computed(() => decodeURIComponent(route.params.slug))
  
  // Gọi API lấy kết quả xổ số theo tỉnh
  const fetchResults = async () => {
    try {
      const { data } = await useFetch(
        `https://api.xoso.me/ket-qua/${provinceSlug.value}?date=${selectedDate.value}`
      )
      if (data.value && data.value.results) {
        results.value = data.value.results
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error)
    }
  }
  
  // Lấy dữ liệu khi vào trang
  onMounted(fetchResults)
  </script>
  