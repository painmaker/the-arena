const getContainerBackgroundImage = (isTrainable: boolean, isPassive: boolean, isActive: boolean, isAutoCastEnabled: boolean, isToggled: boolean): string => {
  if (isTrainable) {
    return 'url("s2r://panorama/images/hud/reborn/levelup_button_learnmode_psd.vtex")';
  }
  if (isPassive) {
    return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")';
  }
  if (isActive) {
    return 'url("s2r://panorama/images/hud/reborn/active_ability_border_psd.vtex")';
  }
  if (isAutoCastEnabled || isToggled) {
    return 'url("s2r://panorama/images/hud/reborn/autocastable_ability_border_psd.vtex")'
  }
  return 'none'
}

export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: 'down',
    marginRight: "2.5px",
    marginLeft: "2.5px",
  }),

  AbilityContainer: (
    isTrainable: boolean,
    isActive: boolean,
    isAutoCastEnabled: boolean,
    isToggled: boolean,
    isPassive: boolean,
  ): Partial<VCSSStyleDeclaration> => ({
    width: "48px",
    height: "48px",
    backgroundColor: isActive ? '#a0a0a0' : "rgba(0, 0, 0, 0.7)",
    backgroundImage: getContainerBackgroundImage(isTrainable, isPassive, isActive, isAutoCastEnabled, isToggled),
    backgroundSize: '100% 100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    padding: isTrainable ? '4px' : isActive || isAutoCastEnabled || isToggled ? '2px' : '1px',
  }),

  LevelUpButtonContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '40px',
    flowChildren: 'down'
  }),

}