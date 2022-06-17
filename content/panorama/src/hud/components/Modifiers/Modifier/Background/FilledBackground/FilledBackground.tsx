import React from 'react';
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedEntityIndex: EntityIndex
}

const FilledBackground = (props: Props) => {

  const { buff, selectedEntityIndex } = props;

  return (
    <Panel
      className={Styles.border}
      style={{
        washColor: Buffs.IsDebuff(selectedEntityIndex, buff) ? 'rgba(245, 50, 20, 0.95)' : '#8bdd4f'
      }}
    />
  );

}

export default FilledBackground;