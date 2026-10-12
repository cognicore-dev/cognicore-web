"use client";

import type { AnchorHTMLAttributes } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { button, cx, type ButtonVariant } from "@/lib/styles";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant: ButtonVariant;
};

/** Pill-shaped in-page anchor with the magnetic hover effect. */
export function MagneticLink({ variant, className, children, ...rest }: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a ref={ref} className={cx(button.base, button[variant], "cursor-target", className)} {...rest}>
      {children}
    </a>
  );
}
