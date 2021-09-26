export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
  }),

  AbilityImage: (washColor: string, saturation: string): Partial<VCSSStyleDeclaration> => ({
    washColor: washColor,
    saturation: saturation,
    verticalAlign: 'center',
    horizontalAlign: 'center',
  }),

}