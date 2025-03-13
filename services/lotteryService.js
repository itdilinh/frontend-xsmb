export const fetchLotteryResults = async (date) => {
    try {
      const { data, error } = await useFetch(`https://api.xoso.com.vn/kqxs?date=${date}`)
      
      if (error.value) {
        throw new Error('Lỗi khi lấy dữ liệu từ API')
      }
      
      return data.value
    } catch (err) {
      console.error('Lỗi API xổ số:', err)
      return null
    }
  }
  