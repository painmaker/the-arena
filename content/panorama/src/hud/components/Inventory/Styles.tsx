export const Styles = {

  Container: (hasInventory: boolean): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: "center",
    marginBottom: "75px",
    flowChildren: "right",
    marginRight: "0px",
    visibility: hasInventory ? 'visible' : 'collapse',
  }),

}