import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction,
} from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./ducks";

const createStore = (preloadedState = {}) => {
    const store = configureStore({
        preloadedState,
        reducer: rootReducer,
        middleware: getDefaultMiddleware(),
    });

    return store;
};

export type ReduxStore = ReturnType<typeof createStore>;
export type StoreDispatch = ReduxStore["dispatch"];
export type AppThunkAction<ArgumentType = undefined> = (
    ...arg: ArgumentType[]
) => ThunkAction<Promise<void>, RootState, null, Action<string>>;

export const getStore = (preloadedState = {}): ReduxStore => {
    // Always make a new store if server, otherwise state is shared between requests
    if (!process.browser) {
        return createStore(preloadedState);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window.__NEXT_REDUX_STORE__) {
        window.__NEXT_REDUX_STORE__ = createStore(preloadedState);
    }
    return window.__NEXT_REDUX_STORE__;
};
