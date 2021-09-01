const POS_X_OFFSET = 138;
const POST_Y_OFFSET = -40;

export const Styles = {

  OuterContainer: (posX: number): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: 'center',
    flowChildren: 'down',
    width: '175px',
    height: 'fit-children',
    marginBottom: "75px",
    position: (posX - POS_X_OFFSET) + "px " + POST_Y_OFFSET + "px " + "0px",
    zIndex: 9999,
  }),

  InnerContainer: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: "bottom",
    horizontalAlign: 'center',
    flowChildren: 'down',
    width: '100%',
    height: 'fit-children',
    backgroundColor: 'black',
    border: "1px solid black",
    borderRadius: "1px",
    zIndex: 9999,
    marginLeft: '20px',
    marginRight: '20px',
  }),

  Title: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    color: 'rgba(200, 200, 200, 0.45)',
    letterSpacing: '1px',
    textShadow: "1px 1px 2px 2 #000000",
    paddingLeft: '2px',
    paddingTop: '6px',
    paddingBottom: '4px',
    backgroundColor: 'rgba(48, 66, 80, 0.5)',
  }),

  Divider: (): Partial<VCSSStyleDeclaration> => ({
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: "100%",
    height: '1px',
  }),

  Option: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    textAlign: 'center',
    fontSize: '16px',
    paddingTop: "2.5px",
    paddingBottom: '2.5px',
    borderTop: "2px solid rgba(44, 53, 60, 1.0)",
    backgroundColor: 'rgba(24, 33, 40, 1.0)',
    color: '#acaaaa',
    letterSpacing: '1px',
    saturation: isHovering ? '0.5' : '1.1',
    textShadow: "1px 1px 2px 2 #000000",
  }),

  CloseBtnContainer: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    width: 'fit-children',
    height: 'fit-children',
    horizontalAlign: 'right',
    padding: '1.2px',
    marginBottom: '-15px',
    marginRight: '14px',
    zIndex: 99999,
    borderRadius: '50%',
    backgroundColor: isHovering ? 'rgba(40, 40, 40, 1.0)' : 'rgba(24, 33, 40, 1.0)',
    border: '2px solid black',
    saturation: isHovering ? '0.5' : '1.5',
  }),

  CloseBtn: (): Partial<VCSSStyleDeclaration> => ({
    width: '15px',
    height: '15px',
    washColor: 'rgba(50, 50, 50, 0.7)',
    marginLeft: '1px',
  }),

  ArrowheadContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: 'fit-children',
  }),

  ArrowheadImage: (): Partial<VCSSStyleDeclaration> => ({
    width: '20px',
    height: '10px',
    washColor: 'rgba(24, 33, 40, 1.0)',
    zIndex: 9999,
    preTransformRotate2d: '180deg',
    horizontalAlign: 'center',
  }),

}