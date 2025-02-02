import React from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { getStore } from "@store";
import { fetchQuestionList } from "@ducks/questionnaire";
import { RootState } from "@ducks";
import "@styles/global.scss";

type MyAppServerProps = { initialReduxState: RootState };
type MyAppProps = AppProps & MyAppServerProps;

const MyApp: NextPage<MyAppProps, MyAppServerProps> = (props: MyAppProps) => {
    const { Component, pageProps } = props;
    const store = getStore(props.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

MyApp.getInitialProps = async () => {
    const store = getStore();
    await store.dispatch(fetchQuestionList());
    const initialReduxState = store.getState();

    return {
        initialReduxState,
    };
};

export default MyApp;
