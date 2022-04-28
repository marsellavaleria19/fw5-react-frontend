/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { BiCheckCircle } from 'react-icons/bi';

const ModalNotifSuccess = ({message,show,close}) => {
   // const [show,setShow] = useState(showModal);
   // const handleClose = ()=> setShow(false);
   // useEffect(()=>{
   //    console.log('masuk!!');
   //    if(showModal==true){
   //       setShow(true);
   //    }
   // });
   return (
      <>
         <Modal show={show} onHide={close} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='modal-custom-header' closeButton />
            <Modal.Body className='py-5 modal-custom-body'>
               <div className='text-center'>
                  <BiCheckCircle size={100} className='modal-icon'/>
                  <div className='fs-1 pps fw-bold text-pallet-1'>Success</div>
                  <div className='fs-4 pps  text-pallet-1'>{message}</div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ModalNotifSuccess;