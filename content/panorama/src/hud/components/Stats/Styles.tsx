export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: "center",
    height: "30px",
    flowChildren: "right",
    borderRadius: "7px",
    backgroundColor: "rgba(25, 25, 25, 0.85)",
    marginBottom: "5px",
    width: "fit-children",
    paddingRight: '8px',
    paddingLeft: '8px',
  }),

  Entry: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    verticalAlign: "center",
    marginLeft: '8px',
    marginRight: '8px',
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    color: 'rgba(255, 255, 255, 0.5)',
  }),

  Image: (): Partial<VCSSStyleDeclaration> => ({
    width: "15px",
    height: "15px",
    backgroundSize: "contain",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    verticalAlign: "middle",
    marginRight: "2px",
    horizontalAlign: "center",
  }),

}