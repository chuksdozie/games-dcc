import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const CustomToolTip = ({ children, info, variant, place, className }) => {
  return (
    <div>
      <a className={className}>{children}</a>
      <Tooltip
        anchorSelect={`.${className}`}
        place={place ?? "top"}
        variant={variant ?? "dark"}
      >
        {info}
      </Tooltip>
    </div>
  );
};

export default CustomToolTip;
