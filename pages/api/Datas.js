// Datas.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const Datas = createContext();

export function DatasProvider({ children }) {
    //CHECK IF LOCALHOST OR ONLINE
    const isLocalhost = true

    //STORE MONITORING DATAS
    const [prDatas, setPrDatas] = useState([]);

    const [isMobile, setIsMobile] = useState(false)
    const [isLaptop, setIsLaptop] = useState(false)
    
    const [userData, setUserData] = useState('')
    //SETTING UP RESPONSIVE DESIGNS
    useEffect(() => {
        // Check if the screen width is less than a certain value (e.g., 768 for mobile devices)
        const isMobileDevice = window.innerWidth < 640;
        const isLaptopDevice = window.innerWidth < 1492
        setIsMobile(isMobileDevice);
        setIsLaptop(isLaptopDevice)
        // Listen for window resize events to update the state when the screen size changes
        const handleResize = () => {
            const isMobileDevice = window.innerWidth < 640;
            const isLaptopDevice = window.innerWidth < 1492
            setIsMobile(isMobileDevice);
            setIsLaptop(isLaptopDevice)
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //GETTING PR MONITORING DATAS
    async function getPrMonitoringDatas() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`, postData);
            const response = await res.json();
            if (!response.error) {
                setPrDatas(response)
                //console.log(`response for ${process.env.NEXT_PUBLIC_URL}/api/ccis/${province}: `, response);
            } else {
                // Handle the case when the response contains an error
                console.log(`Failed to fetch data for ${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`);
                // You can set the data to an empty array or handle it as needed
            }
        } catch (error) {
            // Handle the fetch error here
            console.error(`Error fetching data for URL: ${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`, error);
            // Set the data to an empty array or handle it as needed
        }
    }

    //FETCH DATAS
    useEffect(() => {
        if (isLocalhost) {
            getPrMonitoringDatas()
        } else {
            //Online here
        }
    }, []);

    const fetchingUser = (user) =>{
        setUserData(user)
    }
    return (
        <Datas.Provider
            value={{
                isLocalhost,
                isMobile,
                isLaptop,

                getPrMonitoringDatas,
                prDatas,

                fetchingUser,
                userData
            }}>
            {children}
        </Datas.Provider>

    );

}

export function useDatas() {
    return useContext(Datas);
}
