"use client";
import store from "@/lib/store/store";
import { Provider } from "react-redux";
function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
