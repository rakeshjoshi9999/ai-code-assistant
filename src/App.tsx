

import { useState } from 'react'
import './App.css'
import Editor from './components/Editor'
import Review from './components/review'
function App() {
  const [loader,setLoader] = useState<'idle' | 'loading' | 'loaded'>("idle");
  const [review,setReview] = useState('# Code Review Here');
  const isLoading = loader === 'loading';
  const handleGenerateReview = async(code:string) =>{
    try{
      setLoader("loading")
      const response = await fetch('http://localhost:3000/api/v1/reviews',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({code})
    });
    const data = await response.json();
    setReview(data.review);
    } catch(err){
      alert("something went wrong");
      console.log(err)
    }
    setLoader("loaded");
  }

  return (
    <>
      <h1 className="h-full w-full flex overflow-hidden">
          <Editor loader={isLoading} onGenerateReview={handleGenerateReview} />
          <Review loader={isLoading} review={review}/>
      </h1>
    </>
  )
}

export default App
