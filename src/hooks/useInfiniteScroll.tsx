import { useEffect, useState, useRef, useCallback } from 'react';

type UseInfiniteScrollProps = {
  fetchData: () => Promise<void>;
  hasMore: boolean;
  scrollTrigger: string;
  rootMargin?: string;
}

/**
 * Custom hook for implementing infinite scroll functionality.
 * @param {UseInfiniteScrollProps} props - The properties for the hook.
 * @param {() => Promise<void>} props.fetchData - Function to fetch more data.
 * @param {boolean} props.hasMore - Flag indicating if there is more data to load.
 * @param {string} props.scrollTrigger - CSS selector for the scroll trigger element.
 * @param {string} [props.rootMargin='200px'] - Margin around the root element for the intersection observer.
 * @returns {[boolean]} - Returns an array with a single boolean indicating if data is being fetched.
 */
const useInfiniteScroll = ({ fetchData, hasMore, scrollTrigger, rootMargin = '200px' }: UseInfiniteScrollProps): [boolean] => {
  /**
   * State to track if data is being fetched.
   * @type {boolean}
   */
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /**
   * Ref to store the IntersectionObserver instance.
   * @type {React.MutableRefObject<IntersectionObserver | null>}
   */
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * Callback function to fetch more data.
   * @type {() => Promise<void>}
   */
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