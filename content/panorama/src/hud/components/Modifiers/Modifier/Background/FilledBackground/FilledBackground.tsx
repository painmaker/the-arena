import React from 'react';
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex
}

const FilledBackground = (props: Props) => {

  const { buff, selectedUnit } = props;

  return (
    <Panel
      className={Styles.background}
      style={{
        backgroundColor: Buffs.IsDebuff(selectedUnit, buff) ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)'
      }}
    />
  )

}

export default FilledBackground;