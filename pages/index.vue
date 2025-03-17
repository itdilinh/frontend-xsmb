

<script setup>
import BannerAds from '@/components/BannerAds.vue';
import LotteryResults from '@/components/LotteryResults.vue';
import Comments from '@/components/Comments.vue';
import topchotso from '@/components/topchotso.vue';
</script>
<template>
  <div>
    <BannerAds />
    <div class="container my-4">
    <!-- Tiêu đề -->
    <div class="text-center bg-primary text-white py-3 rounded">
      <h1 class="h3">Soi Cầu  - Diễn đàn soi cầu lớn nhất Việt Nam</h1>
      <p class="mb-0">DIỄN ĐÀN XỔ SỐ XSMB - THẢO LUẬN CHÉM GIÓ DỰ ĐOÁN XỔ SỐ 3 MIỀN</p>
    </div>

    <!-- Thông báo -->
    <div class="alert alert-warning text-center mt-3 fw-bold">
      🔥 <strong>Thông Báo:</strong> Lướt xuống phần bình luận để cùng vào diễn đàn chém gió lô đề cùng mọi người hoàn toàn <b>(miễn phí)</b>. Chúc các bạn may mắn phát tài! 🍀
    </div>

    <!-- Component kết quả xổ số -->
    <div class="card shadow-sm mt-3">
      <div class="card-header bg-danger text-white text-center">
        <h5>Kết Quả Xổ Số Hôm Nay</h5>
      </div>
      <div class="card-body">
        <LotteryResults />
      </div>
    </div>
  </div>
    <topchotso/>
    <Comments /> 
    
  </div>
</template>
<style scoped>
.bg-primary {
  background-color: #007bff !important;
}
.bg-danger {
  background-color: #dc3545 !important;
}
</style>

