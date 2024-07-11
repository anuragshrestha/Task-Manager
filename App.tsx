
import React from "react";
import { ColorContextProvider } from "./src/contexts/ColorContext";
import RootNavigator from "./src/nav/RootNavigator";
import { UserProvider } from "./src/contexts/UserProvider";

function App() {
  return (
    <ColorContextProvider>
    <UserProvider>
      <RootNavigator />
      </UserProvider>
    </ColorContextProvider>
  );
}



export default App;

