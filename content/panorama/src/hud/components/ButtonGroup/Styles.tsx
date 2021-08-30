export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: "right",
    width: "200px",
    marginBottom: "25px",
    marginRight: "25px",
    flowChildren: "left",
    zIndex: 9999,
  }),

  Entry: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "center",
    marginTop: "5px",
    marginBottom: "5px",
    marginRight: "10px",
    marginLeft: "10px",
    width: "36px",
    height: "36px",
    padding: "2.5px",
  }),

  EntryHover: (isSelected: boolean, isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    washColor: isSelected ? 'orange' : 'white',
    transform: isHovering ? "scale3d(1.05, 1.05, 1.0)" : "scale3d(1.0, 1.0, 1.0)"
  }),

}