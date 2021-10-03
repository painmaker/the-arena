export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "330.5px",
    height: "18.5px",
    verticalAlign: "bottom",
    horizontalAlign: "center",
    marginBottom: "105px",
    borderRadius: "4px",
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    horizontalAlign: "center",
  }),

  Scene: (health: number, maxHealth: number): Partial<VCSSStyleDeclaration> => ({
    width: (health / maxHealth) * 100 + "%",
    height: '100%',
    opacity: '0.8',
  }),

  HealthLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "14px",
    color: "white",
    marginTop: "0.25px",
    textShadow: "1px 1px 2px 2.5 #000000",
    verticalAlign: "middle",
    horizontalAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospaceNumbersFont",
    opacity: '0.8',
  }),

  RegenLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "14px",
    color: "#3ED038",
    marginTop: "-0.25px",
    marginRight: "3px",
    textShadow: "1px 1px 2px 2.5 #000000",
    verticalAlign: "middle",
    horizontalAlign: "right",
    fontWeight: "bold",
    fontFamily: "monospaceNumbersFont",
    opacity: '0.8',
  }),

}