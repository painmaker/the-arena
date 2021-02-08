import React from "react";

interface Props { }

const ShoppingButton = (props: Props) => {
  return (
    <Panel hittest={false}>
      <Button>
        <Image
          style={{ washColor: 'white' }}
          onactivate={() => $.Msg("Shopping clicked!")}
          src="s2r://panorama/images/shop_btn_white_png.vtex"
        />
      </Button>
    </Panel>
  );
};

export default ShoppingButton;
