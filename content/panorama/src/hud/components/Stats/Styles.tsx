export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: "center",
    height: "30px",
    flowChildren: "right",
    borderRadius: "7px",
    backgroundColor: "rgba(25, 25, 25, 0.85)",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginBottom: "5px",
    width: "fit-children",
  }),

  Entry: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    verticalAlign: "center",
    marginRight: "25px",
    width: "fit-children",
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    color: 'rgba(255, 255, 255, 0.5)',
  })

}