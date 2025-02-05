import {
  Home,
  FileText,
  List,
  Users,
  Edit,
  DollarSign,
  BarChart,
  Bell,
  Notebook,
  SquarePlus,
  LifeBuoy,
  BookCheck,
} from "lucide-react";
import { Settings, LogOut } from "lucide-react";

export const adminNavLinks = [
  {
    title: "Dashboard",
    path: "/administrativeworld/admin",
    icon: <Home />,
  },
  {
    title: "Courses",
    path: "/administrativeworld/admin/course",
    icon: <Notebook />,
  },
  {
    title: "Pages",
    path: "",
    icon: <FileText />,
  },
  {
    title: "Category",
    path: "",
    icon: <List />,
  },
  {
    title: "User Insights",
    path: "",
    icon: <Users />,
  },
  {
    title: "Post",
    path: "",
    icon: <Edit />,
  },
  {
    title: "Transactions",
    path: "",
    icon: <DollarSign />,
  },
  {
    title: "Statics",
    path: "",
    icon: <BarChart />,
  },
];

export const adminToolsLinks = [
  {
    title: "Settings",
    path: "",
    icon: <Settings />,
  },
  {
    title: "Logout",
    path: "",
    icon: <LogOut />,
  },
];
export const adminNavBarLinks = [
  {
    title: "Settings",
    path: "",
    icon: <Bell />,
  },
];
export const adminCourseCardData = [
  {
    imgSrc: "/disableNotebook.png",
    altText: "Disable Notebook",
    buttonText: "Create New",
    icon: <SquarePlus />,
    path: "/administrativeworld/admin/course/create"
  },
  {
    imgSrc: "/draft.png",
    altText: "Draft",
    buttonText: "Draft",
    icon: <LifeBuoy />,
    path: "/administrativeworld/admin/course/draft"
  },
  {
    imgSrc: "/Notebook.png",
    altText: "Notebook",
    buttonText: "Published",
    icon: <BookCheck />,
    path: "/administrativeworld/admin/course/published"
  },
];
