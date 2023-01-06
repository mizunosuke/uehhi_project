import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HistoryBackBtn = () => {
  // 一覧画面に戻るボタンの関数
  const back = (e) => {
    history.back();
  }
    
  return (
    <>
      {/* 一覧画面に戻るボタン */}
      <button
        className='
        bg-blue-500
        rounded-md
        py-2
        px-4
        '
        type='button'
        onClick={back} >
        <FontAwesomeIcon icon={faArrowLeft}
          className="bg-blue-500 text-white" />
      </button>
    </>
  )
}

export default HistoryBackBtn