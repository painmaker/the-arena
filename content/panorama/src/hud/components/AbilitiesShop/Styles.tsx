export const Styles = {

  OuterContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    transform: 'translateX(500px)'
  }),

  InnerContainer: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: "right",
    verticalAlign: "top",
    marginRight: "0px",
    marginTop: "150px",
    transition: "transform 0.5s ease-in-out 0.0s, opacity 0.5s ease-in-out 0.0s",
    opacity: visible ? "1.0" : "0.1",
    borderRadius: "5px",
    minWidth: "750px",
    minHeight: "550px",
    backgroundImage: 'url("s2r://panorama/images/ability_bg.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    flowChildren: "down",
    transform: visible ? "translateX(-510px)" : 'translateX(0px)',
  }),

  Row: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    width: "100%",
    padding: '15px',
  }),

  AbilitiesContainer: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    width: "100%",
    padding: '10px',
  }),

}