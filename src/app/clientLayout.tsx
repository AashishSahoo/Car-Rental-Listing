"use client";

import React from "react";
import ReduxProvider from "./reduxProvider";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default ClientLayout;
