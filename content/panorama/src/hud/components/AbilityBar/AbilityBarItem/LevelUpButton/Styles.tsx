export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: 'down'
  }),

  ParticleScene: (): Partial<VCSSStyleDeclaration> => ({
    width: '48px',
    height: '20px',
    marginTop: '4px',
    verticalAlign: 'bottom',
  }),

  ButtonBackground: (): Partial<VCSSStyleDeclaration> => ({
    width: '48px',
    height: '20px',
    backgroundImage: 'url("s2r://panorama/images/hud/reborn/levelup_button_2_psd.vtex")',
    backgroundSize: '100% 100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    marginBottom: '-5px',
    verticalAlign: 'bottom',
    horizontalAlign: 'center',
  }),

  LockIcon: (): Partial<VCSSStyleDeclaration> => ({
    height: '12px',
    width: '12px',
    backgroundImage: 'url("s2r://panorama/images/hud/reborn/levelup_plus_well_psd.vtex")',
    backgroundSize: '100% 100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    verticalAlign: 'center',
    horizontalAlign: 'center',
    marginBottom: '2px',
  }),

}