<template>
  <div class="container mt-4">
    <h2 class="text-center text-danger fw-bold">Kết Quả Xổ Số</h2>
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead class="table-danger">
          <tr>
            <th>Giải</th>
            <th>Số Trúng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prize, key) in results" :key="key">
            <td class="fw-bold">{{ key }}</td>
            <td class="text-danger fs-5">{{ prize }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="mt-4 text-primary">Lô tô trực tiếp</h3>
    <div class="d-flex flex-wrap">
      <span v-for="num in loto" :key="num" class="badge bg-warning text-dark fs-6 m-1">
        {{ num }}
      </span>
    </div>

    <h3 class="mt-4 text-success">Thống kê đầu/đuôi</h3>
    <div class="row">
      <div class="col-md-6">
        <h5 class="text-center text-primary">Thống kê đầu</h5>
        <table class="table table-bordered text-center">
          <thead class="table-primary">
            <tr>
              <th>Đầu</th>
              <th>Lô tô</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(numbers, head) in heads" :key="head">
              <td class="fw-bold">{{ head }}</td>
              <td>{{ numbers.join(' ; ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h5 class="text-center text-danger">Thống kê đuôi</h5>
        <table class="table table-bordered text-center">
          <thead class="table-danger">
            <tr>
              <th>Đuôi</th>
              <th>Lô tô</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(numbers, tail) in tails" :key="tail">
              <td class="fw-bold">{{ tail }}</td>
              <td>{{ numbers.join(' ; ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const results = ref({
  "Đặc biệt": "86127",
  "Giải nhất": "95915",
  "Giải nhì": "86841 - 37274",
  "Giải ba": "10829 - 19458 - 85562 - 07521 - 85701 - 70057",
  "Giải tư": "10803 - 80962 - 67517 - 9",
  "Giải năm": "52606 - 11097 - 46151 - 86504 - 4996",
  "Giải sáu": "942 - 278 - 257",
  "Giải bảy": "158 - 218 - 55"
});

const loto = ref(["01", "04", "09", "10", "15", "15", "18", "18", "21", "27", "29", "41", "42", "46", "55", "57", "57", "58", "60", "62", "67", "74", "78", "79", "80", "82", "96"]);

const heads = ref({
  "0": ["01", "09", "04"],
  "1": ["15", "10", "18", "15", "18"],
  "2": ["27", "29", "21"],
  "4": ["41", "46", "42"],
  "5": ["58", "57", "57", "55"],
  "6": ["62", "67", "60"],
  "7": ["74", "79", "78"],
  "8": ["80", "82"],
  "9": ["96"]
});

const tails = ref({
  "0": ["80", "60", "10"],
  "1": ["41", "21", "01"],
  "2": ["62", "42", "82"],
  "4": ["74", "04"],
  "5": ["15", "15", "55"],
  "6": ["46", "96"],
  "7": ["27", "57", "67", "57"],
  "8": ["58", "18", "78", "18"],
  "9": ["29", "09", "79"]
});
</script>

<style>
.badge {
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 8px;
}
</style>
