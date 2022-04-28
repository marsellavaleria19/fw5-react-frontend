/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';

const ModalInput = ({title,children,show,close}) => {
   useEffect(()=>{
      console.log('masuk modal input!!');
   },[]);

   return (
      <>
         <Modal show={show} onHide={close} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='modal-custom-header' closeButton >
               <Modal.Title>{title}</Modal.Title></Modal.Header>
            <Modal.Body className="modal-custom-body">
               <div className='text-center'>
                  {children}
               </div>
            </Modal.Body>
            <Modal.Footer className="modal-custom-body">
               <Button btnVarian={'button-delete-item'}>Close</Button>
               <Button btnVarian={'button-filled fw-bold'}>Save changes</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalInput;