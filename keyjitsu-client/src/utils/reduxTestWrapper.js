import React from "react";
import configureStore from "../configureStore";
import { Provider } from "react-redux";

export default (Comp) => {
    const store = configureStore();
    return [(
        <Provider store={store}>
            {Comp}
        </Provider>
    ), store];
}

