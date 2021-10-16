export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "50%",
    margin: '5px',
    flowChildren: 'down',
  }),

  TitleContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
    fontSize: "13px",
    color: "rgb(175, 175, 175)",
    textAlign: "left",
    fontFamily: "fantasy",
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '5px',
    paddingRight: '5px',
    letterSpacing: "1.35px"
  }),

  Title: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'left',
    fontSize: "13px",
    color: "rgb(175, 175, 175)",
    fontFamily: "fantasy",
    letterSpacing: "1.35px"
  }),

  AbilityCountLabel: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'right',
    fontSize: "13px",
    color: "rgb(175, 175, 175)",
    fontFamily: "fantasy",
    letterSpacing: "1.35px"
  }),

  AbilitiesContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    minHeight: '200px',
    backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    flowChildren: 'right-wrap',
    padding: '10px',
  }),

  CenterLabel: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'center',
    fontSize: '14px',
  })

}