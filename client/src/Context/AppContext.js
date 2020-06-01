import { createContext } from "react";

const AppContext = createContext();

// Provider - The component that provides the value
export const AppContextProvider = AppContext.Provider;

// Consumer - A component that is consuming the value
export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
