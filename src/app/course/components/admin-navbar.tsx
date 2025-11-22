"use client";

import { Navbar2, type Navbar2Props } from "@/app/components/Navbar2";

type AdminNavbarProps = Navbar2Props;

const adminNavLinks: Navbar2Props["navLinks"] = [
  { title: "Dashboard", url: "/course/admin" },
  { title: "Courses", url: "/course/admin" },
  { title: "All students", url: "/course/admin/manage" },
];

const adminLogo: Navbar2Props["logo"] = {
  src: "/logo.png",
  alt: "Werner Finance Academy – Admin",
  className: "max-h-10 md:max-h-12",
};

export const AdminNavbar = (props: AdminNavbarProps) => {
  return (
    <Navbar2
      {...props}
      logo={props.logo ?? adminLogo}
      navLinks={props.navLinks ?? adminNavLinks}
    />
  );
};

export default AdminNavbar;
