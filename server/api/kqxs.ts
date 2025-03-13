import { defineEventHandler, getQuery } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const { date, province } = getQuery(event)

  try {
    const response = await axios.get(`https://api.xoso.me/live/${province}/${date}`)
    return { results: response.data.results }
  } catch (error) {
    return { results: [] }
  }
})
