"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Transactions",
    path: "/transactions",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Accounts",
    path: "/accounts",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block">
      <nav className="py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.path}
                asChild
                variant={pathname === route.path ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={route.path} className="block px-4">
                  {route.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
