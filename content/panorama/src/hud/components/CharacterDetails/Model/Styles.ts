
export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    height: "100%",
    width: "100%",
    marginRight: "5px",
    marginLeft: "10px",
    marginBottom: "10px",
    marginTop: "7.5px",
    borderRadius: "5px",
    backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
    backgroundSize: "100%",
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    color: "rgba(255, 165, 0, 0.9)",
    textAlign: "center",
    width: "100%",
    fontSize: "20px",
    paddingTop: "20px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
  }),

  Screen: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    verticalAlign: "center",
    horizontalAlign: "center",
    zIndex: -10,
  }),

}