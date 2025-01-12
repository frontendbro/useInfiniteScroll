import { TypeUser } from '../../apiTypes';
import styles from './styles.module.scss';

/**
 * Props type for the Card component.
 * @typedef {Object} Props
 * @property {TypeUser} user - The user data to be displayed in the card.
 */
type Props = React.ComponentProps<'li'> & {
  user: TypeUser
}

/**
 * Card component to display user information.
 * @param {Props} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered card component.
 */
export const Card: React.FC<Props> = (props) => {
  return (
    <li className={styles.card}>
      {props.user.picture.thumbnail ? (
        <img
          className={styles.card_avatar}
          src={props.user.picture.thumbnail}
          alt="user avatar"
          width={50}
          height={50}
          loading='lazy'
        />
      ) : (
        <div className={`${styles.card_avatar} ${styles.card_avatar__empty}`}></div>
      )}

      <div className={styles.card_info}>
        <span className={styles.card_info_name}>
          {`${props.user.name.first} ${props.user.name.last}`}
        </span>
        <span className={styles.card_info_email}>
          {props.user.email}
        </span>
      </div>
    </li>
  );
};