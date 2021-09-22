export const Styles = {

  Container: (degree: number): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 200, 0, 0.2)",
    clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)',
    border: "2px solid rgba(60, 255, 60, 0.1)",
  }),

}