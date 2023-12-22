import { useDatas } from '@/pages/api/Datas';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';


export default function FormModal(props) {
      // State variables to store form data
      const {getPrMonitoringDatas, userData} = useDatas()
  const [formData, setFormData] = useState({
    Section_Division: '',
    Description: '',
  });

  console.log("userData: ",userData)

  useEffect(() => {
   
  
    setFormData({PR_Status: 'Encoded'})
  }, [])
  
  // State variable to store an array of form entries
  const [formEntries, setFormEntries] = useState([]);

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Save the current form data to the array
    setFormEntries([...formEntries, formData]);
  
    // Clear the form inputs
    setFormData({
      Section_Division: '',
      Description: '',
    });
  
    const url = `${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`;
  
    // Use parameterized query to prevent SQL injection
    const query = `
      INSERT INTO doctrack.purchase_request("Section_Division", "Description","Date_Encoded","username")
      VALUES ($1, $2, $3, $4);
    `;

    const currentDate = new Date();

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = currentDate.toISOString().split('T')[0];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: query,
          values: [
            formData.Section_Division,
            formData.Description,
            formattedDate,
            userData
          ],
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Response Form Modal:', result);
  
        // Show SweetAlert success message
        Swal.fire({
            title: "Success!",
            text: "Successfully created new Purchased Request",
            icon: "success",
            confirmButtonColor:"#3b5998"
          });
          setFormData({
            Section_Division: '',
            Description: '',
          });
        props.isClose()


      } else {
        const errorMessage = await response.text();
        console.error(`Failed to execute query. Server response: ${errorMessage}`);
      }
    } catch (error) {

      console.error('An error occurred while executing the query:', error);
      Swal.fire({
        title: "Error!",
        text: "!!!!",
        icon: "error",
      });
    } finally{
                // Show SweetAlert success message
                getPrMonitoringDatas()

                props.isClose()
    }
  };
  
  

  // Array representing form fields
  const formFields = [
    {
      label: 'Select Section/Division',
      name: 'Section_Division',
      type: 'select', 
      options: [
        'PLANNING',
        'BUDGET',
        'ACCOUNTING',
        'PERSONNEL',
        'LTID',
        'RDA OFFICE',
        'RDO OFFICE',
        'RD OFFICE'
      ],
    },
    { label: 'Description', name: 'Description', type: 'textarea', rows: 4 }
  ];
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
                <Dialog.Panel className="w-96 transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <h1 className='font-semibold border-b-2 mb-2'>PURCHASED REQUEST FORM</h1>
                <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-bold mb-2">
                {field.label}:
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  rows={field.rows}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  required
                  defaultValue={formData[field.name] === "" ? "" : undefined}
                >
                  <option value="" disabled>
                    {field.label}
                  </option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 ${
                  field.disabled ? 'bg-gray-200' : '' // Apply background color for disabled field
                }`}
                required
                disabled={field.disabled} // Add disabled attribute here
              />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-fb-4 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
                  

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
