export const Styles = {

  Container: (opacity: string): Partial<VCSSStyleDeclaration> => ({
    flowChildren: 'up',
    transition: "opacity 0.5s ease-in-out 0.0s",
    opacity: opacity,
  }),

}
