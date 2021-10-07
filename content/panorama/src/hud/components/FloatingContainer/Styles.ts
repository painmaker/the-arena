export const Styles = {

  Container: (x: number, y: number, z: number): Partial<VCSSStyleDeclaration> => ({
    minHeight: '500px',
    width: '250px',
    position: x + "px " + y + "px " + z + "px",
    flowChildren: 'up',
    zIndex: -1,
  }),

}