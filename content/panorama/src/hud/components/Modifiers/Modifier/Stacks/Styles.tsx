export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    zIndex: 999,
  }),

  StackLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "25px",
    color: "white",
    fontWeight: "bold",
    verticalAlign: "center",
    horizontalAlign: "center",
    textShadow: "1px 1px 2px 5 #000000",
    textOverflow: "clip",
  }),

}