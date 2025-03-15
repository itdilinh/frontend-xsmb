<template>
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <nuxt-link to="/admin/users" class="btn btn-primary mt-4">Quản lý người dùng</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'admin',
    middleware: 'admin',
  };
  </script>
  