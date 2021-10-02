export const Styles = {

  Container: (x: number, y: number, z: number): Partial<VCSSStyleDeclaration> => ({
    width: '80px',
    position: x + "px " + y + "px " + z + "px",
    flowChildren: 'down',
    zIndex: -1,
  }),

}