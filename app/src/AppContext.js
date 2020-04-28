import React from 'react';
import helper from "./Helper";

const AppContext = React.createContext({
    post: helper.initializePost(),
    setCurrentPost: () => {}
})

export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer

export default AppContext