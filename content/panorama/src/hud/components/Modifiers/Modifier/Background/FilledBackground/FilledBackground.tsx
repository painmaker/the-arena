import React from 'react';
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex
}

const FilledBackground = (props: Props) => {

  const { buff, selectedUnit } = props;

  return (
    <React.Fragment>
      <Panel className={Styles.background} />
      <Panel
        className={Styles.border}
        style={{
          washColor: Buffs.IsDebuff(selectedUnit, buff) ? 'rgba(245, 60, 20, 0.95)' : '#8bdd4f'
        }}
      />
    </React.Fragment>
  );

}

export default FilledBackground;