/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';
import {RiErrorWarningFill} from 'react-icons/ri';

const ModalConfitmation = ({title,message,show,close,button,functionHandle}) => {

   return (
      <>
         <Modal show={show} onHide={close} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='modal-custom-header' closeButton >
               <Modal.Title>{title}</Modal.Title></Modal.Header>
            <Modal.Body className="modal-custom-body">
               <div className='text-center'>
                  <div>
                     <RiErrorWarningFill size={100} className='modal-icon'/>
                  </div>
                  <div className='fs-1 pps fw-bold text-pallet-1'>Are you sure?</div>
                  <div className='fs-4 pps  text-pallet-1'>{message}</div>
               </div>
            </Modal.Body>
            <Modal.Footer className="modal-custom-body">
               <Button btnVarian={'button-delete-item'} onClick={close}>Close</Button>
               <Button btnVarian={'button-filled fw-bold'} onClick={functionHandle}>{button}</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalConfitmation;