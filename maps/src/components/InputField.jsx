import React, {useContext} from 'react'

import GlobalContext from "../context/globalContext.jsx";
import { Autocomplete } from '@react-google-maps/api';
import DestinationIcon from '../icons/DestinationIcon.jsx';
import OriginIcon from '../icons/OriginIcon.jsx';
import StopIcon from '../icons/StopIcon.jsx';

// const apiKey = import.meta.env.VITE_API_KEY;

const InputField = (props) => {

   const context = useContext(GlobalContext);
    const {isLoaded} = context;

    if(!isLoaded) {
      return <>Loading...</>
    }
    

  return (
    <>
    <div className='my-6 text-[#2E2E2E]'>
        <p className='font-primary mb-1'>{props.title}</p>
            <div className=''>
              {props.title === 'Origin' && <OriginIcon className='absolute my-auto ml-3 mt-3.5' />}
              {props.title === 'Stop' && <StopIcon className='absolute my-auto ml-3 mt-3.5' />}
              {props.title === 'Destination' && <DestinationIcon className='absolute my-auto ml-3 mt-3' />}
              <Autocomplete>
            <input ref={props.val} type="text" className='placeholder-[#2E2E2E] border font-primary border-gray-300 font-semibold p-2 rounded-md w-full pl-9' placeholder={`Add a ${props.title}`} />
            </Autocomplete>
            </div>

    </div>
    </>
  )
}

export default InputField