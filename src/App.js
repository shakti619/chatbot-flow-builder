// src/App.js

import React from "react";
import FlowBuilder from "./components/FlowBuilder";
import { MantineProvider, Notifications } from "@mantine/core";

// Main application component
function App() {
  return (
    // MantineProvider for theming and global styles
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <FlowBuilder />
      </div>
    </MantineProvider>
  );
}

export default App;
