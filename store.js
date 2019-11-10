import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "./actions"

const initialState = {
  loggedIn: 0
};

const useGlobal = useGlobalHook(React, initialState, actions);

export const connect = Component => {
    return props => {
      let [state, actions] = useGlobal();
      let _props = { ...props, state, actions };
      return <Component {..._props} />;
    };
};

export default useGlobal;
