import React from "react";
import {
  BsGear,
  BsHouseDoor,
  BsListUl,
  BsPerson,
  BsTruck,
} from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { GiGears } from "react-icons/gi";
import { SideNavItemGroup } from "@/types/types";

export const SIDENAV_ITEMS_Project: SideNavItemGroup[] = [
  {
    title: "Main Menu",
    menuList: [
      {
        title: "Dashboard",
        path: "/",
        icon: <BsHouseDoor size={20} />,
        submenu: false,
        subMenuItems: [{ title: "Dashboard", path: "/" }],
      },

    //   {
    //     title: "Main Setup",
    //     path: "/office",
    //     icon: <GiGears size={20} />,
    //     submenu: true,
    //     subMenuItems: [
    //       { title: "Category Setup", path: "/office/category/material" },
    //       { title: "Sub Category Setup", path: "/office/category/subCategory" },
    //       { title: "Items Setup", path: "/office/category/content" },
    //       { title: "Vendor Setup", path: "/office/vendor" },
    //       { title: "Bank Setup", path: "/office/bank" },
    //       { title: "Unit Setup", path: "/office/category/unit" },
    //       { title: "Fiscal Year", path: "/office/fiscal" },
    //     ],
    //   },
    //   {
    //     title: "Vehicle ",
    //     path: "/vehicle",
    //     icon: <BsTruck size={20} />,
    //     submenu: true,
    //     subMenuItems: [
    //       { title: "Company Setup", path: "/vehicle/company" },
    //       { title: "Vehicle Type Setup", path: "/vehicle/type" },
    //       { title: "Vehicle Use Setup", path: "/vehicle/use" },
    //       { title: "Category Setup", path: "/vehicle/category" },
    //       { title: "Vehicle", path: "/vehicle/vehicle" },
    //     ],
    //   },
      {
        title: "Stocks",
        path: "/stocks",
        icon: <AiOutlineStock size={20} />,
        submenu: true,
        subMenuItems: [
          { title: "Opening Stocks", path: "/stocks/openingStock" },
        //   { title: "Closing Stocks", path: "/stocks/closingStock" },
        ],
      },
      {
        title: "Setup",
        path: "/dashboard",
        icon: <BsGear size={20} />,
        submenu: true,
        subMenuItems: [
        //   { title: "Hariyali Project", path: "/dashboard/merchant" },
          { title: "Business Manager", path: "/dashboard/entrepreneur" },
          { title: "Farmer Group", path: "/dashboard/farmer-group" },
          { title: "Farmers", path: "/dashboard/farmers" },
        ],
      },
    ],
  },
  {
    title:"Request Form",
    menuList:[
      {
        title:"Request Form",
        path:"/projectRequest",
        icon:<FaWpforms size={20} />,
        submenu:true,
        subMenuItems:[
          {title:"Incoming Request" , path:"/projectRequest/inCommingRequest"},
          {title:"Make Request" , path:"/projectRequest/outgoingRequest"},
        ]

      }
    ]
  },
  {
    title: "Inventory",
    menuList: [
      {
        title: "Taken From Company",
        path: "/inventory/takenFromCompany",
        icon: <BsGear size={20} />,
        submenu: false,
        subMenuItems: [
          {
            title: "View Inventory",
            path: "/inventory/givenToGroup",
          },
         
        ],
      },
      {
        title: "Given to Group",
        path: "/inventory/givenToGroup",
        icon: <BsGear size={20} />,
        submenu: false,
        subMenuItems: [
          {
            title: "View Inventory",
            path: "/inventory/givenToGroup",
          },
         
        ],
      },
    ],
  },
  
];
