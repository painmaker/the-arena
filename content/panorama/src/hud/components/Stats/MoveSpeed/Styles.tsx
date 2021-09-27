import { Styles as ParentStyles } from "../Styles"

export const Styles = {

  Image: (): Partial<VCSSStyleDeclaration> => ({
    ...ParentStyles.Image(),
    backgroundImage: 'url("s2r://panorama/images/icon_speed.png")',

  }),

}