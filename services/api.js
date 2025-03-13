
import { useFetch } from '#app';

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const fetchLotteryResults = async () => {
  const { data, error } = await useFetch(`${API_BASE_URL}/lottery-results`);
  if (error.value) console.error(error.value);
  return data.value;
};

export const fetchSoiCau = async () => {
  const { data, error } = await useFetch(`${API_BASE_URL}/soi-cau`);
  if (error.value) console.error(error.value);
  return data.value;
};

export const createLotteryResult = async (data) => {
  return await useFetch(`${API_BASE_URL}/lottery-results`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const createSoiCau = async (data) => {
  return await useFetch(`${API_BASE_URL}/soi-cau`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const updateLotteryResult = async (id, data) => {
  return await useFetch(`${API_BASE_URL}/lottery-results/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const updateSoiCau = async (id, data) => {
  return await useFetch(`${API_BASE_URL}/soi-cau/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteLotteryResult = async (id) => {
  return await useFetch(`${API_BASE_URL}/lottery-results/${id}`, {
    method: 'DELETE',
  });
};

export const deleteSoiCau = async (id) => {
  return await useFetch(`${API_BASE_URL}/soi-cau/${id}`, {
    method: 'DELETE',
  });
};


