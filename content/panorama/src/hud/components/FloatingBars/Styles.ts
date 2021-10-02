export const Styles = {

  Container: (x: number, y: number, z: number): Partial<VCSSStyleDeclaration> => ({
    height: 'fit-children',
    width: '80px',
    position: x + "px " + y + "px " + z + "px",
    flowChildren: 'up',
    zIndex: -1,
  }),

}