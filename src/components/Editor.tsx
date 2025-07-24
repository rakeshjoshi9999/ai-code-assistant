import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React from 'react';

const Editor = () =>{
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
    return <div className="h-full w-6/12 relative">
        <CodeMirror 
        minHeight="100vh" style={{
            fontSize:'18px'
        }} 
        theme="dark" 
        onChange={onChange} 
        value={value} 
        extensions={[javascript({ typescript: true })]}/>
    </div>
}

export default Editor;