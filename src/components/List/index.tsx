import { TypeUser } from '../../apiTypes';
import { Card } from '../Card';
import styles from './styles.module.scss';

type Props = {
  data: TypeUser[];
}

export const List: React.FC<Props> = (props) => { 
  return (
    <ul className={styles.list}>
      {
        props.data.map((item) => (
          <Card user={item} key={item.id.value} />
        ))
      }
    </ul>
  )
}