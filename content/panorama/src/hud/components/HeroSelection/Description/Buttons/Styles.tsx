export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: "right",
    horizontalAlign: "right",
    marginRight: "12.5px",
    marginLeft: "12.5px",
    marginTop: "10px",
    marginBottom: "15px",
  }),

  CancelButton: (isHoveringCancel: boolean): Partial<VCSSStyleDeclaration> => ({
    width: '150px',
    height: '35px',
    borderRadius: '5px',
    marginLeft: '7.5px',
    padding: '6px 12px 6px 12px',
    backgroundImage: `url("s2r://panorama/images/background_play_button_2x.png")`,
    backgroundSize: '228px 50px',
    border: '1px solid #6e3f3f88',
    transitionProperty: 'brightness, saturation',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease-in-out',
    backgroundColor: 'red',
    saturation: isHoveringCancel ? '1.1' : '1.0',
    brightness: isHoveringCancel ? '0.75' : '0.50',
    boxShadow: 'fill black 0px 0px 1.5px 1.5px',
  }),

  SelectButton: (isPicked: boolean, isHoveringSelect: boolean): Partial<VCSSStyleDeclaration> => ({
    width: '150px',
    height: '35px',
    borderRadius: '5px',
    marginRight: '7.5px',
    padding: '6px 12px 6px 12px',
    backgroundImage: `url('s2r://panorama/images/background_play_button_2x.png')`,
    backgroundSize: '228px 50px',
    border: '1px solid #30303088',
    transitionProperty: 'brightness, saturation',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease-in-out',
    saturation: isHoveringSelect ? '1.1' : '1.0',
    brightness: isHoveringSelect ? '1.25' : '1.00',
    boxShadow: 'fill black 0px 0px 1.5px 1.5px',
    backgroundColor: isPicked ? 'rgb(50, 50, 50)' : 'gradient( linear, 0% 0%, 0% 100%, from( #5aa15e ), to( #87d69533 ) )'
  }),

  SelectButtonLabel: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 1px 2 #000000',
  }),

  SelectButtonLockIcon: (): Partial<VCSSStyleDeclaration> => ({
    width: "23px",
    height: "23px",
    verticalAlign: "center",
    horizontalAlign: "center",
  }),

  CancelButtonLabel: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
    color: "white",
    fontWeight: "bold",
    textShadow: "1px 1px 1px 2 #000000",
  })

}