'use client'

import * as React from "react";
import AppProvider from "./AppContext";
import { PtPredictPanel } from "./PtPredictPanel";

export default function Home() {
  return (
      <AppProvider>
        <div className="relative">
          <PtPredictPanel />
        </div>
      </AppProvider>
  );
}
