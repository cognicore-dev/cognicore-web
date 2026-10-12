import { navLinks } from "@/lib/content";
import { MagneticLink } from "./MagneticLink";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-[10px]">
      <nav className="wrap flex items-center justify-between">
        <Logo />
        <div className="hidden gap-9 text-sm text-ink-dim min-[860px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-target relative pb-0.5 hover:text-ink after:absolute after:bottom-0 after:left-0 after:right-full after:h-[1.5px] after:bg-ink after:transition-[right] after:duration-300 after:ease-smooth after:content-[''] hover:after:right-0"
            >
              {link.label}
            </a>
          ))}
        </div>
        <MagneticLink href="#waitlist" variant="solid">
          Join waitlist
        </MagneticLink>
      </nav>
    </header>
  );
}
