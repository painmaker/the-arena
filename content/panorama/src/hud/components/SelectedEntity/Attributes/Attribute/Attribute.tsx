import React from 'react';
import Styles from './styles.module.css'

type Props = {
  imgSrc: string,
  isPrimaryAttribute: boolean,
  base: number | undefined,
  bonus: number | undefined,
}

const Attribute = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Attribute rendered");

  const { imgSrc, isPrimaryAttribute, base, bonus } = props;

  return (
    <React.Fragment>
      <Image
        src={imgSrc}
        className={Styles.image}
        style={{
          border: isPrimaryAttribute ? '1px solid rgba(255, 165, 0, 0.5)' : '0px solid black',
          padding: isPrimaryAttribute ? '1px' : '0px'
        }}
      />
      {base !== undefined && (
        <Label
          className={Styles.label}
          text={base}
        />
      )}
      {(bonus !== undefined && bonus !== 0) && (
        <Label
          className={Styles.label}
          text={' + ' + bonus}
          style={{ color: bonus > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
        />
      )}
    </React.Fragment>
  )

}

export default React.memo(Attribute);