import { Styles as ParentStyles } from "../Styles"

export const Styles = {

  LevelLabel: (): Partial<VCSSStyleDeclaration> => ({
    ...ParentStyles.Label(),
    marginRight: '3px',
  }),

  LevelbarContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100px",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    marginTop: "2px",
    marginBottom: "4px",
    marginLeft: "2px",
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
    ...Styles.LevelLabel(),
    fontSize: "14px",
    marginLeft: "4px",
    verticalAlign: "middle",
    minWidth: "40px",
    marginRight: "-10px",
    marginBottom: "2px",
  })

}