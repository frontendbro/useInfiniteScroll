import { TypeUser } from '../../apiTypes'
import styles from './styles.module.scss'

type Props = React.ComponentProps<'li'> & {
  user: TypeUser
}

export const Card: React.FC<Props> = (props) => {
  return <li className={styles.card}>
    <img className={styles.card_avatar} src={props.user.picture.thumbnail} alt="user avatar" width={50} height={50} />
    <div className={styles.card_info}>
      <span className={styles.card_info_name}>
        {`${props.user.name.first} ${props.user.name.last}`}
      </span>
      <span className={styles.card_info_email}>
        {props.user.email}
      </span>
    </div>
  </li>
}