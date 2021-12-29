export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    horizontalAlign: "right",
    marginRight: "20px",
    marginTop: "20px",
    flowChildren: "down",
  }),

  LevelLabel: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    textAlign: "center",
    marginTop: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  }),

  CircleContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "48px",
    height: "48px",
  }),

  CircleBackground: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "2px solid rgba(225, 225, 255, 0.1)",
    zIndex: 40,
    backgroundColor: "rgba(25, 25, 25, 0.75)",
  }),

  CircleForeground: (degree: number): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    horizontalAlign: "center",
    verticalAlign: "center",
    borderRadius: "50%",
    border: "1.5px solid #E7D291",
    zIndex: 50,
    transition: "clip 0.5s ease-in-out 0.0s",
    clip: 'radial(50% 50%, 0.0deg, ' + degree + 'deg)'
  }),

  CircleLevelLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.65)",
    marginTop: "0.25px",
    verticalAlign: "middle",
    horizontalAlign: "center",
    zIndex: 60,
  }),

}