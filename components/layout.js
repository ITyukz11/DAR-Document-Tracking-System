import { useDatas } from "@/pages/api/Datas";
import { useMenu } from "@/pages/api/MenuContext";
import { Popover, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { FaBox, FaChevronDown, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { MdLogin, MdTravelExplore } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import Login from "./utils/modals/Login";
import Cookies from 'js-cookie';
import FormModal from "./utils/modals/formmodal";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }) {
    const {fetchingUser} = useDatas()


    const [loginOpen, setLoginOpen] = useState(false);
    const [prForm, setPrForm] = useState(false);

    const [userSubMenu, setUserSubMenu] = useState(false)

    const { isMobile, currentTab, handlesCurrentTab } = useMenu();
    const { isLaptop,
            userData } = useDatas();
            console.log("USERDATA: ",userData.length>0)
    const tabs = [
        { id: 0, path: "/dashboard", label: 'Dashboard'},
        { id: 1, path: "/document", label: 'Document', image: userData?<FaChevronDown size={15}/>:''},
        { id: 2, path: "/table", label: 'Table', image: '' },
        { id: 3, path: "/logs", label: 'Logs', image: '' },
        { id: 4, path: "/reports", label: 'Reports', image: '' },
        { id: 5, path: "/configuration", label: 'Configuration', image: '' },
    ];

    useEffect(() => {
        // Retrieve the username from cookies when the component mounts
        const storedUsername = Cookies.get('username');
        if (storedUsername) {
          fetchingUser(storedUsername);
        }
      }, []);
      const handleLogout = () => {
        setUserSubMenu(false)
        fetchingUser('')
        Cookies.remove('username');
      };
      const userSubMenus = [
        {
            name: 'My Profile',
            icon: <FaUserAlt/>,
            style:'',
            button: () => {
                // Handle the click event for My Profile
                console.log('My Profile clicked');
              },
        },
        {
            name: 'Logout',
            icon: <MdLogin/>,
            style:'text-red-500',
            button:handleLogout
        },
    ]

    const documentSubMenus = [
        {
            name: 'Purchase Request',
            description: 'Efficiently manage and track purchase orders',
            href: '##',
            icon: <FaBox size={32}/>,
            button: ()=> setPrForm(true)
        },
        {
            name: 'Travel Order',
            description: 'Create and manage travel orders for employees',
            href: '##',
            icon: <SiYourtraveldottv size={35}/>,
            button: ()=> console.log('Travel Order')
        },
        {
            name: 'Salary Processing',
            description: 'Track and process employee salaries with ease',
            href: '##',
            icon: <GiTakeMyMoney size={35}/>,
            button: ()=> console.log('Salary Processing')

        },
    ]

    function generateTabClassName(selected) {
        const commonClasses = [
            'pt-3 pb-3 px-8 font-medium flex flex-row items-center gap-2',
        ];

        if (selected) {
            return classNames(
                ...commonClasses,
                'text-fb-0 bg-fb-4 rounded-md border-b-2 border-transparent'
            );
        } else {
            return classNames(
                ...commonClasses,
                'text-gray-500 hover:text-gray-700 hover:border-fb-4'
            );
        }
    }
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleTabMouseEnter = (tabId) => {
        if (tabId === 1) setIsPopoverOpen(true);
        handlesCurrentTab(tabId);

    };



    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
            {/* HEADER */}
            <header className="flex flex-col text-grey-primary fixed top-0 left-0 right-0 h-36 items-center justify-center font-bold z-1000">
                <div className="bg-fb-4 w-full h-24 justify-center flex items-center text-center">
                    {userData.length > 0 ?
                        <div className="absolute  right-5 flex flex-row items-center gap-5 rounded-full p-2 cursor-pointer bg-fb-0 hover:bg-opacity-90"
                        onClick={()=>setUserSubMenu(!userSubMenu)}>
                            <FaUserCircle size={25}/>
                            <label className="cursor-pointer">{userData}</label>
                            <FaChevronDown/>
                        </div> :
                        <div className="absolute  right-5 flex flex-row items-center gap-5 rounded-full p-2 cursor-pointer bg-fb-0 hover:bg-opacity-90"
                            onClick={() => setLoginOpen(true)}>
                            <MdLogin className="cursor-pointer" />
                            <label className="mr-5 cursor-pointer">LOGIN</label>

                        </div>
                    }

                    <label className={`${isMobile ? 'text-xs' : 'text-2xl'} text-fb-0 xl:text-2xl lg:text-xl md:text-lg sm:text-xs`}>
                        DOCUMENT TRACKING SYSTEM - BETA
                    </label>
                </div>
                <div className="font-normal w-full h-full gap-7 bg-blue justify-center flex items-center text-center bg-fb-1">
                    <Tab.Group
                        className="border-b border-gray-200"
                        defaultIndex={0}
                        selectedIndex={currentTab}
                    >
                        <Tab.List className="flex space-x-4">
                            {tabs.map((tab) => (
                                <Link href={tab.path} key={tab.id}>
                                    <Tab
                                        key={tab.id}
                                        className="relative rounded-md">
                                        <div
                                            className={generateTabClassName(currentTab === tab.id)}
                                            onClick={() => handlesCurrentTab(tab.id)}>

                                            {tab.label}
                                            <div className="rounded-full" onMouseEnter={() => handleTabMouseEnter(tab.id)}>
                                                {tab.image}

                                            </div>
                                        </div>
                                    </Tab>
                                </Link>

                            ))}
                        </Tab.List>
                    </Tab.Group>
                </div>
                {/**USER SUB MENUS */}
          
                    <Popover className="z-1000 top-10  -right-[69px] fixed">
                        <Transition
                            as={Fragment}
                            show={userSubMenu}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute right-0 mt-3 w-44 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl z-1000">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5" onMouseLeave={() => setIsPopoverOpen(false)}>
                                    <div className="grid bg-fb-0 ">                                   
                                            {userSubMenus.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={item.button}
                                                className="cursor-pointer h-10 flex items-center p-2 transition duration-150 ease-in-out hover:bg-fb-2 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                            >
                                                <div className={`flex  w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 ${item.style}`}>
                                                {item.icon}
                                                </div>
                                                <div className="ml-4">
                                                    <p className={`text-sm font-medium text-gray-900 ${item.style} `}>
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}                                
                                    </div>   
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                                                
                {/**DOCUMENT SUB MENUS */}
                {userData?
                   <div className="fixed mt-24 w-full max-w-sm px-4 ">
                   <Popover className="relative z-1000">

                       <Transition
                           as={Fragment}
                           show={isPopoverOpen && currentTab === 1}
                           enter="transition ease-out duration-200"
                           enterFrom="opacity-0 translate-y-1"
                           enterTo="opacity-100 translate-y-0"
                           leave="transition ease-in duration-150"
                           leaveFrom="opacity-100 translate-y-0"
                           leaveTo="opacity-0 translate-y-1"
                       >
                           <Popover.Panel className="absolute left mt-3 w-96 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl z-1000">
                               <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5" onMouseLeave={() => setIsPopoverOpen(false)}>
                                   <div className="grid gap-8 bg-fb-0 p-7 ">
                                       {documentSubMenus.map((item) => (
                                           <a
                                               key={item.name}
                                               className="cursor-pointer -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-fb-2 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                               onClick={item.button}
                                           >
                                               <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                                               {item.icon}
                                               </div>
                                               <div className="ml-4">
                                                   <p className="text-sm font-medium text-gray-900">
                                                       {item.name}
                                                   </p>
                                                   <p className="text-sm text-gray-500">
                                                       {item.description}
                                                   </p>
                                               </div>
                                           </a>
                                       ))}
                                   </div>
                                   <div className="bg-fb-1 p-4">
                                       <a
                                           href="##"
                                           className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                       >
                                           <span className="flex items-center">
                                               <span className="text-sm font-medium text-gray-900">
                                                   Documentation
                                               </span>
                                           </span>
                                           <span className="block text-sm text-gray-500">
                                               Start integrating!
                                           </span>
                                       </a>
                                   </div>
                               </div>
                           </Popover.Panel>
                       </Transition>
                   </Popover>
               </div>
               :''}
             
            </header>

            <main className="flex-1 w-full h-fit">
                <div className={` mt-20 ${isMobile ? 'mx-5' : isLaptop ? 'mx-40' : 'mx-56'}`}>{children}</div>
            </main>
            <Login isOpen={loginOpen} isClose={()=> setLoginOpen(!loginOpen)}/>
            <FormModal isOpen={prForm} isClose={()=> setPrForm(!prForm)}/>
        </div>
    );
}
