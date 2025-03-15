<template>
    <div class="container mt-5">
      <h1 class="mb-4">👥 Quản lý User</h1>
  
      <!-- Thanh tìm kiếm -->
      <input
        type="text"
        v-model="searchQuery"
        class="form-control mb-3"
        placeholder="🔍 Tìm kiếm User..."
      />
  
      <button class="btn btn-success mb-3" @click="openAddUser">+ Thêm User</button>
  
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Quyền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="user._id">
              <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="openEditUser(user)">Sửa</button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user._id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Phân trang -->
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">«</button>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">»</button>
          </li>
        </ul>
      </nav>
  
      <!-- Modal -->
      <div class="modal fade show d-block" v-if="showModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Sửa User' : 'Thêm User' }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Tên:</label>
                <input v-model="userForm.name" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email:</label>
                <input v-model="userForm.email" type="email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Quyền:</label>
                <select v-model="userForm.role" class="form-select">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showModal = false">Hủy</button>
              <button class="btn btn-primary" @click="saveUser">
                {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const users = ref([]);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const perPage = 10; // Số user hiển thị trên mỗi trang
  const loading = ref(false);
  const showModal = ref(false);
  const isEditing = ref(false);
  const userForm = ref({ name: '', email: '', role: 'user' });
  const selectedUserId = ref(null);
  
  // Gọi API lấy danh sách user
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await fetch('http://localhost:3000/api/users');
      users.value = await response.json();
    } catch (error) {
      console.error('Lỗi khi lấy user:', error);
    }
    loading.value = false;
  };
  
  // Mở modal thêm user
  const openAddUser = () => {
    userForm.value = { name: '', email: '', role: 'user' };
    isEditing.value = false;
    showModal.value = true;
  };
  
  // Mở modal sửa user
  const openEditUser = (user) => {
    userForm.value = { ...user };
    selectedUserId.value = user._id;
    isEditing.value = true;
    showModal.value = true;
  };
  
  // Lưu user (Thêm hoặc Sửa)
  const saveUser = async () => {
    try {
      const method = isEditing.value ? 'PUT' : 'POST';
      const url = isEditing.value
        ? `http://localhost:3000/api/users/${selectedUserId.value}`
        : 'http://localhost:3000/api/users';
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm.value),
      });
  
      showModal.value = false;
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi lưu user:', error);
    }
  };
  
  // Xóa user
  const deleteUser = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
      users.value = users.value.filter((user) => user._id !== id);
    } catch (error) {
      console.error('Lỗi khi xóa user:', error);
    }
  };
  
  // Lọc danh sách user theo từ khóa
  const filteredUsers = computed(() => {
    return users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Tổng số trang
  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage));
  
  // Danh sách User sau khi phân trang
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredUsers.value.slice(start, start + perPage);
  });
  
  // Chuyển trang
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  onMounted(fetchUsers);
  </script>
  