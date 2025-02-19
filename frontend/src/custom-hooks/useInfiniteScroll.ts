import { useState, useEffect } from 'react';

const useInfiniteScroll = <T,>(
  fetchData: (page: number) => Promise<T[]>,
  options: { trigger?: boolean; sol?: number | null } = {}
) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const reset = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    // For page 1, only fetch if fetching is enabled.
    if (page === 1 && !options.trigger) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const newData = await fetchData(page);
        setData((prev) => (page === 1 ? newData : [...prev, ...newData]));
        setHasMore(newData.length > 0);
      } catch (err) {
        setError(`Failed to fetch data: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, options.trigger, options.sol]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return { data, loading, error, hasMore, reset, setPage };
};

export default useInfiniteScroll;
