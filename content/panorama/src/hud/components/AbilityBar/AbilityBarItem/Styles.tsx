export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    flowChildren: 'down'
  }),

  AbilityContainer: (
    isTrainable: boolean,
    isActive: boolean,
    isAutoCastEnabled: boolean,
    isToggled: boolean,
    backgroundImage: string,
  ): Partial<VCSSStyleDeclaration> => ({
    width: "48px",
    height: "48px",
    marginRight: "15px",
    backgroundColor: isActive ? '#a0a0a0' : "rgba(0, 0, 0, 0.7)",
    backgroundImage: backgroundImage,
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