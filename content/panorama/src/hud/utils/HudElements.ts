export const getHudElement = (elementName: string) => {
  return $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.FindChildTraverse(elementName);
}