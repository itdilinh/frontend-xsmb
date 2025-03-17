<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card p-4">
            <h1 class="text-center text-primary">Soi cầu XSMN VIP – Dự đoán xổ số miền Nam</h1>
            <p class="text-muted text-center">Cập nhật dự đoán xổ số miền Nam chính xác nhất</p>
            <hr />
  
            <h2 class="text-success">Lịch soi cầu XSMN</h2>
            <b-table :items="lotterySchedule" :fields="fields" bordered></b-table>
  
            <b-accordion flush>
              <b-accordion-item title="🔎 Soi cầu XSMN là gì?">
                Soi cầu XSMN là phương pháp dự đoán xổ số dựa trên kết quả trước đó để tìm ra các con số may mắn.
              </b-accordion-item>
              <b-accordion-item title="📌 Phương pháp soi cầu XSMN phổ biến">
                <ul>
                  <li>Bạch thủ lô</li>
                  <li>Lô gan</li>
                  <li>Soi cầu bạc nhớ</li>
                  <li>Soi cầu lô xiên</li>
                </ul>
              </b-accordion-item>
              <b-accordion-item title="📅 Kết luận">
                Người chơi cần theo dõi kỹ các quy luật, phân tích số liệu và kết hợp nhiều phương pháp để đạt kết quả tốt nhất.
              </b-accordion-item>
            </b-accordion>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const fields = [
    { key: 'day', label: 'Thứ' },
    { key: 'province', label: 'Đài' }
  ];
  
  const lotterySchedule = [
    { day: 'Thứ 2', province: 'TP.HCM, Đồng Tháp, Cà Mau' },
    { day: 'Thứ 3', province: 'Bến Tre, Vũng Tàu, Bạc Liêu' },
    { day: 'Thứ 4', province: 'Đồng Nai, Cần Thơ, Sóc Trăng' },
    { day: 'Thứ 5', province: 'Tây Ninh, An Giang, Bình Thuận' },
    { day: 'Thứ 6', province: 'Vĩnh Long, Bình Dương, Trà Vinh' },
    { day: 'Thứ 7', province: 'TP.HCM, Long An, Bình Phước, Hậu Giang' },
    { day: 'Chủ nhật', province: 'Tiền Giang, Kiên Giang, Đà Lạt' }
  ];
  </script>
  
  <style scoped>
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  .card:hover {
    transform: scale(1.02);
  }
  h1, h2 {
    font-weight: bold;
  }
  </style>
  