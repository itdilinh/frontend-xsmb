<!-- <template>
  <div class="container mt-4">
    <h1 class="text-primary">Kết Quả Xổ Số</h1>
    <form @submit.prevent="addLotteryResult" class="mb-3">
      <div class="input-group mb-2">
        <input v-model="newLottery.date" type="date" class="form-control" required />
        <input v-model="newLottery.numbers" placeholder="Nhập số, cách nhau bằng dấu phẩy" class="form-control" required />
        <button type="submit" class="btn btn-success">Thêm Kết Quả</button>
      </div>
    </form>

    <ul class="list-group">
      <li v-for="result in lotteryResults" :key="result._id" class="list-group-item d-flex justify-content-between align-items-center">
        <span v-if="!editingLottery[result._id]">{{ result.date }} - {{ formattedNumbers(result.numbers) }}</span>
        <span v-else class="d-flex gap-2">
          <input v-model="editLotteryData.date" type="date" class="form-control" />
          <input v-model="editLotteryData.numbers" placeholder="Nhập số, cách nhau bằng dấu phẩy" class="form-control" />
        </span>
        <div>
          <button v-if="!editingLottery[result._id]" @click="startEditLottery(result)" class="btn btn-warning btn-sm">Sửa</button>
          <button v-if="editingLottery[result._id]" @click="handleUpdateLotteryResult(result._id)" class="btn btn-success btn-sm">Lưu</button>
          <button @click="deleteLotteryResult(result._id)" class="btn btn-danger btn-sm">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref, onMounted, reactive } from 'vue';
import { fetchLotteryResults, createLotteryResult, updateLotteryResult, deleteLotteryResult } from '@/services/api';


const lotteryResults = ref([]);
const newLottery = ref({ date: '', numbers: '' });
const editingLottery = reactive({});
const editLotteryData = ref({ date: '', numbers: '' });

const formattedNumbers = (numbers) => (Array.isArray(numbers) ? numbers.join(', ') : numbers);

const loadData = async () => {
  try {
    lotteryResults.value = await fetchLotteryResults();
  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
  }
};

onMounted(loadData);

const addLotteryResult = async () => {
  try {
    await createLotteryResult({
      date: newLottery.value.date,
      numbers: newLottery.value.numbers.split(',').map(num => num.trim()),
    });
    newLottery.value = { date: '', numbers: '' };
    await loadData();
  } catch (error) {
    console.error("Lỗi thêm:", error);
  }
};

const startEditLottery = (result) => {
  editingLottery[result._id] = true;
  editLotteryData.value = { date: result.date, numbers: formattedNumbers(result.numbers) };
};

const handleUpdateLotteryResult = async (id) => {
  try {
    await updateLotteryResult(id, {
      date: editLotteryData.value.date,
      numbers: editLotteryData.value.numbers.split(',').map(num => num.trim()),
    });
    editingLottery[id] = false;
    await loadData();
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
  }
};

const handleDeleteLotteryResult = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa?")) return;
  await deleteLotteryResult(id);
};

</script> -->
<template>
  <div>
    <BannerAds />
    <div class="alert alert-info text-center fw-bold fs-4 py-3">
  🎯 Soi Cầu - Diễn đàn soi cầu lớn nhất Việt Nam 🎯
</div>

<div class="card p-3 shadow-sm">
  <h5 class="text-danger fw-bold">DIỄN ĐÀN XỔ SỐ XSMB - THẢO LUẬN CHÉM GIÓ DỰ ĐOÁN XỔ SỐ 3 MIỀN</h5>
  <p class="text-success fw-semibold">(Đang Hoạt Động)</p>
  <p class="text-dark">
    <strong>Thông Báo:</strong> lướt xuống phần bình luận để cùng vào diễn đàn chém gió lô đề cùng mọi người hoàn toàn 
    <span class="text-danger fw-bold">miễn phí</span>. Chúc các bạn may mắn phát tài! 🎉
  </p>
</div>

    <LotteryResults />
    <div class="card p-3 shadow-sm border-0">
  <h4 class="text-danger fw-bold text-center">🔥 ADM chốt số hôm nay 🔥</h4>
  <h6 class="text-primary text-center">
    DỰ ĐOÁN KẾT QUẢ XỔ SỐ MIỀN BẮC HÔM NAY  
    <br /> <small class="text-muted">(08:00:00 - 17:00:00)</small>
  </h6>
  
  <ul class="list-group mt-3">
    <li class="list-group-item d-flex justify-content-between">
      <span>🎯 <strong>Giải đặc biệt chạm:</strong></span> 
      <span class="text-success fw-bold">3 - 6 - 7 💰</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
      <span>🎯 <strong>Bạch thủ lô:</strong></span> 
      <span class="text-success fw-bold">43 💰</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
      <span>🎯 <strong>Song thủ lô:</strong></span> 
      <span class="text-success fw-bold">35 - 72 💰</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
      <span>🎯 <strong>Lô xiên:</strong></span> 
      <span class="text-success fw-bold">12 - 21 💰</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
      <span>🎯 <strong>Dàn đề 10 số:</strong></span> 
      <span class="text-success fw-bold">542 - 398 - 168 - 437 - 276 💰</span>
    </li>
  </ul>
  <div>
    <topchotso/>
  </div>
</div>
    <Comments /> 
  </div>
  
</template>

<script setup>
import BannerAds from '@/components/BannerAds.vue';
import LotteryResults from '@/components/LotteryResults.vue';
import Comments from '@/components/Comments.vue';
import topchotso from '@/components/topchotso.vue';


</script>

