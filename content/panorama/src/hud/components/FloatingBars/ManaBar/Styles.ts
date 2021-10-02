export const Styles = {

  Container: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    marginTop: '1px',
    width: "100%",
    height: "5px",
    backgroundColor: 'black',
    visibility: visible ? 'visible' : 'collapse',
    borderRadius: '14px',
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "0px",
  }),

  Scene: (health: number, maxHealth: number): Partial<VCSSStyleDeclaration> => ({
    width: (health / maxHealth) * 100 + "%",
    height: '100%',
    opacity: '0.8',
  }),

}