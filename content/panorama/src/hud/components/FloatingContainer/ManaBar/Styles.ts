export const Styles = {

  Container: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    marginTop: '1px',
    width: "80px",
    height: "5px",
    backgroundColor: 'black',
    visibility: visible ? 'visible' : 'collapse',
    borderRadius: '14px',
    horizontalAlign: 'center',
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "0px",
  }),

}