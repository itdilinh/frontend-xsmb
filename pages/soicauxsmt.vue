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
  
      <!-- Khu vực Soi cầu XSMT -->
      <h2 class="text-center text-warning mt-5">Dự đoán XSMT - Soi cầu miền Trung</h2>
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4" v-for="(xsmt, index) in xsmtArticles" :key="index">
          <div class="card h-100 shadow-sm xsmt-card">
            <div class="card-body">
              <h5 class="card-title">{{ xsmt.title }}</h5>
              <p class="card-text">{{ xsmt.description }}</p>
              <a href="#" class="btn btn-warning">Xem chi tiết</a>
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
    { title: "Mơ thấy đi mua sắm mang ý nghĩa gì?", description: "Hình ảnh mua sắm trong mơ khiến nhiều chị em thích thú..." }
  ];
  
  const xsmtArticles = [
    { title: "Dự đoán XSMT chính xác 100%", description: "Soi cầu xổ số miền Trung miễn phí, chính xác nhất mỗi ngày..." },
    { title: "Lịch dự đoán XSMT hôm nay", description: "Dự đoán kết quả xổ số miền Trung theo các ngày trong tuần..." },
    { title: "Các phương pháp soi cầu XSMT", description: "Tổng hợp các phương pháp soi cầu miền Trung hiệu quả..." }
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
  
  /* Style riêng cho XSMT */
  .xsmt-card {
    border: 2px solid #ffc107;
    background-color: #fffbe6;
  }
  .xsmt-card .card-title {
    color: #d39e00;
  }
  .xsmt-card .btn-warning {
    background-color: #ffc107;
    border: none;
  }
  .xsmt-card .btn-warning:hover {
    background-color: #e0a800;
  }
  </style>