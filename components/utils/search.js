import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout';
import ViewModal from '@/components/utils/modals/viewmodal';

const fadeInOutVariants = {
  initial: { opacity: 0, scale: 0 }, // starting
  animate: { opacity: 1, scale: 1 }, // entry
  exit: { opacity: 0, scale: 0 }, // exit
};

const staggerChildren = 0.5; // Adjust as needed
const itemsPerPage = 12; // Adjust the number of items per page



export const Search = (props) => {
  
 const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [showViewQueryModal, setShowViewQueryModal] = useState(false)

  const [selectedData, setSelectedData] = useState([])
  const handlesSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredData = props.datas
    ? props.datas.filter((item) => {
        const values = Object.values(item);
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const limitDescription = (description) => {
    let limitDescription;
  
    if (description.length > 10) {
      limitDescription = description.substring(0, 13) + '...';
    } else {
      limitDescription = description;
    }
  
    return limitDescription;
  };
  


  return (
    
      <Layout>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex flex-col justify-center bg-white rounded-xl h-fit p-4 shadow-md overflow-x-auto overflow-y-hidden mb-5 items-center'>
            <div className='flex items-center w-full'>
            
              <input
                className='rounded-3xl h-12 w-full border-2 pl-8 align-middle pr-3'
                type='text'
                placeholder='Document Search ...'
                value={searchQuery}
                onChange={handlesSearchQuery}
              />
              <img 
                className='absolute mt-4 right-5 text-2xl hover:bg-gray-300 hover:cursor-pointer rounded-full'
                onClick={() => setSearchQuery('')}
              />
            </div>
          </div>
        </div>
       
        <div className='flex flex-row gap-3 flex-wrap justify-center'>
          <AnimatePresence>
            {currentItems.length ? (
              currentItems.map((data, index) => (
                <motion.div
                  className={`flex flex-col gap-5 md:gap-6 xl:gap-9 2xl:gap-16 bg-white rounded-xl h-fit p-4 shadow-md mb-5 w-full cursor-pointer hover:bg-grey-primary`}
                  key={data.query_id}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={fadeInOutVariants}
                  transition={{ x: { staggerChildren, type: 'spring' } }}
                  layout // Keep the component in the DOM during exit
                  onClick={() => {
                    setShowViewQueryModal(true);
                    setSelectedData(data);
                  }}
                  title={data.description} // Add the title attribute for the tooltip
                >
                  <div className='text-left'>
                    {/* <p><b>Query_id:</b> {data.query_id}</p> */}
                    <p><b>User:</b> {data.user_id}</p>
                    <p><b>Date:</b> {data.date}</p>
                    <p><b>Description:</b> {limitDescription(data.description)}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className={`flex flex-col w-full justify-center gap-5 md:gap-6 xl:gap-9 2xl:gap-16 bg-white  rounded-xl h-fit p-4 shadow-md mb-5 items-center`}

                initial='initial'
                animate='animate'
                exit='exit'
                variants={fadeInOutVariants}
                transition={{ x: { staggerChildren, type: 'spring' } }}
                  layout
              >
                There are no transactions currently
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className='flex justify-center mt-4'>
          {/* Pagination with left and right arrows */}
          {itemsPerPage && (
            <div className='flex items-center bg-green'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`mx-1 p-2 w-10 bg-fb-4 text-white rounded-md focus:outline-none ${currentPage === 1 || currentItems.length === 0 ? 'cursor-not-allowed bg-opacity-50' : ''}`}
                disabled={currentPage === 1 || currentItems.length === 0}
              >
                {'<'}
              </button>
              <span className="mx-1 p-2 font-semibold text-black rounded-md focus:outline-none">
                {currentPage}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))
                }
                className={`mx-1 p-2 w-10 bg-fb-4 text-white rounded-md focus:outline-none ${currentPage === Math.ceil(filteredData.length / itemsPerPage) || currentItems.length === 0 ? 'cursor-not-allowed bg-opacity-50' : ''}`}
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) || currentItems.length === 0}
              >
                {'>'}
              </button>
            </div>
          )}

        </div>
        {/* <ViewModal 
        isOpen={showViewQueryModal} 
        isClose={()=> setShowViewQueryModal(!showViewQueryModal)}
        data={selectedData}/> */}
      </Layout>
  

  );
};

