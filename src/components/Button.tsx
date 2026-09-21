'use client';
import { ButtonMotion } from './motion/ButtonMotion';
import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Common = { variant?: Variant; size?: 'default' | 'small' };
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> &
  Common & { loading?: boolean };
export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      <ButtonMotion inactive={disabled || loading}>{children}</ButtonMotion>
      {loading && <span aria-hidden="true"> ···</span>}
    </button>
  );
}
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style'> &
  Common & { href: string }) {
  return (
    <Link href={href} {...props} className="button" data-variant={variant} data-size={size}>
      <ButtonMotion>{children}</ButtonMotion>
    </Link>
  );
}
