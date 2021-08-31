export const Styles = {

  Container: (isMuted: boolean, isCooldownReady: boolean, hasEnoughMana: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundImage: 'url("s2r://panorama/images/softedge_circle.png")',
    saturation: isMuted ? '0.0' : !isCooldownReady ? '0.5' : '1.0',
    border: !isCooldownReady ? '3px solid rgba(50, 50, 50, 0.75)' : '0px solid black',
    washColor: hasEnoughMana ? 'none' : '#1569be',
  }),

}