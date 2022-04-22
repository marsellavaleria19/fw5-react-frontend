/* eslint-disable react/prop-types */
import React from 'react';
// import { ImSad } from 'react-icons/im';

const ModalNotifError = ({ message,id }) => {
   // const [show, setShow] = useState(false);
   // const handleClose = () => setShow(false);
   // useEffect(() => {
   //    console.log(message);
   //    if (message) {
   //       setShow(true);
   //    } else {
   //       setShow(false);
   //    }
   // }, [message]);
   return (
      <>
         {
            id=='errorModal' && <div className="modal fade" id="errorModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Error</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        {message}
                     </div>
                  </div>
               </div>
            </div>
         }
         
      </>
   );
};

export default ModalNotifError;