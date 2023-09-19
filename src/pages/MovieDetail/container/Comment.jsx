import React, { useEffect, useRef, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../api/axios'
import { addNewComment, setComments } from '../../../reducers/comments_slice'
import { convertISOToDuration } from '../../../services/momentjs'

export default function Comment({ movieId }) {
    const [comments, setComments] = useState([])
    const { username } = useSelector(state => state.auth)
    const textRef = useRef()

    const handlePostComment = async () => {
        if(textRef.current.value.trim() === ''){
            return
        }
        setComments(state => [...state, { username, text: textRef.current.value, movieId }])

        try {
            const response = await axios.post(`http://localhost:3000/comment`,
                JSON.stringify({ username, comment: textRef.current.value, movieId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (response.data.success) {
                textRef.current.value = ''

            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const getAllComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/comment/${movieId}`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                )
                setComments(response?.data?.results)
                // if (response?.data?.error) {
                //     return setErrMsg(response.data.error)
                // }
            } catch (error) {
                console.log(error)
            }
        }
        getAllComments()

    }, [])

    return (
        <div className=' mt-5 self-start'>

            <p className='text-primary text-xl  mb-4'> {comments.length} comment{comments.length > 1 && 's'} </p>
            <div className='w-full ' >
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <BiUserCircle className='text-white/80' size={40} />
                        <p className='text-md text-white/80 '> {username} </p>
                    </div>
                    <textarea ref={textRef} className='h-[100px] min-w-[500px] outline-none resize-none text-white/80 bg-bgSsidebar p-4' placeholder='comment'></textarea>
                </div>
                <button onClick={handlePostComment} className='outline-none border-none mt-5 bg-primary hover:bg-primary_hover text-white self-center py-2 px-4 rounded-sm'>Comment</button>
            </div>
            {console.log(comments)}
            {movieId &&
                comments.map((comment, i) => (
                    <div key={comment.username + i} className='mt-10' >
                        <div className='flex gap-2 items-center'>
                            <BiUserCircle className='text-white/80' size={40} />
                            <p className='text-md text-white/80 '> {comment.username} </p>
                            <span className='text-sm text-primaryText'> {convertISOToDuration(comment.date)} </span>
                        </div>

                        <p className='p-5 self-start bg-gray-400 text-black/80 mt-4 commentText'>
                            {comment.text}
                        </p>
                    </div>
                ))
            }

        </div>
    )
}
