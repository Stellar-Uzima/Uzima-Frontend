import { useEffect, useState } from "react";

export function useInfiniteScroll<T>(
  fetchPage: (page: number) => Promise<T[]>,
  initialPage = 1,
  pageSize = 12
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const data = await fetchPage(page);
      setItems(data);
      setLoading(false);
      if (data.length < pageSize) setHasMore(false);
    };
    loadInitial();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (loading || !hasMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPosition >= threshold) {
        setLoading(true);
        const nextPage = page + 1;
        const data = await fetchPage(nextPage);
        setItems(prev => [...prev, ...data]);
        setPage(nextPage);
        setLoading(false);
        if (data.length < pageSize) setHasMore(false);

        // update URL query param
        const url = new URL(window.location.href);
        url.searchParams.set("page", nextPage.toString());
        window.history.pushState({}, "", url.toString());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore]);

  return { items, loading, hasMore };
}
