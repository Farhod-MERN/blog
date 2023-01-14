import React, {useRef, useState, useEffect} from 'react';

import { submitComment } from '../services';

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  const handleCommentSubmission = () => {
    setError(false)

    const {value: comment} = commentEl.current
    const {value: name} = nameEl.current
    const {value: email} = emailEl.current
    const {checked: storeData} = storeDataEl.current

    if(!name || !comment || !email) {
      setError(true)
      return
    }

    const commentsObj = {name, email, comment, slug}

    if(storeData) {
      window.localStorage.setItem("name", name)
      window.localStorage.setItem("email", email)
    }else {
      window.localStorage.removeItem("name")
      window.localStorage.removeItem("email")
    }

    submitComment(commentsObj)
      .then(res => {
        setShowSuccessMessage(true)
        
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 5000)
      })
  }
  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 relative'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comments</h3>
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <textarea 
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Comments'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4'>
        <input 
          type="text" 
          ref={nameEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'  
          placeholder='Name'
          name='name'
        />
        <input 
          type="email"
          ref={emailEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'  
          placeholder='Email'
          name="email"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div>
          <input type="checkbox" id='storeData' name="storeData" value="true" ref={storeDataEl} />
          <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button 
          onClick={handleCommentSubmission}
          type='button' 
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'
          >Post Comment</button>
        {showSuccessMessage && <div className='absolute bg-gray-100  flex align-middle justify-center h-5/6 w-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tr' >
              <span className='bg-transparent font-normal text-base absolute top-4 right-4 cursor-pointer' onClick={()=>{setShowSuccessMessage((prev)=>{!prev})}}>❌</span>
              <span className='font-semibold my-auto text-green-500 text-base'>Comment submitted for review</span>
          </div>}
      </div>
    </div>
  )
};

export default CommentsForm;
