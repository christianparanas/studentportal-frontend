import { useState, useEffect, useContext } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// components
import Student from "./svg/Student";

// contexts
import { DashContext } from "../contexts/DashContext.js";

export default function Nav(props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const { dashItems, setDashItems, isAuth, setIsAuth } =
    useContext(DashContext);

  // class vars
  const [sidebar, setSidebar] = useState("nav_sidebar");
  const [clickoutside, setClickoutside] = useState("clickoutside_overlay");

  const [dropOv, setDropOv] = useState("dropBox");
  const [dropIco, setDropIco] = useState("far fa-sort-down");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 10, opacity: 0 },
  };

  const parentVariant = {
    open: {
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.3, staggerDirection: -1 },
    },
  };

  const closeSidebar = () => {
    setClickoutside("clickoutside_overlay");
    setSidebar("nav_sidebar");
    setOpen(false);
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setClickoutside("clickoutside_overlay show_clickoutside_overlay");
    setSidebar("nav_sidebar show_nav_sidebar");
    setIsSidebarOpen(true);
  };

  const openDrop = () => {
    if (dropOv == "dropBox") {
      setDropOv("dropBox showDrop");
      setDropIco("far fa-sort-up");
    } else {
      setDropIco("far fa-sort-down");
      setDropOv("dropBox");
    }
  };

  const logout = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    if (isOpen) {
      openSidebar();
    }
  }, [isOpen, isAuth]);

  return (
    <div className="nav">
      <div className="logo">
        <Student />
        <p>Student Portal</p>
      </div>
      <div className="nav_btns">
        <div className="nav_options">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div className="nav_options nav_click" onClick={openDrop}>
          <img src={dashItems.userImg} alt="Student Image" />
          {dashItems.username} <i className={dropIco}></i>
        </div>

        <div className={dropOv}>
          <div className="dropImg">
            <img src={dashItems.userImg} alt="Student Image" />
            <p>{dashItems.username}</p>
          </div>
          <div className="dropOp">
            <div className="op">
              <i className="fal fa-image-polaroid"></i> Update Photo
            </div>
            <div className="op">
              <i className="fal fa-cog"></i> Account Settings
            </div>
            <div className="op oo">
              <i className="fal fa-lock"></i> Change Password
            </div>
            <div onClick={logout} className="op out">
              Logout <i className="fad fa-sign-out"></i>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className={clickoutside} onClick={closeSidebar}></div>
      <div className={sidebar}>
        <div className="header">
          <img src={dashItems.userImg} alt="Student Image" />
          <div className="side">
            <p>{dashItems.username}</p>
            <div className="ops">
              <i className="fal fa-cog"></i>
              <i className="fad fa-sign-out"></i>
            </div>
          </div>
        </div>

        <motion.div
          className="nav_sidebar_options"
          variants={parentVariant}
          animate={isSidebarOpen ? "open" : "closed"}
        >
          <Link href="/">
            <motion.div
              variants={menuItemVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className={`nav_sidebar_op ${
                props.page == 1 ? "currentpage" : ""
              }`}
            >
              <i className="fal fa-desktop-alt"></i>
              Dashboard
            </motion.div>
          </Link>
          <Link href="/subjects">
            <motion.div
              variants={menuItemVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className={`nav_sidebar_op ${
                props.page == 2 ? "currentpage" : ""
              }`}
            >
              <i className="fal fa-gift"></i>
              Free Education
            </motion.div>
          </Link>
          <Link href="/subjects">
            <motion.div
              variants={menuItemVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className={`nav_sidebar_op ${
                props.page == 3 ? "currentpage" : ""
              }`}
            >
              <i className="fal fa-book-open"></i>
              Subjects Enrolled
            </motion.div>
          </Link>
          <Link href="/grades">
            <motion.div
              variants={menuItemVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className={`nav_sidebar_op ${
                props.page == 4 ? "currentpage" : ""
              }`}
            >
              <i className="fal fa-user-graduate"></i>
              Grades
            </motion.div>
          </Link>
          <motion.div
            variants={menuItemVariants}
            animate={isSidebarOpen ? "open" : "closed"}
            className="nav_sidebar_op"
          >
            <i className="fal fa-address-card"></i>
            Assessment
          </motion.div>
          <motion.div
            variants={menuItemVariants}
            animate={isSidebarOpen ? "open" : "closed"}
            className="nav_sidebar_op"
          >
            <i className="fal fa-bookmark"></i>
            Ledger
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
