import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";

type LayoutProps = React.PropsWithChildren<{
    title?: string;
    headerNavigation?: React.ReactNode;
    footer?: React.ReactNode;
}>;
const Layout = (props: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{props.title ?? "Questionare"}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <main className={styles.wrapper}>
                <header className={styles.header}>
                    {props.title}
                    <nav className={styles.navigation}>
                        {props.headerNavigation}
                    </nav>
                </header>
                <div className={styles.content}>{props.children}</div>
                {props.footer && (
                    <footer className={styles.footer}>{props.footer}</footer>
                )}
            </main>
        </>
    );
};

export default Layout;
