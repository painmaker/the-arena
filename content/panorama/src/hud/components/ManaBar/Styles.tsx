export const Styles = {

  Container: (visible: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "342.5px",
    height: "18.5px",
    verticalAlign: "bottom",
    horizontalAlign: "center",
    marginBottom: "85px",
    borderRadius: "4px",
    visibility: visible ? 'visible' : 'collapse',
  }),

  Progressbar: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    horizontalAlign: "center",
  }),

  Scene: (mana: number, maxMana: number): Partial<VCSSStyleDeclaration> => {
    const width = (mana / maxMana) * 100
    return {
      width: Number.isNaN(width) || !Number.isFinite(width) ? '100%' : width + "%",
      height: '100%',
      hueRotation: '100deg',
      opacity: '0.8',
    }
  },

  ManaLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "14px",
    color: "white",
    marginTop: "0.25px",
    textShadow: "1px 1px 2px 2.5 #000000",
    verticalAlign: "middle",
    horizontalAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospaceNumbersFont",
    opacity: '0.6',
  }),

  RegenLabel: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "14px",
    color: "#83C2FE",
    marginTop: "0.5px",
    marginRight: "3px",
    textShadow: "2px 2px 0px 1.0 #00000066",
    verticalAlign: "middle",
    horizontalAlign: "right",
    fontWeight: "bold",
    fontFamily: "monospaceNumbersFont",
    opacity: '0.8',
  }),

}