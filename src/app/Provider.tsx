import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <Provider store={store}>{children}</Provider>;
};
