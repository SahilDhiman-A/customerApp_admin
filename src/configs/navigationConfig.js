import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "notificationManagement",
    title: "Notification Management",
    type: "item",
    icon: <Icon.Bell size={20} />,
    permissions: ["superadmin", "editor"],
    navLink: "/",
  },
  {
    id: "changePassword",
    title: "Change Password",
    type: "item",
    icon: <Icon.Lock size={20} />,
    permissions: ["superadmin", "editor"],
    navLink: "/changePassword",
  },
  {
    id: "faq management",
    title: "FAQ Management",
    type: "collapse",
    icon: <Icon.HelpCircle size={20} />,
    permissions: ["superadmin", "editor"],
    children: [
      // {
      //   id: "segment",
      //   title: "Segment",
      //   type: "item",
      //   icon: <Icon.Command size={20} />,
      //   navLink: "/FaqManagement/segment",
      // },
      {
        id: "category",
        title: "Category",
        type: "item",
        icon: <Icon.Grid size={20} />,
        navLink: "/FaqManagement/category",
      },
      {
        id: "home",
        title: "Home",
        type: "item",
        icon: <Icon.Home size={12} />,
        navLink: "/FaqManagement/home",
      },
      {
        id: "business",
        title: "Business",
        type: "item",
        icon: <Icon.Bold size={12} />,
        navLink: "/FaqManagement/business",
      },
    ],
  },
];

export default navigationConfig;
