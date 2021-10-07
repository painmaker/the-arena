export const Styles = {

  Container: (y: number, opacity: string): Partial<VCSSStyleDeclaration> => ({
    height: '25px',
    flowChildren: 'right',
    position: "0px " + y + "px " + "0px",
    horizontalAlign: 'center',
    transition: "opacity 0.25s ease-in-out 0.0s",
    opacity: opacity,
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'center',
    fontSize: '12px',
    color: 'white',
    marginLeft: '4px',
    marginBottom: '2px',
    textShadow: "1px 1px 2px 2 rgba(0, 0, 0, 0.8)",
    textOverflow: 'ellipsis'
  }),

  Image: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'center',
    height: '18px',
    width: '18px',
    padding: '-2px',
  }),


}