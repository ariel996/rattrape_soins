import React from "react";
import {createPopper} from "@popperjs/core";
import NavLink from "@/Components/NavLink";

const UserDropdown = () => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <>
            <a
                className="text-blueGray-500 block"
                ref={btnDropdownRef}
                onClick={e => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
          <span
              className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={"/img/user.png"}
            />
          </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{minWidth: "12rem"}}
            >
                <NavLink
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                >
                    Profile
                </NavLink>
                <NavLink
                    to={'/dashboard/logout'}
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                >
                    Logout
                </NavLink>

            </div>
        </>
    );
};

export default UserDropdown;
