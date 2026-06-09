"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useId, useRef, useEffect, useCallback } from "react";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type NavChild = { title: string; href: string };

/**
 * Desktop nav item with a submenu.
 *
 * Opens on hover/focus (with a short close delay + an invisible bridge so the
 * pointer can travel from the trigger into the panel without it snapping shut).
 * The trigger itself is a real link to the section overview, so a *click*
 * always does one predictable thing — navigate — instead of fighting the hover
 * state and toggling unpredictably (the old behavior).
 */
function NavDropdown({ title, href, items }: { title: string; href: string; items: readonly NavChild[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);

  // Clean up any pending close timer on unmount.
  useEffect(() => cancelClose, [cancelClose]);

  const sectionActive = pathname === href || items.some((c) => pathname === c.href);

  return (
    <li
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeSoon}
      onFocus={openMenu}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSoon();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(false)}
        className={cn(
          "font-heading inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm tracking-wide uppercase transition-colors outline-none",
          "hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
          (open || sectionActive) && "bg-muted text-foreground",
        )}
      >
        {title}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </Link>

      {/* Submenu panel — a DOM child of this <li>, so hovering it keeps the menu
          open. The pt-2 wrapper bridges the visual gap below the trigger. */}
      <div
        className={cn(
          "absolute top-full left-0 z-50 min-w-[230px] pt-2 transition-all duration-150",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul role="menu" aria-label={title} className="bg-popover grid gap-1 rounded-xl border-2 p-2 shadow-lg">
          {items.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.title} role="none">
                <Link
                  href={child.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-heading block rounded-md px-3 py-2 text-sm tracking-wide transition-colors outline-none",
                    "hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
                    childActive && "bg-muted text-foreground",
                  )}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
          <li role="none" className="border-border/60 mt-1 border-t pt-1">
            <Link
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors"
            >
              View all {title}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sheetId = useId();
  const pathname = usePathname();

  // Pre-expand the mobile submenu that contains the current route (computed once on mount).
  const [openSection, setOpenSection] = useState<string | null>(() => {
    const active = siteConfig.mainNav.find(
      (item) =>
        "children" in item &&
        item.children &&
        (pathname === item.href || item.children.some((c) => pathname === c.href)),
    );
    return active ? active.title : null;
  });

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/85 sticky top-0 z-50 w-full border-b-2 backdrop-blur">
      <div className="container-tight flex h-16 items-center gap-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={280}
            height={70}
            style={{ height: 40, width: "auto" }}
            className="transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center lg:flex" aria-label="Main">
          <ul className="flex items-center gap-1">
            {siteConfig.mainNav.map((item) =>
              "children" in item && item.children ? (
                <NavDropdown key={item.title} title={item.title} href={item.href} items={item.children} />
              ) : (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-heading inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm tracking-wide uppercase transition-colors outline-none",
                      "hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
                      pathname === item.href && "bg-muted text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-auto lg:hidden">
            <Button variant="ghost" size="icon" className="border-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            id={sheetId}
            side="right"
            className="flex w-[300px] flex-col border-l-2 p-0 sm:w-[350px]"
            aria-describedby={undefined}
          >
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>

            {/* Mobile Menu Header */}
            <div className="border-border flex items-center border-b-2 px-6 py-5">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={240}
                height={60}
                style={{ height: 34, width: "auto" }}
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {siteConfig.mainNav.map((item, index) =>
                  "children" in item && item.children ? (
                    <li key={item.title}>
                      <button
                        onClick={() => setOpenSection((s) => (s === item.title ? null : item.title))}
                        aria-expanded={openSection === item.title}
                        className="font-heading hover:bg-accent/10 hover:text-accent active:bg-accent/20 flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base tracking-wide uppercase transition-all"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSection === item.title && "rotate-180",
                          )}
                        />
                      </button>
                      {openSection === item.title && (
                        <ul className="mt-1 ml-4 space-y-1 border-l-2 pl-2">
                          <li>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "font-heading hover:bg-accent/10 hover:text-accent active:bg-accent/20 flex items-center rounded-lg px-4 py-2.5 text-sm tracking-wide uppercase transition-all",
                                pathname === item.href && "bg-accent/10 text-accent",
                              )}
                            >
                              All {item.title}
                            </Link>
                          </li>
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "font-heading hover:bg-accent/10 hover:text-accent active:bg-accent/20 flex items-center rounded-lg px-4 py-2.5 text-sm tracking-wide uppercase transition-all",
                                  pathname === child.href && "bg-accent/10 text-accent",
                                )}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "font-heading hover:bg-accent/10 hover:text-accent active:bg-accent/20 flex items-center rounded-lg px-4 py-3.5 text-base tracking-wide uppercase transition-all",
                          pathname === item.href && "bg-accent/10 text-accent",
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-border bg-muted/50 mt-auto border-t-2 px-6 py-6">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm font-medium transition-colors"
              >
                <div className="bg-background flex h-10 w-10 items-center justify-center rounded-full border-2">
                  <Phone className="h-4 w-4" />
                </div>
                {siteConfig.contact.phone}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
