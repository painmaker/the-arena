export const Styles = {

  OuterContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    transform: 'translateX(500px)',
  }),

  InnerContainer: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: "right",
    verticalAlign: "top",
    marginRight: "0px",
    marginTop: "250px",
    borderRadius: "5px",
    minWidth: "750px",
    height: "fit-children",
    zIndex: 999,
    backgroundImage: 'url("s2r://panorama/images/ability_bg.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    flowChildren: "down",
    transition: "transform 0.55s ease-in-out 0.0s, opacity 0.55s ease-in-out 0.0s",
    transform: visible ? "translateX(-510px)" : 'translateX(0px)',
    opacity: visible ? "1.0" : "0.0",
  }),

  UnclickableContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: 'fit-children',
    flowChildren: "down"
  }),

  TopContainer: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    width: "100%",
    padding: '15px',
  }),

  AbilitiesContainer: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    width: "100%",
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '0px',
    paddingBottom: '10px',
  }),

}