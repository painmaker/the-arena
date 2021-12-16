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
      className={Styles.border}
      style={{
        washColor: Buffs.IsDebuff(selectedUnit, buff) ? 'rgba(245, 50, 20, 0.95)' : '#8bdd4f'
      }}
    />
  );

}

export default FilledBackground;