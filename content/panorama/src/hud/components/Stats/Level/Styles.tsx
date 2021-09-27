import { Styles as ParentStyles } from "../Styles"

export const Styles = {

  LevelLabel: (): Partial<VCSSStyleDeclaration> => ({
    ...ParentStyles.Label(),
  }),

  LevelbarContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100px",
    height: "100%",
    verticalAlign: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    marginTop: "3px",
    marginBottom: "3px",
    marginLeft: "4px",
    borderRadius: "4px",
  }),

  Levelbar: (pct: number): Partial<VCSSStyleDeclaration> => ({
    backgroundColor: "orange",
    height: "100%",
    verticalAlign: "middle",
    margin: "4px",
    transition: "width 0.3s ease-in-out 0.0s",
    width: pct + '%',
  }),

  LevelPctLabel: (): Partial<VCSSStyleDeclaration> => ({
    ...ParentStyles.Label(),
    fontSize: "14px",
    verticalAlign: "middle",
    marginLeft: "4px",
  })

}