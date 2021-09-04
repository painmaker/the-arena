import { toColor } from "../../../utils/Color";

export const Styles = {

  Container: (playerId: PlayerID): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "20px",
    fontSize: "16px",
    textAlign: "center",
    textOverflow: "ellipsis",
    textShadow: "1px 1px 2px 1.5 rgba(0, 0, 0, 0.75)",
    color: toColor(playerId)
  }),

}