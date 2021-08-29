export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: '48px',
    height: '5px',
    marginTop: '4px',
    flowChildren: 'right',
    paddingLeft: '10px',
    paddingRight: '10px'
  }),

  Column: (width: number): Partial<VCSSStyleDeclaration> => ({
    width: width + '%',
    height: '5px',
  }),

  Skillpoint: (abilityLevel: number, index: number): Partial<VCSSStyleDeclaration> => ({
    width: '5px',
    height: '5px',
    horizontalAlign: 'center',
    backgroundColor: abilityLevel >= index ? 'orange' : 'black',
    borderRadius: '50%',
    border: "1px solid black",
  }),

}