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

  AbilityImage: (): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: 'center',
    marginTop: '2px',
    width: '18px',
    height: '18px',
    borderRadius: '5px',
    marginLeft: '2px',
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

  UnitLabel: (): Partial<VCSSStyleDeclaration> => ({
    color: '#9f9f9f',
    textShadow: "1px 1px 2px 2 #000000",
  }),

  EnemyOrAllyLabel: (): Partial<VCSSStyleDeclaration> => ({
    color: '#CDCDCD',
    textShadow: "1px 1px 2px 2 #000000",
    marginRight: '1px',
  }),

}
