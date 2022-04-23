/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
// import { ImSad } from 'react-icons/im';
import {VscError} from 'react-icons/vsc';

const ModalNotifError = ({ message,showModal}) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   useEffect(() => {
      console.log(message);
      if (showModal==true) {
         setShow(true);
      }
   });
   return (
      <>
         <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" className='modal' centered>
            <Modal.Header className='modal-custom-header' closeButton />
            <Modal.Body className='py-5 modal-custom-body'>
               <div className='text-center'>
                  <VscError size={100} className='modal-icon'/>
                  <div className='fs-1 pps fw-bold text-pallet-1'>Error</div>
                  <div className='fs-4 pps  text-pallet-1'>{message}</div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ModalNotifError;