import { NextComponentType, NextPageContext } from "next/types";
import React, { ReactNode } from "react";

const Warp: React.FC<{
  children: React.FC | NextComponentType<NextPageContext, any, {}> | ReactNode;
}> = ({ children }) => {
  return <div className="min-h-100vh bg-dark">{children}</div>;
};

export default Warp;
