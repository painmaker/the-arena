export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: 'fit-children',
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "6px",
    borderRadius: "0px",
    horizontalAlign: "center",
  }),

  Scene: (mana: number, maxMana: number): Partial<VCSSStyleDeclaration> => ({
    width: (mana / maxMana) * 100 + "%",
    height: '100%',
    hueRotation: '100deg',
    opacity: '0.8',
  }),

}