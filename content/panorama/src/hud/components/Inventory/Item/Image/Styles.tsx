export const Styles = {

  Container: (lockItems: boolean, isCooldownReady: boolean, hasEnoughMana: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundImage: 'url("s2r://panorama/images/softedge_circle.png")',
    saturation: isCooldownReady ? '1.0' : '0.5',
    border: !isCooldownReady ? '3px solid rgba(50, 50, 50, 0.75)' : '0px solid black',
    washColor: lockItems ? 'rgba(0, 0, 0, 0.8)' : hasEnoughMana ? 'none' : '#1569be',
  }),

  LockIcon: (): Partial<VCSSStyleDeclaration> => ({
    width: '25px',
    height: '25px',
    verticalAlign: 'center',
    horizontalAlign: 'center',
    backgroundImage: 'url("s2r://panorama/images/lock_white.png");',
    backgroundSize: '100% 100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    zIndex: 9999,
  }),

}