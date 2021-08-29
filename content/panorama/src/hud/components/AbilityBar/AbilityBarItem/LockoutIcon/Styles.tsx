export const Styles = {

  Container: (showLock: boolean): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
    backgroundColor: showLock ? 'rgba(0, 0, 0, 0.9)' : 'none',
    zIndex: 9999,
  }),

  Icon: (): Partial<VCSSStyleDeclaration> => ({
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