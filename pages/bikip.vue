<template>
    <div class="container mt-4">
      <h2 class="text-center text-primary mb-4">Tin tức mới nhất</h2>
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4" v-for="(article, index) in articles" :key="index">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ article.description }}</p>
              <a href="#" class="btn btn-primary">Xem chi tiết</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const articles = [
    { title: "Nằm mơ thấy tắm sông có điềm báo gì?", description: "Tắm gội là một hoạt động giúp thư giãn, giải tỏa mệt mỏi..." },
    { title: "Mơ thấy đi đám ma mang ý nghĩa gì?", description: "Bạn đang tò mò không biết nằm mơ thấy đưa tang mang điềm báo gì?..." },
    { title: "Mơ thấy đi mua sắm mang ý nghĩa gì?", description: "Hình ảnh mua sắm trong mơ khiến nhiều chị em thích thú..." },
    { title: "Nằm mơ thấy đi chợ là điềm báo lành hay dữ?", description: "Việc đi chợ là một hoạt động thường nhật của chị em nội trợ..." },
    { title: "Nằm ngủ mơ thấy sao chổi có điềm gì?", description: "Bạn đang gặp phải vướng mắc khi mơ thấy sao chổi?" },
    { title: "Giải mã mơ thấy mẹ chồng và con số may mắn", description: "Nằm mơ thấy mẹ chồng khiến bạn không khỏi tò mò về ý nghĩa..." },
    { title: "Mơ thấy sếp là điềm lành hay dữ?", description: "Mơ thấy sếp có thể là điềm báo tốt hoặc xấu, tùy vào bối cảnh..." },
    { title: "Mơ thấy nhà thờ là điềm lành hay dữ?", description: "Giấc mơ về nhà thờ khiến nhiều người lo lắng về điềm báo..." },
    { title: "Mơ thấy có bầu đánh con gì?", description: "Nằm mơ thấy có bầu mang đến nhiều cảm xúc khác nhau..." },
    { title: "Mơ thấy chim chóc mang điềm gì?", description: "Nằm mơ thấy chim chóc có thể là điềm báo may mắn..." }
  ];
  </script>
  
  <style scoped>
  .card {
    border-radius: 10px;
    transition: transform 0.3s;
  }
  .card:hover {
    transform: scale(1.03);
  }
  </style>
  