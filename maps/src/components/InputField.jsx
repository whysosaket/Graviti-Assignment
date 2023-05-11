import React, {useContext} from 'react'

import GlobalContext from "../context/globalContext.jsx";
import { Autocomplete } from '@react-google-maps/api';

// const apiKey = import.meta.env.VITE_API_KEY;

const InputField = (props) => {

   const context = useContext(GlobalContext);
    const {isLoaded} = context;

    if(!isLoaded) {
      return <>Loading...</>
    }

    

  return (
    <>
    <div className='my-6'>
        <p className='text-gray-500'>{props.title}</p>
        <Autocomplete>
            <input ref={props.val} type="text" className='border border-gray-300 font-semibold p-2 rounded-sm w-full' placeholder={`Add a ${props.title}`} />
        </Autocomplete>
    </div>
    </>
  )
}

export default InputField