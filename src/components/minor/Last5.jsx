import colors from "@/constants/colors";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDashCircle } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

export const Last5 = ({ data }) => {
  return (
    <div style={{ display: "flex", gap: ".2rem" }}>
      {data?.map((item, index) => {
        if (item === "W")
          return <FaRegCheckCircle color={colors.success700} key={index} />;
        else if (item === "D")
          return <BsDashCircle color={colors.warning700} key={index} />;
        else if (item === "L")
          return (
            <AiOutlineCloseCircle
              size={15}
              color={colors.error800}
              key={index}
            />
          );
        return;
      })}
    </div>
  );
};
