export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "150px",
    height: "38px",
    backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
    backgroundSize: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginLeft: '5px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid rgba(100, 100, 100, 0.3)',
  }),

  LabelContainer: (): Partial<VCSSStyleDeclaration> => ({
    height: '100%',
    width: '100%',
    paddingTop: '1px',
    flowChildren: 'right'
  }),

  Icon: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'left',
    backgroundImage: 'url("s2r://panorama/images/icon_abilities_shop_points.png")',
    backgroundSize: "100%",
    height: '14px',
    width: '14px',
    washColor: 'rgba(100, 100, 100, 0.45)',
    marginLeft: '5px',
  }),

  TextLabel: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    textAlign: 'center',
    fontSize: '11px',
    color: 'rgba(200, 200, 200, 0.75)',
    width: '70%',
  }),

  NumberLabel: (hasPoints: boolean): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    textAlign: 'center',
    fontSize: '20px',
    color: hasPoints ? 'orange' : "rgba(200, 200, 200, 0.75)",
    fontWeight: 'bold',
    width: '30%',
    marginLeft: '-10px',
  }),

}