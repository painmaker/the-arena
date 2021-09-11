export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    height: "24px",
    width: "24px",
    verticalAlign: "center",
    horizontalAlign: "right",
  }),

  Btn: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    opacity: "0.75",
    padding: "2px",
    transition: "transform 0.5s ease-in-out 0.0s, background-color 0.5s ease-in-out 0.0s",
    backgroundColor: isHovering ? 'rgba(60, 60, 60, 1.0)' : 'rgba(0, 0, 0, 0.0)',
    border: isHovering ? "1px solid rgba(70, 70, 70, 1.0)" : '0px solid rgba(0, 0, 0, 1.0)',
    washColor: isHovering ? " rgba(100, 100, 100, 0.25)" : "rgba(100, 100, 100, 0.5)",
    transform: isHovering ? "scale3d(1.2, 1.2, 0)" : "scale3d(1.0, 1.0, 0)",
  })

}