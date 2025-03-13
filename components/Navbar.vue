<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Soi Cầu 247</a>
  
        <button class="btn btn-outline-light position-relative" @click="toggleNotifications">
          🔔
          <span v-if="unreadCount" class="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {{ unreadCount }}
          </span>
        </button>
  
        <div v-if="showNotifications" class="notifications-box">
          <div v-if="notifications.length" class="list-group">
            <a 
              v-for="notif in notifications" 
              :key="notif._id" 
              href="#" 
              class="list-group-item list-group-item-action"
              @click="markAsRead(notif._id)"
            >
              {{ notif.message }}
            </a>
          </div>
          <p v-else class="text-muted">Không có thông báo nào.</p>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const notifications = ref([]);
  const unreadCount = ref(0);
  const showNotifications = ref(false);
  const userId = ref('user123');
  
  const fetchNotifications = async () => {
    const { data } = await useFetch(`/notifications?userId=${userId.value}`);
    notifications.value = data.value || [];
    unreadCount.value = notifications.value.filter(n => !n.read).length;
  };
  
  const markAsRead = async (notificationId) => {
    await useFetch(`/notifications/${notificationId}/read`, { method: 'PATCH' });
    fetchNotifications();
  };
  
  const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
  };
  
  onMounted(fetchNotifications);
  </script>
  
  <style>
  .notifications-box {
    position: absolute;
    top: 50px;
    right: 20px;
    width: 250px;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1000;
  }
  </style>
  