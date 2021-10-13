export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: 'right',
  }),

  HeroImage: (): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: 'center',
    marginTop: '2px',
    width: '18px',
    height: '18px',
  }),

  ItemImage: (): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: 'center',
    marginTop: '4.5px',
    width: '18px',
    height: '14px',
    borderRadius: '5px',
    marginLeft: '1px',
    marginRight: '2px',
  }),

  ArrowImage: (): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: 'center',
    marginTop: '5px',
    width: '10px',
    height: '14px',
    marginLeft: '4px',
    marginRight: '2px',
  }),

  PlayernameLabel: (color: string): Partial<VCSSStyleDeclaration> => ({
    marginLeft: '3px',
    color: color,
    textShadow: "1px 1px 2px 2 #000000",
  }),

  TextLabel: (): Partial<VCSSStyleDeclaration> => ({
    color: '#CDCDCD',
    textShadow: "1px 1px 2px 2 #000000",
  }),

  ModifierLabel: (isDebuff: boolean): Partial<VCSSStyleDeclaration> => ({
    color: isDebuff ? 'red' : 'green',
    textShadow: "1px 1px 2px 2 #000000",
  }),

  EnemyOrAllyLabel: (): Partial<VCSSStyleDeclaration> => ({
    color: '#CDCDCD',
    textShadow: "1px 1px 2px 2 #000000",
    marginRight: '1px',
  }),

}
