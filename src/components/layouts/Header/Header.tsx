import Image from "next/image";
import { IoIosSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "@/redux/reducer/sidebar";
import { googleLogout } from "@react-oauth/google";
import { RootState } from "@/redux/store";
import { removeToken } from "@/redux/reducer/login";
import { usePathname } from "next/navigation";
const Header = () => {
  const [userClick, setUserClick] = useState(false);
  const dispatch = useDispatch();
  const path = usePathname();

  const user = useSelector(
    (state: RootState) => state.login.userToken
  );
  const { open } = useSelector(
    (state: RootState) => state.sidebar
  );

  const onNavToggle = (open: boolean) => {
    dispatch(sidebarToggle(!open));
  };

  const onLogOut = () => {
    dispatch(removeToken());
    googleLogout();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        // onNavToggle(true);
      } else {
        onNavToggle(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      data-scroll="false"
    >
      <div className="container-fluid py-1 px-3 w-100">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm text-white">
              <a className="opacity-5 text-white" href="javascript:;">
                Pages
              </a>
            </li>
            {path?.split("/").map((path, index) => {
              if (path) {
                return (
                  <li
                    key={index}
                    className="breadcrumb-item text-sm text-white active text-capitalize"
                    aria-current="page"
                  >
                    {path}
                  </li>
                );
              }
            })}
          </ol>
          <h6 className="font-weight-bolder text-white mb-0 text-capitalize">
            {path?.split("/").pop()}
          </h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <span className="input-group-text text-body">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a
                href="javascript:;"
                className="nav-link text-white p-0"
                id="iconNavbarSidenav"
              >
                <div
                  className="sidenav-toggler-inner"
                  onClick={() => onNavToggle(!open)}
                >
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0">
                <IoIosSettings size={18} />
              </a>
            </li>
            <li
              className="nav-item dropdown pe-2 d-flex align-items-center"
              onClick={() => setUserClick((pre) => !pre)}
            >
              <a
                href="javascript:;"
                className="nav-link text-white p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser size={15} />
              </a>
              <ul
                className={`dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4 ${
                  userClick ? "show" : null
                }`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="javascript:;"
                  >
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <Image
                          width={20}
                          height={20}
                          src={user?.image || ""}
                          alt="avatar"
                          className="avatar avatar-sm  me-3 "
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1 bg-gradint text-white">
                          <span className="">Shivam</span>
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-user me-1" aria-hidden="true"></i>
                          {user?.roleText || "user"}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="javascript:;"
                  >
                    <div
                      className="d-flex py-1 justify-content-center align-items-center"
                      onClick={onLogOut}
                    >
                      <p>Logout</p>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
