import { createContext } from 'react';

const AppContext = createContext({});
const AppContextProvider = AppContext.Provider;

export { AppContext, AppContextProvider };