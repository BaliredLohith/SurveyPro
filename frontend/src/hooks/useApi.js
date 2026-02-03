import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (dependencies.length > 0) {
      execute();
    }
  }, dependencies);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export const useAsyncApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    loading,
    error,
    execute,
  };
};

// Hook for paginated data
export const usePaginatedApi = (apiFunction, initialPage = 1, initialLimit = 10) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const execute = useCallback(async (currentPage = page, currentLimit = limit) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(currentPage, currentLimit);
      setData(result.data || result);
      setTotal(result.total || result.length);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, page, limit]);

  useEffect(() => {
    execute();
  }, [execute]);

  const nextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    execute(newPage, limit);
  }, [page, limit, execute]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      execute(newPage, limit);
    }
  }, [page, limit, execute]);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
    execute(newPage, limit);
  }, [limit, execute]);

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1);
    execute(1, newLimit);
  }, [execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setPage(initialPage);
    setLimit(initialLimit);
    setTotal(0);
  }, [initialPage, initialLimit]);

  return {
    data,
    loading,
    error,
    page,
    limit,
    total,
    execute,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    reset,
  };
};
