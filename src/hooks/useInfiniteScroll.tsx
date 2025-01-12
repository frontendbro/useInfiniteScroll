import { useEffect, useState, useRef, useCallback } from 'react';

type UseInfiniteScrollProps = {
  fetchData: () => Promise<void>;
  hasMore: boolean;
  scrollTrigger: string;
  rootMargin?: string;
}

const useInfiniteScroll = ({ fetchData, hasMore, scrollTrigger, rootMargin = '200px' }: UseInfiniteScrollProps): [boolean] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchMore = useCallback(async () => {
    await fetchData();
    setIsFetching(false);
  }, [fetchData]);

  useEffect(() => {
    if (isFetching) return;
    const target = document.querySelector(scrollTrigger);

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            setIsFetching(true);
          }
        },
        {
          rootMargin,
        },
      );
    }

    if (target) observer.current.observe(target);

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [isFetching, hasMore, scrollTrigger, rootMargin]);

  useEffect(() => {
    if (!isFetching) return;

    fetchMore();

    return () => {
      setIsFetching(false);
    };
  }, [isFetching, fetchMore]);

  return [isFetching];
};

export default useInfiniteScroll;