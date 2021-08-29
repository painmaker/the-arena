export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
  }),

  Background: (cooldownClipDegree: number): Partial<VCSSStyleDeclaration> => ({
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    clip: 'radial(50% 50%, 0deg, ' + cooldownClipDegree + 'deg)'
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    color: "white",
    fontSize: "36px",
    textShadow: "0px 0px 6px 6 #000000",
    horizontalAlign: "center",
    verticalAlign: "center",
    fontFamily: "monospaceNumbersFont",
  }),

}