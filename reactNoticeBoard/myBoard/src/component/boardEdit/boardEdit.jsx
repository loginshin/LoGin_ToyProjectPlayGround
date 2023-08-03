import React from 'react';
import './boardEdit.css';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default function BoardEdit() {
    const [total, setTotal] = useState({
        title:'',
        content:''
    })

    const getValue = e => {
        const {name, value} = e.target;
        setTotal({
            ...total,
            [name]: value
        })
        console.log(total);
    }

    return(
        <div className='App'>
            <div className='form-wrapper'>
                <label>제목</label><br></br>
                <input className='title-input' type='text' placeholder='제목' onChange={getValue} name ='title' />
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setTotal({
                            ...total,
                            content: data
                        })
                        console.log(total);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <button className='submit-button' onClick={() => {
               axios.post("http://192.168.2.72:8080/setContent", {
                "title":total.title,
                "content":total.content,
                "userId":"testID123"
               },
               { withCredintials: true}
               )
               .then(res => {
                alert("작성되었습니다");
               })
            }}>작성</button>
        </div>
    )
};