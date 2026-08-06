"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { siteNav, isNavGroup, type NavGroup } from "@/lib/site-nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function groupIsActive(pathname: string, group: NavGroup) {
  return group.items.some((item) => isActive(pathname, item.href));
}

const triggerClasses =
  "font-heading rounded-sm bg-transparent px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground";

export function SiteNavDesktop() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
      <NavigationMenuList className="gap-0.5">
        {siteNav.map((entry) => {
          if (!isNavGroup(entry)) {
            const active = isActive(pathname, entry.href);
            return (
              <NavigationMenuItem key={entry.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={entry.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      triggerClasses,
                      "inline-flex h-9 w-max items-center",
                      active && "bg-muted text-foreground",
                    )}
                  >
                    {entry.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          const active = groupIsActive(pathname, entry);
          return (
            <NavigationMenuItem key={entry.label}>
              <NavigationMenuTrigger
                className={cn(triggerClasses, active && "bg-muted text-foreground")}
              >
                {entry.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[22rem] gap-0.5 p-2">
                  {entry.items.map((item) => {
                    const itemActive = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            aria-current={itemActive ? "page" : undefined}
                            className={cn(
                              "block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
                              itemActive && "bg-muted",
                            )}
                          >
                            <span className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
