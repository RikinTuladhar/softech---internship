import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { SideNavItem } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {
  const linkStyle =
    "flex items-center min-h-[40px] h-full text-[#6e768e] py-2 px-4 hover:text-[#f6c177] rounded-md transition duration-200";
  const { toggleCollapse } = useSideBarToggle();
  const pathName = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      {item.submenu ? (
        <div className="rounded-md min-w-[18px]">
          <a
            className={`${linkStyle} ${pathName.includes(item.path) ? "rounded-md text-white light:text-black light:bg-[#efefef] bg-[#38a745]" : ""}`}
            onClick={toggleSubMenu}
          >
            {item.icon}
            {!toggleCollapse && (
              <>
                <span className="ml-3 text-base leading-6 font-semibold">
                  {item.title}
                </span>
                <BsChevronRight
                  className={` ${subMenuOpen ? "rotate-90 duration-200" : ""} ml-auto stroke-2`}
                />
              </>
            )}
          </a>
          {subMenuOpen && !toggleCollapse && (
            <div className="bg-[#f7f8f9] border-1-4">
              <div className="grid gap-y-2 px-10 py-3 leading-5">
                {item.subMenuItems!.map((subItem) => (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className={`${linkStyle}  hover:text-yellow-700 ${subItem.path === pathName ? "rounded-md text-green-100 light:text-black light:bg-[#efefef] bg-[#38a745]" : ""}`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`${linkStyle} ${item.path === pathName ? "rounded-md text-green-100 light:text-black light:bg-[#efefef] bg-[#418441]" : ""}`}
        >
          {item.icon}
          {!toggleCollapse && (
            <span className="ml-3 leading-6 font-semibold">{item.title}</span>
          )}
        </Link>
      )}
    </>
  );
};
