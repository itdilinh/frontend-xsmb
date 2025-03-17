<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger shadow">
    <div class="container">
      <a class="navbar-brand fw-bold text-white" href="/">🔴 Soi Cầu</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/">Trang chủ</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/ketqua">Kết Quả</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/soicauxsmb">SoiCau XSMB</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/soicauxsmn">SoiCau XSMN</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/soicauxsmt">SoiCau XSMT</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/bikip">Bí Kíp</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/Comments">Phòng Chát</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/soi-cau">Soi Cầu</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/tin-tuc">Sổ Mơ</NuxtLink>
          </li>
          
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/thong-ke">Thống Kê</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/register">Đăng Ký</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-white" to="/login">Đăng Nhập</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.nav-link:hover {
  text-decoration: underline;
}
</style>
