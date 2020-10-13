import React, { ReactNode } from "react";
import clsx from "clsx";
import * as styles from "./textarea.module.scss";

export type TextareaProps = {
    title?: ReactNode;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
} & JSX.IntrinsicElements["textarea"];

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (props, ref) => {
        const {
            rightIcon,
            leftIcon,
            title,
            className,
            ...textareaProps
        } = props;
        return (
            <span className={clsx(styles.wrapper, className)}>
                {title && (
                    <label htmlFor={title} className={styles.title}>
                        {title}
                    </label>
                )}
                <div className={styles.textareaGrid}>
                    {leftIcon && (
                        <span className={styles.leftIcon}>{leftIcon}</span>
                    )}
                    <textarea
                        {...textareaProps}
                        ref={ref}
                        id={title}
                        className={clsx(
                            styles.textarea,
                            leftIcon && styles.withLeftIcon,
                            rightIcon && styles.withRightIcon
                        )}
                    >
                        {props.children}
                    </textarea>
                    {rightIcon && (
                        <span className={styles.rightIcon}>{rightIcon}</span>
                    )}
                </div>
            </span>
        );
    }
);

Textarea.displayName = "LiteShopTextArea";

export default Textarea;
