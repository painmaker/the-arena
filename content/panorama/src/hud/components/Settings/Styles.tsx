export const Styles = {

  OuterContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    transform: 'translateX(500px)'
  }),

  InnerContainer: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "top",
    horizontalAlign: "right",
    marginTop: "200px",
    marginRight: "0px",
    minWidth: "450px",
    minHeight: "100px",
    backgroundImage: 'url("file://panorama/images/bg_scoreboard.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: "5px",
    flowChildren: "down",
    transition: "transform 0.5s ease-in-out 0.0s, opacity 0.5s ease-in-out 0.0s",
    opacity: visible ? "1.0" : "0.1",
    transform: visible ? "translateX(-510px)" : 'translateX(0px)',
  }),

  EntryContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    flowChildren: "right",
    backgroundColor: "rgba(65, 65, 65, 0.3)",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "8.5px",
    paddingBottom: "8.5px",
  }),

}