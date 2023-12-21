import { useDatas } from '@/pages/api/Datas';
import { Dialog, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import React, { Fragment, useState } from 'react';


export default function Login(props) {
  const {fetchingUser} = useDatas()

  const [warning, setWarning] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log("warning:",warning)

  const handleClose = () => {
    // Add your logic for closing the login dialog here
    props.isClose();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_URL}/api/login`; // Initialize with the base API URL
    const query = 'SELECT * FROM doctrack.users WHERE username = $1 AND password = $2';

    console.log(`API Endpoint: ${url}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: query,
          values: [username, password],
        }),
      });

      if (response.ok) {   
        const result = await response.json();
          console.log('Response:', result); // Log the entire response object
        if(result.data.length != 0) {
          console.log('Username:', result.data[0].username); // Log the entire response object  
          setWarning(false)
          fetchingUser(result.data[0].username)
          handleClose()
          setUsername('')
          setPassword('')
          Cookies.set('username', result.data[0].username, { expires: 1 });
        }else{
          setWarning(true)
          console.log('Length: ',result.data.length)   
        }

       
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to execute query. Server response: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred while executing the query:', error);
    }
  };


  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative " onClose={handleClose}>
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
                <Dialog.Panel className="w-96 transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <h2 className="text-2xl font-bold mb-4">LOGIN</h2>
                  <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                      <label htmlFor="username" className="text-sm font-semibold">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="py-2 px-3 border border-gray-300 rounded"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="password" className="text-sm font-semibold">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="py-2 px-3 border border-gray-300 rounded"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                    </div>
                    {warning ? <><label className='text-red-600 text-sm'>
                      Incorrect Password!
                    </label></> : ''}
                    <button
                      type="submit"
                      className="bg-fb-4 text-white py-2 px-4 rounded transition-all">
                      Login
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
