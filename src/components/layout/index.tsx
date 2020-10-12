import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";

type LayoutProps = React.PropsWithChildren<{ title?: string }>;
const Layout = (props: LayoutProps) => {
	return (
		<>
			<Head>
				<title>{props.title ?? "Questionare"}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<nav className={styles.navigation}>navigation</nav>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
