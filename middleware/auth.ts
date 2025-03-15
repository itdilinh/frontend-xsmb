export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user'); // Lấy user từ cookie
    if (!user.value || JSON.parse(user.value).role !== 'admin') {
      return navigateTo('/login'); // Chỉ admin mới được vào
    }
  });
  