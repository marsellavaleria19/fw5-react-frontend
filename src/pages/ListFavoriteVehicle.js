/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import Layout from '../component/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getListFavoriteVehicle } from '../redux/actions/vehicle';
import { getListVehicleByMonth } from '../redux/actions/vehicle';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {Animated} from 'react-animated-css';
import Button from '../component/Button';
import NotFound from '../component/NotFound';
import moment from 'moment';
import ModalConfitmation from '../component/ModalConfirmation';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import ModalNotifError from '../component/ModalNotifError';
import ModalLoading from '../component/ModalLoading';
import PrivateRouter from '../routers/PrivateRouter';
import ListVehicleComponent from '../component/ListVehicleComponent';
import photoImage from '../assets/images/image-photo.png';

export const ListFavoriteVehicle  = ()=> {
   const {history,vehicle,auth,category,status} = useSelector(state=>state);
   const [searchParams,setSearchParams] = useSearchParams();
   const [isDelete,setIsDelete] = useState();
   const {id} = useParams();
   const [control,setControl] = useState(false);
   const dispatch = useDispatch();
   const [show,setShow] = useState(-1);
   const [filledParams,setFilledParams] = useState(['category_id','status_id','date']);
   const [dataSearch,setDataSearch] = useState({});
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const [showModal,setShowModal] = useState(false);
   const handleShowModal = ()=>setShowModal(true);
   const handleCloseModal = ()=>setShowModal(false);
   
   useEffect(()=>{
      dispatch(getListFavoriteVehicle());
   },[]);

   //handle  show success modal
   useEffect(()=>{
      setShowModal(false);
      setShowModalLoading(history.isLoading);
     
      if(history.isLoading==false && control==true){
         if(history.isError){
            messageError = history.errMessage;
            setMessageError(messageError);
            setShowModalError(true);
         }else{
            messageSuccess = history.message;
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
         }
         setControl(false);
      }
   },[history.isLoading]);

   //handle show success modal after close
   useEffect(()=>{
      if(showModalSuccess==false || showModalError==false){
         window.scrollTo(0,0);
      }
   },[showModalSuccess,showModalError]);
   
   // const handleSearch = (event)=>{
   //    event.preventDefault();
   //    dataSearch['search'] = event.target.elements['search'].value;
   //    setSearchParams(dataSearch);
   //    handleSearchFilter(dataSearch);
   // };

   // const handleFillter = (event)=>{
   //    event.preventDefault();
   //    filledParams.forEach((item)=>{
   //       if(event.target.elements[item].value){
   //          dataSearch[item] = event.target.elements[item].value;
   //       }
   //    });
   //    handleSearchFilter(dataSearch);
   // };

   // const handleSearchFilter = (dataSearch)=>{
   //    setSearchParams(dataSearch);
   //    if(auth.user.role=='admin'){
   //       dispatch(getListHistoryFilter(dataSearch));
   //    }else{
   //       dispatch(getListHistoryFilterByUserId(dataSearch,auth.user.id,auth.token));
   //    }
   //    setControl(true);
   // };

   // const handleReset = (event)=>{
   //    event.preventDefault();
   //    document.getElementById('form-search').reset();
   //    document.getElementById('form-filter').reset();
   //    setSearchParams({});
   //    setDataSearch({});
   //    if(auth.user.role=='admin'){
   //       dispatch(getListHistoryFilter(dataSearch,auth.token));
   //    }else{
   //       dispatch(getListHistoryFilterByUserId('',auth.user.id,auth.token));
   //    }
   // };

   //  const handleFillter = (event)=>{
   //     event.preventDefault();
   //     const search = event.target.elements['search'].value
   //     const token = window.localStorage.getItem("token")
   //     //   filledForms.forEach((item)=>{
   //     //     if(event.target.elements[item].value){
   //     //         dataSearch[item] = event.target.elements[item].value
   //     //     }
   //     // })
   //     setSearchParams({name:search})
   //     dispatch(getListFilterHistory(token,search))
   // }

   // const handleDelete = (id)=>{
   //    console.log(id);
   //    dispatch(deleteHistory(auth.token,id));
   //    if(auth.user.role=='admin'){
   //       dispatch(getListHistory(auth.token));
   //    }else{
   //       dispatch(getListHistoryByUserId(auth.token,auth.user.id));
   //    }
   //    setControl(true);
   // };
    
   const handleButton = (i) =>{
      setShow(i);
   };

      
   const handleButtonLeave = () =>{
      setShow(-1);
   };

   return (
      <Layout>
         <section className="popular-town">
            <div className="container">
               <div className="row text-center">
                  {
                     history.isLoading ? 
                        <ModalLoading showModal={history.isLoading}/> :
                        vehicle.listFavoriteVehicle.length>0 ? vehicle.listFavoriteVehicle.filter((item)=>item.id==auth.user.id).map((item,i)=>{
                           return(
                              <ListVehicleComponent key={item.item.id} name={item.item.name} location={item.item.location} photo={item.item.photo!==null ? item.item.photo : photoImage}/>
                               
                           );
                        }) :
                           <NotFound/>
                  }
               </div>
            </div>
         </section>
      </Layout>
   );
};

export default ListFavoriteVehicle;
