import { useSelector } from "react-redux";
import { adminNavBarLinks } from "@/configs/Site";
import { useTheme } from "@/style/ThemeContext";
import { Moon, PanelTopOpen, Sun } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

function NavBar() {
  const { toggleTheme, theme } = useTheme();
  const { open, setOpen } = useSidebar()
  const { user } = useSelector(state => state.authUser);

  if (!user) {
    return null; // Or a loading spinner, e.g., <Spinner />
  }

  if (user.accountType !== 'Admin') {
    return (
      <div className="text-center text-lg font-semibold">
        Access Denied
      </div>
    );
  }

  return (
    <div className="flex items-center w-full flex-wrap md:flex-nowrap">
      {/* Left Side (Logo & Text) */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="w-8 sm:w-10">
          <img src="/android-chrome-192x192.png" alt="Logo" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base lg:text-xl font-medium">Administrative World</span>
          <span className="text-xs mt-[-3px]">Your Dreams, Our Efforts!</span>
        </div>
      </div>

      {/* Right Side (Nav Buttons) */}
      <div className="flex  items-center gap-2 md:gap-4 mt-2 md:mt-0 ml-auto">
        {adminNavBarLinks.map((item, index) => (
          <div key={index} >
            {item.icon}
          </div>
        ))}

        {/* Theme Toggle */}
        <div onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </div>

        {/* Sidebar Trigger */}
        <div onClick={() => { setOpen(!open) }}>
          {open ? <PanelTopOpen className="rotate-90" /> : <PanelTopOpen className="-rotate-90" />}

        </div>
      </div>
    </div>
  );
}

export default NavBar;
