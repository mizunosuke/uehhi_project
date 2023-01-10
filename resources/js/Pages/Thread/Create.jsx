import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import HistoryBackBtn from '@/Components/HistoryBackBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Create (props) {

    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        text: "",
        port_data: props.ports,
        port_id: props.ports.id,
        thread: props.threads
    });

    // useFormの値を更新する関数
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
        console.log(data);
    };

    // 投稿ボタンの関数
    const submit = (e) => {
        e.preventDefault();
        post(route("thread.store"),data);
    };

    return (
        <>
          <Head title="スレッド投稿" />
          <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
            <div className='flex items-center'>
              <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
              <h1 className='text-3xl font-semibold'>漁港スレッド投稿</h1>
            </div>
            <div className="flex items-center mx-3">
              {props.auth.user ? (
                <>
                  {props.auth.user.name}様
                  <a href={route('mypage.index')} className="fa-3x p-2.5" src="mypage_icon"><FontAwesomeIcon icon={faCircleUser} className="text-blue-900" /></a>
                  {/* <Link href={route('mypage.index')}
                    className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-1.5">
                      マイページ
                  </Link> */}
                </>
              ) : (
                <>
                  <Link href={route('login')}
                    className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-1.5">
                    <div>ログイン</div>
                  </Link>
                  <Link href={route('register')}
                    className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-1.5">
                    新規登録
                  </Link>
                </>
              )}
            </div>
          </div>
    
          <AuthenticatedLayout auth={props.auth} errors={props.errors} header={<></>} />
    
          <h1 className='text-center text-2xl mt-10'>
            - スレッド 投稿画面 -
          </h1>
    
          {/* 投稿フォーム */}
          <form onSubmit={submit} className='flex flex-col justify-center items-center'>
              <div className='my-4'>
                <textarea name="text" type='text' placeholder='漁港の『今』をつぶやこう！'
                    cols="50" rows="3"
                    onChange={onHandleChange}
                    className='rounded-md h-48'
                    />
              </div>

              <button
                className='bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-4'
                disabled={processing}>
                投稿
              </button>
          </form>
    
          <div className='absolute top-56 left-16'>
            <HistoryBackBtn />
          </div>
        </>
      )
}