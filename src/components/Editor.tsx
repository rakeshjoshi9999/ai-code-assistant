import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState } from 'react';

const Editor = ({
    loader,
    onGenerateReview
}:{loader:boolean,onGenerateReview(code:string):void}) =>{
    const [code,setCode] = useState("");

    return <div className="h-full w-6/12 relative">
        <button disabled={loader} onClick={() => onGenerateReview(code) } className='w-max absolute bottom-3 right-3 z-50 bg-purple-500 p-2 rounded hover:bg-purple-700 text-white active:translate-y-1 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed'>Generate Review</button>
        <CodeMirror 
        minHeight="100vh" style={{
            fontSize:'18px',
            overflow:'auto'
        }} 
        theme="dark" 
        onChange={setCode} 
        value={code} 
        extensions={[javascript({ typescript: true })]}/>
    </div>
}

export default Editor;