import Editor from './EditorComponent';
import { useState } from 'react';

const NoticeWriteComponent = () => {
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }
    
    return (
        <div>
          <Editor value={desc} onChange={onEditorChange} />
        </div>
    )
};

export default NoticeWriteComponent;