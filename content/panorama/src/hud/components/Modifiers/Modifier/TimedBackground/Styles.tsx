export const Styles = {

  Container: (isDebuff: boolean, degree: number): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: isDebuff ? 'rgba(200, 50, 50, 0.9)' : 'rgba(0, 200, 20, 0.9)',
    clip: 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
  }),

}