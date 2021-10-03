export const Styles = {

  Container: (hasInventory: boolean): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: "center",
    marginBottom: "40px",
    flowChildren: "right",
    marginRight: "0px",
    visibility: hasInventory ? 'visible' : 'collapse',
  }),

}