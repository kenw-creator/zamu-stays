"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  CalendarDays,
  Image as ImageIcon,
  Star,
  LogOut,
  ExternalLink,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/media", label: "Photos & Videos", icon: ImageIcon },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-ink text-paper lg:min-h-screen lg:sticky lg:top-0 flex lg:flex-col">
      <div className="p-6 hidden lg:block">
        <span className="text-xl font-display font-semibold">Zamu Stays</span>
        <p className="font-mono-route text-[10px] uppercase text-brass mt-1">
          Admin
        </p>
      </div>

      <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible px-3 lg:px-4 py-3 lg:py-0 gap-1 lg:gap-1 grow">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors focus-ring ${
                active ? "bg-brass text-ink font-medium" : "text-paper/75 hover:bg-paper/10"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 flex lg:flex-col gap-2 border-t border-paper/10 lg:border-t lg:mt-auto">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-paper/75 hover:bg-paper/10 focus-ring"
        >
          <ExternalLink size={17} />
          View site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-paper/75 hover:bg-paper/10 focus-ring"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
