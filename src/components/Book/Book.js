import React, { useEffect, useState } from "react";
import {
  HiPlusCircle,
  HiMinusCircle,
  HiCheckCircle
} from 'react-icons/hi';
import { AiOutlineFileDone } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { addToFinishedList, addToReadingList, removeFromReadingList } from "../../Redux/Actions/BookActions";
import styles from './book.module.css'
const SingleBook = ({ book, useFor }) => {
  const { title, author, coverImageUrl, synopsis } = book;
  const dispatch = useDispatch();
  const [isCliked, setIsClicked] = useState(false);
  const [isFinised, setIsFinished] = useState(false);
  const [existed, setExisted] = useState(false)

  const finishedbooks = useSelector((state) => {
    return state.books.finishedList;
  })
  useEffect(() => {
    const checkOnFinished = () => {
      const existed = finishedbooks.find(data => data === book);
      if (existed) {
        setExisted(true);
      }
    }
    checkOnFinished();
  })
  return (
    <div className='card d-flex mb-3 p-3'
      style={{ position: 'relative' }}
    >
      <Toaster />
      <div className='row'>
        <div className='col-md-3'>
          <img className="img-fluid" src={coverImageUrl} alt='' />
        </div>
        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6>{author}</h6>
            <p className='card-text'>{synopsis.slice(0, 500)} ...</p>
          </div>
        </div>
      </div>
      {useFor !== 'finished' &&
        <div className={styles.control_icons} >

          {useFor === 'discover' && !existed &&
            <>
              {isCliked ?
                <HiMinusCircle onClick={() => {
                  dispatch(removeFromReadingList(book));
                  setIsClicked(false);
                  toast.success('Removed from reading list')
                }}
                  title="Remove from list"
                  className={styles.minus_icon} />
                :
                <HiPlusCircle onClick={() => {
                  dispatch(addToReadingList(book));
                  setIsClicked(true);
                  toast.success('Added to reading list')
                }} title="Add to Reading" className={styles.plus_icon} />
              }
            </>
          }
          {existed &&
            <AiOutlineFileDone
              title="You have Finished"
              onClick={() => toast.error("You have already finished the book")}
              className={styles.check_icon} />
          }

          {!isFinised &&

            <HiCheckCircle
              onClick={() => {
                dispatch(addToFinishedList(book))
                setIsFinished(true);
                toast.success('Successfully Finised the book!');
              }}
              title="Mark as Finish"
              className={styles.check_icon} />
          }
        </div>
      }
    </div>
  );
};

export default SingleBook;
