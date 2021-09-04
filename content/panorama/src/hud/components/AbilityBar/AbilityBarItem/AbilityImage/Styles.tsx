export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
  }),

  AbilityImage: (washColor: string, saturation: string): Partial<VCSSStyleDeclaration> => ({
    border: '2px solid rgba(25, 25, 25, 0.9)',
    washColor: washColor,
    saturation: saturation,
    verticalAlign: 'center',
    horizontalAlign: 'center',
  }),

}