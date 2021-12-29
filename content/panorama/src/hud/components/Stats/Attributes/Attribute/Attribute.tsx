import React from 'react';
import Styles from './styles.module.css'

type Props = {
  imgName: string,
  primaryAttribute: boolean, 
  base: number,
  bonus: number,
}

const Attribute = (props: Props) => {

  const { imgName, primaryAttribute, base, bonus } = props;

  return (
    <React.Fragment>
      <Image 
        src={`file://{images}/${imgName}.png`}
        className={Styles.image} 
        style={{
          border: primaryAttribute ? '1px solid rgba(255, 165, 0, 0.75)' : '1px solid black'
        }}
      />
      <Label 
        className={Styles.label}
        text={base} 
      />
      <Label 
        className={Styles.label}
        text={' + ' + bonus} 
        style={{ color: bonus > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
      />
    </React.Fragment>
  )

}

export default React.memo(Attribute);