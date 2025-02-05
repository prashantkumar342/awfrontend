

import { useState } from "react";
import { Home, Settings, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { name: "Home", icon: <Home size={20} /> },
  { name: "Profile", icon: <User size={20} /> },
  { name: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-56"}`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="mb-4"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu />
        </Button>

        <Separator className="mb-4 bg-gray-700" />

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex items-center gap-3 justify-start"
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <nav className="flex flex-col gap-4 mt-6">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center gap-3 justify-start"
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
