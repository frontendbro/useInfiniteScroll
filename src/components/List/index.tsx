import { useState } from 'react';
import { TypeUser } from '../../apiTypes';
import { Card } from '../Card';
import styles from './styles.module.scss';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export const List: React.FC = () => {

  const [cards, setCards] = useState<TypeUser[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
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