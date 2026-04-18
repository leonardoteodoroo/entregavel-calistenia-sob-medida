import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link, type LinkProps } from "react-router-dom";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type RouterButtonProps = BaseButtonProps &
  Omit<LinkProps, "children" | "className"> & {
    href?: never;
  };

type AnchorButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    to?: never;
  };

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
    to?: never;
  };

export type ButtonProps =
  | RouterButtonProps
  | AnchorButtonProps
  | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const resolvedClassName = [styles.button, styles[variant], props.className]
    .filter(Boolean)
    .join(" ");

  if ("to" in props && props.to !== undefined) {
    const {
      children,
      className: _className,
      variant: _variant,
      ...linkProps
    } = props;

    return (
      <Link {...linkProps} className={resolvedClassName}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const {
      children,
      className: _className,
      variant: _variant,
      ...anchorProps
    } = props;

    return (
      <a {...anchorProps} className={resolvedClassName}>
        {children}
      </a>
    );
  }

  const {
    children,
    className: _className,
    type = "button",
    variant: _variant,
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} type={type} className={resolvedClassName}>
      {children}
    </button>
  );
}
