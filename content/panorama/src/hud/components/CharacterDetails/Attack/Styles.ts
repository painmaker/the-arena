export const Styles = {

  OuterContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "50%",
    flowChildren: "down",
    marginTop: "7.5px",
    marginRight: "7.5px",
    marginBottom: "7.5px",
    marginLeft: "5px",
    borderRadius: "5px",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  }),

  Title: (): Partial<VCSSStyleDeclaration> => ({
    textAlign: "center",
    width: "100%",
    paddingTop: "15px",
    fontWeight: "bold",
    color: "rgba(255, 165, 0, 0.9)",
    fontSize: "20px",
  }),

  InnerContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    flowChildren: "down",
    marginRight: "25px",
    marginLeft: "25px",
    marginBottom: "25px",
    marginTop: "15px",
    verticalAlign: "center",
  }),

  Row: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    flowChildren: "right",
  }),

  LeftColumn: (): Partial<VCSSStyleDeclaration> => ({
    width: "60%",
  }),

  RightColumn: (): Partial<VCSSStyleDeclaration> => ({
    width: "40%",
    flowChildren: 'right',
  }),

  ColumnLabel: (): Partial<VCSSStyleDeclaration> => ({
    color: "rgba(255, 255, 255, 0.65)",
    fontSize: "18px",
  }),

}