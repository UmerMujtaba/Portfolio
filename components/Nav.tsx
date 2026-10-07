"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/apps", label: "Apps" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-ink hover:text-teal transition-colors"
        >
          umer<span className="text-amber">.</span>dev
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[0.95rem] transition-colors ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={`mailto:${email}`}
              className="rounded-sm border border-amber/50 px-4 py-2 text-sm text-amber hover:bg-amber hover:text-bg transition-colors"
            >
              Say hello
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-line bg-bg px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href} className="py-2">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base ${pathname === link.href ? "text-teal" : "text-ink"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a href={`mailto:${email}`} className="text-base text-amber">
              Say hello
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
