export const Styles = {

  InnerContainer: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: "right",
    verticalAlign: "top",
    marginRight: "0px",
    marginTop: "150px",
    borderRadius: "5px",
    minWidth: "750px",
    minHeight: "550px",
    zIndex: 999,
    backgroundImage: "url('s2r://panorama/images/ability_bg.png')",
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    flowChildren: "down",
    transition: "transform 0.55s ease-in-out 0.0s, opacity 0.55s ease-in-out 0.0s",
    transform: visible ? "translateX(-510px)" : 'translateX(0px)',
    opacity: visible ? "1.0" : "0.0",
  }),

  OuterContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    transform: 'translateX(500px)',
  }),

  ColumnContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%', flowChildren: 'right'
  }),

  LeftColumn: (): Partial<VCSSStyleDeclaration> => ({
    width: '50%',
    height: '100%',
  }),

  RightColumn: (): Partial<VCSSStyleDeclaration> => ({
    width: '50%',
    height: '100%',
    flowChildren: 'down'
  }),

}