import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import clsx from "clsx";
import styles from "./Link.module.scss";

type LinkProps = {
    native?: boolean;
    nextLinkProps?: NextLinkProps;
    nativeLinkProps?: JSX.IntrinsicElements["a"];
    disabled?: boolean;
};

export const Link: React.FC<LinkProps> = ({
    children,
    native = false,
    nextLinkProps,
    nativeLinkProps,
    disabled,
}) => {
    if (native) {
        return (
            <a
                tabIndex={disabled ? -1 : undefined}
                {...nativeLinkProps}
                className={clsx(
                    styles.link,
                    disabled && styles.disabled,
                    nativeLinkProps?.className
                )}
            >
                {children}
            </a>
        );
    }
    return (
        <NextLink {...nextLinkProps}>
            <a
                tabIndex={disabled ? -1 : undefined}
                {...nativeLinkProps}
                className={clsx(
                    styles.link,
                    disabled && styles.disabled,
                    nativeLinkProps?.className
                )}
            >
                {children}
            </a>
        </NextLink>
    );
};

export default Link;
