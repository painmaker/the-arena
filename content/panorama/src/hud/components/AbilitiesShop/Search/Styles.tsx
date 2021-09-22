export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "570px",
    flowChildren: "right",
    backgroundColor: "black",
    borderRadius: "5px",
    border: "1px solid #3d464c",
  }),

  Icon: (): Partial<VCSSStyleDeclaration> => ({
    backgroundImage: 'url("s2r://panorama/images/icon_search_shadow.png")',
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "24px",
    width: "24px",
    washColor: "#8da1b1",
    verticalAlign: "center",
    marginTop: "-1.5px",
    marginLeft: "4px",
  }),

  SearchField: (): Partial<VCSSStyleDeclaration> => ({
    height: "36px",
    color: "white",
    fontSize: "20px",
    textOverflow: "clip",
    whiteSpace: "nowrap",
    border: "0px solid black",
    width: "510px",
    backgroundColor: "black",
  }),

  ClearBtn: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    backgroundImage: 'url("s2r://panorama/images/x_close_grey_png.vtex")',
    backgroundSize: "contain",
    height: "18px",
    width: "18px",
    verticalAlign: "center",
    transition: "transform 0.2s ease-in-out 0.0s, wash-color 0.2s ease-in-out 0.0s",
    washColor: isHovering ? "rgba(100, 100, 100, 0.25)" : "rgba(100, 100, 100, 0.5)",
    transform: isHovering ? "scale3d(1.1, 1.1, 0)" : "scale3d(1.0, 1.0, 0)",
  }),

}