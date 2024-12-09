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

export const SIDENAV_ITEMS_Manager: SideNavItemGroup[] = [
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

    // items betweens
      // {
      //   title: "Stocks",
      //   path: "/stocks",
      //   icon: <AiOutlineStock size={20} />,
      //   submenu: true,
      //   subMenuItems: [
      //     { title: "Opening Stocks", path: "/stocks/openingStock" },
      //     { title: "Closing Stocks", path: "/stocks/closingStock" },
      //   ],
      // },
      {
        title: "Setup",
        path: "/dashboard",
        icon: <BsGear size={20} />,
        submenu: true,
        subMenuItems: [
        //   { title: "Hariyali Project", path: "/dashboard/merchant" },
        //   { title: "Business Manager", path: "/dashboard/entrepreneur" },
          { title: "Farmer Group", path: "/dashboard/farmer-group" },
          { title: "Farmers", path: "/dashboard/farmers" },
        ],
      },
    ],
  },
//   {
//     title:"Request Form",
//     menuList:[
//       {
//         title:"Request Form",
//         path:"/request",
//         icon:<FaWpforms size={20} />,
//         submenu:false,
//         subMenuItems:[
//           {title:"Request Form" , path:"/"}
//         ]

//       }
//     ]
//   },
  // {
  //   title: "Inventory",
  //   menuList: [
  //     {
  //       title: "Given to Project",
  //       path: "/inventory/givenToProject",
  //       icon: <BsGear size={20} />,
  //       submenu: false,
  //       subMenuItems: [
  //         {
  //           title: "View Inventory",
  //           path: "/inventory/givenToProject",
  //         },
         
  //       ],
  //     },
  //     {
  //       title: "Taken From Farmer",
  //       path: "/takenFarmer",
  //       icon: <BsGear size={20} />,
  //       submenu: true,
  //       subMenuItems: [
  //         {
  //           title: "View Inventory",
  //           path: "/inventory/takenFarmer",
  //         },
  //         {
  //           title: "Create Inventory",
  //           path: "/inventory/takenFarmer/create",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
