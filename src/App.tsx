

import { useState } from 'react'
import './App.css'
import Editor from './components/Editor'
import Review from './components/review'
import Header from './components/header';

function App() {
  const [loader,setLoader] = useState<'idle' | 'loading' | 'loaded'>("idle");
  const [review,setReview] = useState(`#### Review
                                        Add code and click on Generate Review to generate review
    `);
  const isLoading = loader === 'loading';
  const handleGenerateReview = async(code:string) =>{
    try{
      setLoader("loading")
      const response = await fetch('http://localhost:3000/api/v1/reviews',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        model: 'codellama:7b',
        code
      })
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
    <div className="section">
      <div className="header">
        <Header />
      </div>
      <div className="h-full w-full flex overflow-hidden">
          <Editor loader={isLoading} onGenerateReview={handleGenerateReview} />
          <Review loader={isLoading} review={review}/>
      </div>
    </div>
    </>
  )
}

export default App
