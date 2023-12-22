import { useDatas } from '@/pages/api/Datas';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import formatDate from '../formatDate';


export default function UpdateModal(props) {
  // State variables to store form data
  const { getPrMonitoringDatas, userData } = useDatas()
  const [formData, setFormData] = useState({});
  console.log("props: ", props)

  useEffect(() => {
    setFormData({
      Section_Division: props.selectedData ? props.selectedData.Section_Division : '',
      Description: props.selectedData ? props.selectedData.Description : '',
      PR_Number: props.selectedData ? props.selectedData.PR_Number : '',
      RFQ: props.selectedData ? props.selectedData.RFQ : '',
      Canvass: props.selectedData ? props.selectedData.Canvass : '',
      Abstract: props.selectedData ? props.selectedData.Abstract : '',
      PO: props.selectedData ? props.selectedData.PO : '',
      Delivery: props.selectedData ? props.selectedData.Delivery : '',
      IAR: props.selectedData ? props.selectedData.IAR : '',
      DV: props.selectedData ? props.selectedData.DV : '',
      OBR_1: props.selectedData ? props.selectedData.OBR_1 : '',
      OBR_2: props.selectedData ? props.selectedData.OBR_2 : '',
      Controlled_OBR_3: props.selectedData ? props.selectedData.Controlled_OBR_3 : '',
      Disbursement: props.selectedData ? props.selectedData.Disbursement : '',
      Approval: props.selectedData ? props.selectedData.Approval : '',
      Cheque: props.selectedData ? props.selectedData.Cheque : '',
      Cheque_Number: props.selectedData ? props.selectedData.Cheque_Number : '',
    })
  }, [props])


  // Array representing form fields
  const formFields = [
    {
      label: 'Section/Division',
      name: 'Section_Division',
      disabled: true,
      date:props.selectedData.Date_Encoded? formatDate(props.selectedData.Date_Encoded):''
    },

    {
      label: 'Description',
      name: 'Description',
      disabled: true,
      date:props.selectedData.Date_Encoded? formatDate(props.selectedData.Date_Encoded):''
    },

    {
      label: 'PR Number',
      name: 'PR_Number',
      disabled: props.selectedData.PR_Number ? true : '',
      date:props.selectedData.PR_Number_Date? formatDate(props.selectedData.PR_Number_Date):''
    },

    {
      label: 'RFQ',
      name: 'RFQ',
      hidden: props.selectedData.PR_Number ? '' : 'hidden',
      required: !props.selectedData.PR_Number,
      disabled: props.selectedData.RFQ ? true : '',
      date:props.selectedData.RFQ_Date? formatDate(props.selectedData.RFQ_Date):''
    },

    {
      label: 'Canvass',
      name: 'Canvass',
      hidden: props.selectedData.RFQ ? '' : 'hidden',
      required: !(props.selectedData.RFQ && props.selectedData.Canvass),
      disabled: props.selectedData.Canvass ? true : '',
      date:props.selectedData.Canvass_Date? formatDate(props.selectedData.Canvass_Date):''
    },

    {
      label: 'Abstract',
      name: 'Abstract',
      hidden: props.selectedData.Canvass ? '' : 'hidden',
      required: !(props.selectedData.Canvass && props.selectedData.Abstract),
      disabled: props.selectedData.Abstract ? true : '',
      date:props.selectedData.Abstract_Date? formatDate(props.selectedData.Abstract_Date):''
    },

    {
      label: 'PO',
      name: 'PO',
      hidden: props.selectedData.Abstract ? '' : 'hidden',
      required: !(props.selectedData.Abstract && props.selectedData.PO),
      disabled: props.selectedData.PO ? true : '',
      date:props.selectedData.PO_Date? formatDate(props.selectedData.PO_Date):''
    },

    {
      label: 'Delivery',
      name: 'Delivery',
      hidden: props.selectedData.PO ? '' : 'hidden',
      required: !(props.selectedData.PO && props.selectedData.Delivery),
      disabled: props.selectedData.Delivery ? true : '',
      date: props.selectedData.Delivery_Date ? formatDate(props.selectedData.Delivery_Date) : ''
    },
    
    {
      label: 'IAR',
      name: 'IAR',
      hidden: props.selectedData.Delivery ? '' : 'hidden',
      required: !(props.selectedData.Delivery && props.selectedData.IAR),
      disabled: props.selectedData.IAR ? true : '',
      date: props.selectedData.IAR_Date ? formatDate(props.selectedData.IAR_Date) : ''
    },
    
    {
      label: 'DV',
      name: 'DV',
      hidden: props.selectedData.IAR ? '' : 'hidden',
      required: !(props.selectedData.IAR && props.selectedData.DV),
      disabled: props.selectedData.DV ? true : '',
      date: props.selectedData.DV_Date ? formatDate(props.selectedData.DV_Date) : ''
    },
    
    {
      label: 'OBR 1',
      name: 'OBR_1',
      hidden: props.selectedData.DV ? '' : 'hidden',
      required: !(props.selectedData.DV && props.selectedData.OBR_1),
      disabled: props.selectedData.OBR_1 ? true : '',
      date: props.selectedData.OBR_1_Date ? formatDate(props.selectedData.OBR_1_Date) : ''
    },
    
    {
      label: 'OBR 2',
      name: 'OBR_2',
      hidden: props.selectedData.OBR_1 ? '' : 'hidden',
      required: !(props.selectedData.OBR_1 && props.selectedData.OBR_2),
      disabled: props.selectedData.OBR_2 ? true : '',
      date: props.selectedData.OBR_2_Date ? formatDate(props.selectedData.OBR_2_Date) : ''
    },
    
    {
      label: 'Controlled OBR 3',
      name: 'Controlled_OBR_3',
      hidden: props.selectedData.OBR_2 ? '' : 'hidden',
      required: !(props.selectedData.OBR_2 && props.selectedData.Controlled_OBR_3),
      disabled: props.selectedData.Controlled_OBR_3 ? true : '',
      date: props.selectedData.Controlled_OBR_3_Date ? formatDate(props.selectedData.Controlled_OBR_3_Date) : ''
    },
    
    {
      label: 'Disbursement',
      name: 'Disbursement',
      hidden: props.selectedData.Controlled_OBR_3 ? '' : 'hidden',
      required: !(props.selectedData.Controlled_OBR_3 && props.selectedData.Disbursement),
      disabled: props.selectedData.Disbursement ? true : '',
      date: props.selectedData.Disbursement_Date ? formatDate(props.selectedData.Disbursement_Date) : ''
    },
    
    {
      label: 'Approval',
      name: 'Approval',
      hidden: props.selectedData.Disbursement ? '' : 'hidden',
      required: !(props.selectedData.Disbursement && props.selectedData.Approval),
      disabled: props.selectedData.Approval ? true : '',
      date: props.selectedData.Approval_Date ? formatDate(props.selectedData.Approval_Date) : ''
    },
    
    {
      label: 'Cheque',
      name: 'Cheque',
      hidden: props.selectedData.Approval ? '' : 'hidden',
      required: !(props.selectedData.Approval && props.selectedData.Cheque),
      disabled: props.selectedData.Cheque ? true : '',
      date: props.selectedData.Cheque_Date ? formatDate(props.selectedData.Cheque_Date) : ''
    },
    
    {
      label: 'Cheque Number',
      name: 'Cheque_Number',
      hidden: props.selectedData.Cheque ? '' : 'hidden',
      required: !(props.selectedData.Cheque && props.selectedData.Cheque_Number),
      disabled: props.selectedData.Cheque_Number ? true : '',
      date: props.selectedData.Cheque_Number_Date ? formatDate(props.selectedData.Cheque_Number_Date) : ''
    },   
  ];

  // Event handler for form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Save the current form data to the array
  //   setFormEntries([...formEntries, formData]);

  //   // Clear the form inputs
  //   setFormData({
  //     Section_Division: '',
  //     Description: '',
  //   });

  //   const url = `${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`;

  //   // Use parameterized query to prevent SQL injection
  //     const query = `
  //       UPDATE doctrack.purchase_request
  //       SET "username"=$1,"PR_Number"= $2,"PR_Number_Date" = $3 
  //       WHERE "Id" = ${props.selectedData? props.selectedData.Id:''};

  //   `;


  //   const currentDate = new Date();

  //   // Format the date as 'YYYY-MM-DD'
  //   const formattedDate = currentDate.toISOString().split('T')[0];



  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sql: query,
  //         values: [
  //           userData,
  //           formData.PR_Number, 
  //           formattedDate,

  //         ],
  //       }),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Response Form Modal:', result);

  //       // Show SweetAlert success message
  //       Swal.fire({
  //           title: "Success!",
  //           text: "Successfully created new Purchased Request",
  //           icon: "success",
  //           confirmButtonColor:"#3b5998"
  //         });
  //         setFormData({
  //           Section_Division: '',
  //           Description: '',
  //         });
  //       props.isClose()


  //     } else {
  //       const errorMessage = await response.text();
  //       console.error(`Failed to execute query. Server response: ${errorMessage}`);
  //     }
  //   } catch (error) {

  //     console.error('An error occurred while executing the query:', error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "!!!!",
  //       icon: "error",
  //     });
  //   } finally{
  //               // Show SweetAlert success message
  //               getPrMonitoringDatas()

  //               props.isClose()
  //   }
  // };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_URL}/api/documents/purchase-request`;
    const currentDate = new Date();

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = currentDate.toISOString().split('T')[0];
    // Build dynamic SET clause for the UPDATE query

    const dateData =
  !props.selectedData.PR_Number ? 'PR_Number_Date' :
  !props.selectedData.RFQ ? 'RFQ_Date' :
  !props.selectedData.Canvass ? 'Canvass_Date' :
  !props.selectedData.Abstract ? 'Abstract_Date' :
  !props.selectedData.PO ? 'PO_Date' :
  !props.selectedData.Delivery ? 'Delivery_Date' :
  !props.selectedData.IAR ? 'IAR_Date' :
  !props.selectedData.DV ? 'DV_Date' : 
  !props.selectedData.OBR_1 ? 'OBR_1_Date' :
  !props.selectedData.OBR_2 ? 'OBR_2_Date' :
  !props.selectedData.Controlled_OBR_3 ? 'Controlled_OBR_3_Date' :
  !props.selectedData.Disbursement ? 'Disbursement_Date' :
  !props.selectedData.Approval ? 'Approval_Date' :
  !props.selectedData.Cheque ? 'Cheque_Date' :
  !props.selectedData.Cheque_Number ? 'Cheque_Number_Date' : '';


    // Create a copy of the existing formData
    const updatedFormData = { ...formData };

    // Add the new data to the copy
    updatedFormData[dateData] = formattedDate;


    const setClause = Object.keys(updatedFormData)
      .filter((key) => updatedFormData[key] !== '' && key !== 'Id') // Filter out empty values and the Id field
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(',');


    // Use parameterized query to prevent SQL injection
    const query = `
    UPDATE doctrack.purchase_request
    SET ${setClause}
    WHERE "Id" = $1;
  `;

    console.log("setClause: ", setClause)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: query,
          values: [props.selectedData ? props.selectedData.Id : '', ...Object.values(updatedFormData)],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response Form Modal:', result);

        // Show SweetAlert success message
        Swal.fire({
          title: 'Success!',
          text: 'Successfully updated Purchased Request',
          icon: 'success',
          confirmButtonColor: '#3b5998',
        });

        // Clear the form inputs
        setFormData({
          Section_Division: '',
          Description: '',
        });
        props.isClose();
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to execute query. Server response: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred while executing the query:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the Purchased Request',
        icon: 'error',
      });
    } finally {
      // Show SweetAlert success message
      getPrMonitoringDatas();
      props.isClose();
    }
  };


  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                  <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData ? formFields.map((field, index) => (
                      field.hidden ? null : (
                        <div key={index} className={`mb-4 ${index % 5 === 4 ? 'md:mt-8 lg:mt-0' : ''}`}>
                          <div>
                          <div htmlFor={field.name} className={`block text-left text-sm mb-2 ${field.hidden} `}>
                           <label className='font-bold'>{field.label}:</label>
                           <label>{field.date}</label>
                          </div>
                          
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            rows={field.rows}
                            className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 ${field.hidden}`}
                            required={field.required || false}
                            disabled={field.disabled}
                          ></textarea>
                        ) : field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" ${field.hidden}`}
                            required={field.required || false}
                            disabled={field.disabled}
                          >
                            <option value="" disabled>
                              Select {field.label}
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
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className={`w-full border hid border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 ${field.hidden} ${field.disabled ? 'bg-gray-200' : '' // Apply background color for disabled field
                              }`}
                            required={field.required || false}
                            disabled={field.disabled || field.hidden} // Disable hidden fields
                          />
                        )}
                          </div>
                     
                        </div>
                      )

                    )) : ''}
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="bg-fb-4 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
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
