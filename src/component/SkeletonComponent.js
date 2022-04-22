/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonComponent = ({children,count,...rest}) => {
   return (
      <Skeleton height={230} containerClassName='row' count={count} className='style-skeleton' wrapper={({children})=>(<div className='col-sm-6 col-md-4 col-lg-3 mb-4'>{children}</div>)}/>
   );
};

export default SkeletonComponent;
