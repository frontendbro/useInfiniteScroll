import { useState } from 'react';
import { TypeUser } from '../../apiTypes';
import { Card } from '../Card';
import styles from './styles.module.scss';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

/**
 * Component List
 * Renders a list of user cards with infinite scroll functionality.
 */
export const List: React.FC = () => {

  /**
   * State to store the list of user cards.
   * @type {TypeUser[]}
   */
  const [cards, setCards] = useState<TypeUser[]>([]);

  /**
   * State to store the current page number for fetching data.
   * @type {number}
   */
  const [page, setPage] = useState(1);

  /**
   * State to determine if there are more items to load.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetches data from the API and updates the state.
   * @async
   * @function fetchData
   * @returns {Promise<void>}
   */
  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${page === 1 ? 20 : 10}&inc=name,picture,email,id`);
      const newCards = await response.json();

      setCards(prevCards => [...prevCards, ...newCards.results]);

      if (newCards.length === 0) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  /**
   * Custom hook to handle infinite scroll.
   * @type {boolean}
   */
  const [isFetching] = useInfiniteScroll({ fetchData, hasMore, scrollTrigger: '#scroll-trigger' });

  return (
    <ul className={styles.list}>
      {
        cards.map((item, idx) => (
          <Card user={item} key={idx} />
        ))
      }
      <li id="scroll-trigger" style={{ height: '1px' }}></li>
      {isFetching && <li>Загрузка...</li>}
      {!hasMore && <li>Больше нет данных.</li>}
    </ul>
  );
};