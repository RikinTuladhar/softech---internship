import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import classNames from "classnames";
import { BsList, BsSearch, BsBell } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
import Modal from "./reusable/Model";
import { motion } from "framer-motion";
export default function Header() {
  const router = useRouter();
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const meValue = useRecoilValue(meAtom);
  console.log(meValue, "response");
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const headerStyle = classNames(
    "fixed bg-[#fcfdff] w-full z-10 px-4 shadow-sm shadow-slate-500/40",
    {
      ["sm:pl-[20rem]"]: !toggleCollapse,
      ["sm:pl-[5.6rem]"]: toggleCollapse,
    }
  );
  const [openLogoutModel, setOpenLogoutModel] = useState(false);
  const logoutModelHandler = () => {
    setOpenLogoutModel(true);
  };
  const signoutHandler = async () => {
    router.push("/login");
    Cookies.remove("access_token");
  };
  return (
    <>
      {openLogoutModel ? (
        <Modal>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4}}
          >
            <div className="bg-white px-6 py-3 rounded">
              <div className="text-center text-2xl font-normal my-2">
                <h1>Are you sure ?</h1>
              </div>
              <div className="text-white flex items-center gap-4">
                <button
                  className="bg-gray-300 rounded px-6 py-2 hover:bg-gray-400 "
                  onClick={() => setOpenLogoutModel(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 rounded px-6 py-2 hover:bg-red-700 "
                  onClick={() => signoutHandler()}
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </Modal>
      ) : (
        <></>
      )}
      <header className={headerStyle}>
        <div className="flex items-center justify-between h-16">
          <button
            onClick={invokeToggleCollapse}
            className="order-1 sm:order-1 bg-[#366f36] text-[#fafafa] hover:bg-[#71da71] ml-3 rounded-md w-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            <BsList size={30} />
          </button>
          {/* Initials or logo */}
          <div className="order-4 sm:order-4 py-2 rounded-full px-4  flex items-center justify-center">
            <div className={"mx-5"}>
              <h1>
                Welcome ,{" "}
                <span className={"text-2xl "}>{meValue.username}</span>{" "}
              </h1>
            </div>
            <button
              type={"button"}
              className="font-semibold text-sm text-white bg-indigo-500 rounded-full px-5 py-2"
              onClick={() => logoutModelHandler()}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
