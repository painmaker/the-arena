import React from "react";

const ShoppingButton = () => {
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
