import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { SideNavItemGroup } from "@/types/types";
import React from "react";
import { SideBarMenuItem } from "./sidebar-menu-item";
import classNames from "classnames";

const SideBarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const { toggleCollapse } = useSideBarToggle();
  const menuGroupTitleStyle = classNames(
    "py-4 tracking-[.1rem] font-medium uppercase text-sm text-[#A5A1AA]",
    {
      "text-center": toggleCollapse,
    },
  );
  return (
    <>
      {
        <h3 className={menuGroupTitleStyle}>
          {!toggleCollapse ? menuGroup.title : "..."}
        </h3>
      }
      {menuGroup.menuList?.map((item, index) => {
        return <SideBarMenuItem key={index} item={item} />;
      })}
    </>
  );
};

export default SideBarMenuGroup;
