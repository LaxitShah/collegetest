import React, { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { MdCancelPresentation } from 'react-icons/md';
import { Form } from 'react-bootstrap';

function Notice(props) {
    const {
        deleteNotice,
        editNotice,
        _id,
        description,
        noticeLink,
        isAdmin
    } = props
    
    const [isEditNotice, setEditNotice] = useState(false);
    const [formDescription, setDescription] = useState(description);
    
    return (
        <div>
            {isEditNotice ? (
                <div className='row mt-2' style={{ fontFamily: "'Montserrat', 'sans-serif'" }}>
                    <span className='col-10 mt-2' style={{ fontFamily: "'Montserrat', 'sans-serif'" }}>
                        <div>
                            <input
                                value={formDescription}
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {noticeLink && noticeLink !== undefined && noticeLink !== "" && (
                            <a href={noticeLink} target='_blank'>
                                Click here
                            </a>
                        )}
                    </span>
                    {isAdmin && (
                        <span className='col-2 ms-auto' style={{ fontFamily:"'Montserrat', 'sans-serif'" }}>
                            <FaSave
                                type='submit'
                                cursor="pointer"
                                onClick={() => {
                                    setEditNotice(false);
                                    editNotice(_id, formDescription);
                                }}
                            />
                            <MdCancelPresentation
                                cursor="pointer"
                                onClick={() => {
                                    setDescription(description);
                                    setEditNotice(false);
                                }}
                                className='ms-1'
                            />
                        </span>
                    )}
                </div>
            ) : (
                <span className='row' style={{ fontFamily: "'Poppins', sans-serif'"}}>
                    <span className='col-12 ' style={{ fontFamily: "'Poppins', sans-serif",fontWeight:"400",fontSize:"14.5px" }}>
                        {description}
                        {noticeLink && noticeLink !== undefined && noticeLink !== "" && (
                            <a href={noticeLink} target='_blank'>
                                Click here
                            </a>
                        )}
                    </span>
                    {isAdmin && (
                        <span className='col-12' style={{ fontFamily: "'Poppins', sans-serif",fontWeight:"400",fontSize:"14.5px" }}>
                            <FaEdit cursor="pointer" onClick={() => setEditNotice(true)} className='' />
                            <AiFillDelete cursor="pointer" onClick={() => deleteNotice(_id)} className='ms-2' />
                        </span>
                    )}
                </span>
            )}
        </div>
    );
}

export default Notice;
