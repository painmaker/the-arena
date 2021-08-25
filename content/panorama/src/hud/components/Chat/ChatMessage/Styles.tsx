import { toColor } from "../../../utils/Color";

export const Styles = {

  container: (isChatActive: boolean, opacity: string): Partial<VCSSStyleDeclaration> => ({
    transitionProperty: 'opacity',
    transitionDuration: isChatActive ? '0s' : '0.25s',
    transitionTimingFunction: 'ease-in-out',
    opacity: isChatActive ? '1.0' : opacity,
    width: '100%',
    paddingTop: '4px',
    flowChildren: 'right',
    transform: 'scaleY(-1)',
  }),

  heroImage: (): Partial<VCSSStyleDeclaration> => ({
    width: '24px',
    height: '24px',
    marginRight: '2px',
    verticalAlign: 'top',
    horizontalAlign: 'center',
  }),

  playernameLabel: (playerid: PlayerID): Partial<VCSSStyleDeclaration> => ({
    textShadow: '1px 1px 3px 3.0 black',
    fontSize: '18px',
    color: toColor(playerid),
    verticalAlign: 'top',
    fontFamily: 'Radiance, FZLanTingHei-R-GBK, TH Sarabun New, YDYGO 540, Gulim, MingLiU',
  }),

  chatMessageSystemText: (): Partial<VCSSStyleDeclaration> => ({
    color: 'yellow',
    textShadow: '1px 1px 3px 3.0 black',
    fontSize: '18px',
    fontFamily: 'Radiance, FZLanTingHei-R-GBK, TH Sarabun New, YDYGO 540, Gulim, MingLiU',
    verticalAlign: 'top',
  }),

  chatMessageText: (): Partial<VCSSStyleDeclaration> => ({
    color: 'white',
    textShadow: '1px 1px 3px 3.0 black',
    fontSize: '18px',
    fontFamily: 'Radiance, FZLanTingHei-R-GBK, TH Sarabun New, YDYGO 540, Gulim, MingLiU',
    verticalAlign: 'top',
  }),

}
