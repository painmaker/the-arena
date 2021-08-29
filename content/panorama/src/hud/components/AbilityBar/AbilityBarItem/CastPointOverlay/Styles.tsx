export const Styles = {

  Container: (degree: number): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 200, 0, 0.2)",
    clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)',
    margin: '2px',
    border: "2px solid rgba(0, 150, 0, 0.2)",
  }),

}