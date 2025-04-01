'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import Navbar from "@/app/Components/Navbar";
export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
<Navbar></Navbar>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
