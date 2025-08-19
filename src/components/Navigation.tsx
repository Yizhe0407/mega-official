import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "預約",
    icon: Calendar,
  },
  {
    href: "/profile",
    label: "個人資料",
    icon: User,
  },
];

export default function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="mx-auto flex max-w-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <Button
                variant="ghost"
                className="flex h-16 w-full flex-col gap-1 rounded-none text-muted-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}