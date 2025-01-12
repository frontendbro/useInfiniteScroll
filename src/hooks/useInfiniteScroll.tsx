import { useEffect, useState, useRef } from 'react';

type UseInfiniteScrollProps = {
  fetchData: () => Promise<void>;
  hasMore: boolean;
}

const useInfiniteScroll = ({ fetchData, hasMore }: UseInfiniteScrollProps): [boolean] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isFetching) return;

    const target = document.querySelector('#infinite-scroll-trigger');
    
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setIsFetching(true);
        }
      },
      {
        rootMargin: '400px',
      }
    );

    if (target) observer.current.observe(target);

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchMore = async () => {
      await fetchData();
      setIsFetching(false);
    };

    fetchMore();
  }, [isFetching, fetchData]);

  return [isFetching];
};

export default useInfiniteScroll;