<template>
    <div>
      <!-- Nút mở modal -->
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chatRulesModal">
        Xem nội quy
      </button>
  
      <!-- Modal -->
      <div class="modal fade" id="chatRulesModal" tabindex="-1" aria-labelledby="chatRulesModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="chatRulesModalLabel">Nội Quy Phòng Chat</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Phòng chat là để giao lưu, kết bạn, thảo luận về xổ số và các lĩnh vực khác trên tinh thần vui vẻ, hòa đồng, giúp đỡ lẫn nhau và không vụ lợi. Những quy định sau cần phải được nghiêm túc thực hiện:</p>
              <ul>
                <li>Không sử dụng ngôn từ phản cảm, thô tục, xúc phạm hoặc có ý phân biệt vùng miền.</li>
                <li>Không gửi tin nhắn với nội dung lặp lại, tin nhắn vô nghĩa, lạm dụng biểu tượng cảm xúc...</li>
                <li>Không quảng cáo dưới mọi hình thức, không mời chào các thành viên nhắn tin, gọi điện để lấy số...</li>
                <li>Không đặt tên phản cảm, giả mạo Ban quản trị hoặc cố tình đặt tên trùng với tên thành viên khác.</li>
              </ul>
              <p><strong> mong nhận được sự hợp tác của các bạn nhằm xây dựng một sân chơi lành mạnh và tạo niềm vui cho tất cả thành viên.</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  