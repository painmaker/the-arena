import React from 'react';
import Styles from './styles.module.css';

type Props = {
  isDebuff: boolean,
}

const FilledBackground = (props: Props) => {

  const { isDebuff } = props;

  return (
    <Panel
      className={Styles.background}
      style={{ backgroundColor: isDebuff ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)' }}
    />
  )

}

export default FilledBackground;