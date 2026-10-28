import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Custom hook để fetch dữ liệu từ API backend
 * Fallback về dữ liệu mẫu nếu API không khả dụng
 *
 * @param {string} endpoint - API endpoint (vd: '/services')
 * @param {Array|Object} fallbackData - Dữ liệu mẫu fallback
 * @returns {{ data, loading, error }}
 */
export function useApi(endpoint, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}${endpoint}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setData(json.data || json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn(`API ${endpoint} không khả dụng, dùng dữ liệu mẫu:`, err.message);
          setData(fallbackData);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [endpoint]);

  return { data, loading, error };
}
