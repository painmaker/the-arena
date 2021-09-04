export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: 'fit-children',
    marginTop: '1px',
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "6px",
    borderRadius: "0px",
    horizontalAlign: "center",
  }),

  Scene: (health: number, maxHealth: number): Partial<VCSSStyleDeclaration> => ({
    width: (health / maxHealth) * 100 + "%",
    height: '100%',
    opacity: '0.8',
  }),

}