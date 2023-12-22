import { useDatas } from '@/pages/api/Datas';
import React, { useEffect, useState } from 'react';
import UpdateModal from './utils/modals/updatemodal';
import UpdateApprovedModal from './utils/modals/updateapprovalmodal';

export default function Kanban() {
  const { prDatas, getPrMonitoringDatas} = useDatas();
  const [selectedData, setSelectedData]=useState([])
  const [showUpdateModal,  setShowUpdateModal]=useState(false)
  const [showUpdateApprovalModal, setShowUpdateApprovalModal] = useState(false)

  useEffect(() => {
    getPrMonitoringDatas()
  }, [])
  
  const columns = [
    'END USER',
    'SUPPLY',
    'BUDGET',
    'RCAO',
    'ACCOUNTING',
    'RDO/RDA',
    'CASHIER',
  ];

  const getDaysPassed = (date) =>{
    // Assuming data.Date_Encoded is a valid Date object
    const encodedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());

    // Calculate the difference in days
    const timeDifference = currentDate.getTime() - encodedDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysPassed
  }

  const renderKanbanData = (dataInfo, dateData, description, expireDay) =>
    (<div className={`${dataStyle(dataInfo)} ${getDaysPassed(dateData)>=expireDay?'bg-red-500':''}`}>
    <div><b>Description:</b> {description} </div>
    <div><b>Status:</b> {dataInfo}</div>
    <div><b>Date:</b> {new Date(dateData).toLocaleString('en-US', { dateStyle: 'short' })}</div>
    <div><b>Duration:</b> {getDaysPassed(dateData) >=1?<>{getDaysPassed(dateData)} day</>:<>{getDaysPassed(dateData)} days</>}</div>
    <div><b></b></div>
  </div>)
  

  const dataStyle = (dataInfo) =>
  `${dataInfo == 'Waiting Approval'?'bg-green-300':'bg-blue-300'} flex h-fit flex-col shadow-md flex-wrap data-cell p-2 rounded text-left overflow-auto hover:bg-opacity-70 cursor-pointer`;

  // Function to render data based on column index
  const renderData = (data, columnIndex) => {

    switch (columnIndex) {
      case 0: //END USER COLUMN
        return !data.PR_Number ? renderKanbanData('Encoded',data.Date_Encoded,data.Description,1) : ''

      case 1: //SUPPLY COLUMN
        return data.PR_Number && !data.RFQ? renderKanbanData('PR No.', data.PR_Number_Date, data.Description, 1):
               data.RFQ && !data.Canvass? renderKanbanData('RFQ', data.RFQ_Date,data.Description, 1):
               data.Canvass && !data.Abstract? renderKanbanData('Canvass', data.Canvass_Date, data.Description, 3):
               data.Abstract && !data.PO? renderKanbanData('Abstract', data.Abstract_Date, data.Description, 1):
               data.PO && !data.Delivery? renderKanbanData('PO', data.PO_Date, data.Description, 1):
               data.Delivery && !data.IAR? renderKanbanData('Delivery', data.Delivery_Date, data.Description, 5):
               data.IAR && !data.DV? renderKanbanData('IAR', data.IAR_Date, data.Description, 1):
               data.DV && !data.OBR_1? renderKanbanData('DV',data.DV_Date, data.Description, 1):''                       
      case 2: //BUDGET COLUMN
        return data.OBR_1 && !data.OBR_2? renderKanbanData('OBR_1', data.OBR_1_Date, data.Description, 1):
               data.Controlled_OBR_3 && !data.Disbursement? renderKanbanData('Controlled_OBR_3', data.Controlled_OBR_3_Date, data.Description, 1):''
          
      case 3: //RCAO COLUMN
        return data.OBR_2 && !data.Controlled_OBR_3?  renderKanbanData('OBR_2', data.OBR_2_Date, data.Description, 1):
              !data.PR_Number ? renderKanbanData('Waiting Approval',data.Date_Encoded,data.Description,1) : ''
      case 4: //ACCOUNTING COLUMN
      return data.Disbursement && !data.Approval?  renderKanbanData('Disbursement', data.Disbursement_Date, data.Description, 1):''

      case 5: //RDO RDA COLUMN
      return data.Approval && !data.Cheque?  renderKanbanData('Approval', data.Approval_Date, data.Description, 1):
            !data.PR_Number ? renderKanbanData('Waiting Approval',data.Date_Encoded,data.Description,1) : ''

      case 6: //CASHIER COLUMN
      return  data.Cheque && !data.Cheque_Number?  renderKanbanData('Cheque', data.Cheque_Date, data.Description, 1):''

      // Add more cases as needed for each column
      default:
        return null;
    }
  };

  const handleKanBanDataClick = (data) => {

    console.log("handleKanBanDataClick data: ", data)
    setSelectedData(data);
    console.log("data.RCAO_Approved == null: ", data.RCAO_Approved == null)
    if (data.RCAO_Approved == null) {
      setShowUpdateModal(true);


    } else {
      setShowUpdateApprovalModal(true);

    }
  };
  
console.log("columns.length: ", columns.length)
  return (
    <div className='mt-36'>
      <div className={`grid grid-cols-7 overflow-auto `}>
        {columns.map((column, index) => (
          <div key={index} className={`border p-2 border-fb-3 rounded-lg shadow-md`} style={{minHeight:'150px'}}>
             <div className={`border-b-2 border-b-gray-500 text-center px-auto text-lg mb-2 text-fb-0 font-bold overflow-hidden bg-fb-4 rounded-md shadow-sm`} >{column}</div>
            {prDatas &&
              prDatas.map((data, dataIndex) => (
                <div key={dataIndex} className='mb-2 h-fit   cursor-pointer' onClick={()=> handleKanBanDataClick(data)} >
                  {renderData(data, index)}
                </div>
              ))}
          </div>
        ))}
      </div>
      <UpdateModal isOpen={showUpdateModal} isClose={()=> setShowUpdateModal(!showUpdateModal)} selectedData={selectedData}/>
      <UpdateApprovedModal isOpen={showUpdateApprovalModal} isClose={()=> setShowUpdateApprovalModal(!showUpdateApprovalModal)} selectedData={selectedData}/>
    </div>
  );
}
