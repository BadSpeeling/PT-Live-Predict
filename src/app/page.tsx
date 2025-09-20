'use client'

import * as React from "react";
import AppProvider from "./AppContext";
import { PtPredictPanel } from "./PtPredictPanel";

export default function Home() {
  return (
      <AppProvider>
        <PtPredictPanel />
      </AppProvider>
  );
}
