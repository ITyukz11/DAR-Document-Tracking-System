import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import formatDate from '../formatDate'

export default function UpdateApprovedModal(props) {
  return (
    <>
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={props.isClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-auto transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <h1 className='font-semibold border-b-2 mb-2'>UPDATE PURCHASED REQUEST FORM</h1>
                <div className='grid grid-cols-2 gap-2 mb-10'>
                <b className='flex justify-end'>Section/Division: </b> <label className='flex justify-start'>{props.selectedData.Section_Division}</label>
                <b className='flex justify-end'>Description: </b> <label className='flex justify-start'>{props.selectedData.Description}</label>
                <b className='flex justify-end'>Date Encoded: </b> <label className='flex justify-start'>{formatDate(props.selectedData.Date_Encoded)}</label>
                 
                  </div>

                <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="bg-fb-4 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Approve
                      </button>
                    </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

      </Dialog>
    </Transition>
  </>
  )
}
