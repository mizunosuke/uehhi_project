import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Sns(props) {

  const { data, setData, post, processing, errors, reset } = useForm({ word: "" });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
    // console.log(data);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("sns.search"));
  };
  
    return (
        <>
        <Head title="釣り人の今" />
          <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
            <div className='flex items-center'>
              <img src="#" alt="logo" className='mx-5' />
              <h1 className='text-3xl font-semibold'>釣り人の今</h1>
            </div>
            <div className="flex mx-3">
                    {props.auth.user ? (
              <Link href={route('mypage.index')}
                className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-1.5">
                  マイページ
              </Link>
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
        
        <div className="relative">
          <form onSubmit={submit} className="flex justify-center items-center my-10">
            <div className='flex items-center border-solid border-gray-400'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-3" />
              <input id="searchWord" name="word" value={data.word} type="text" placeholder='住所、魚種を入力して投稿を検索...'
                className='rounded border-gray-500 w-96' onChange={onHandleChange} />
              </div>
            <button className='bg-blue-500 rounded text-white font-medium leading-10 w-20 h-10 m-1.5' disabled={processing}>
              検索
            </button>
          </form>
          
          <Link href={route('sns.create')}
            className="absolute right-1/4 top-1 bg-blue-500 rounded-full text-lg text-white font-medium leading-10 w-8 h-8 flex justify-center items-center m-1.5">
              ＋
          </Link>
        </div>

        <div className="flex justify-center">

          <div className="flex flex-wrap w-11/12 box-border">

            <div className="w-1/4 p-2.5">
              <div className="border">
                <div>
                  <img src="#" alt="image" />
                  <img src="#" alt="icon" />
                  <p>アカウント名</p>
                </div>
                <h2>魚種</h2>
                <p>場所</p>
                <p>日付</p>
                <p>本文</p>
                <div className="flex">
                  <img src="#" alt="like" />
                  <p>13</p>
                </div>
              </div>
            </div>

            <div className="w-1/4 p-2.5">
              <div className="border">
                <div>
                  <img src="#" alt="image" />
                  <img src="#" alt="icon" />
                  <p>アカウント名</p>
                </div>
                <h2>魚種</h2>
                <p>場所</p>
                <p>日付</p>
                <p>本文</p>
                <div className="flex">
                  <img src="#" alt="like" />
                  <p>13</p>
                </div>
              </div>
            </div>

            <div className="w-1/4 p-2.5">
              <div className="border">
                <div>
                  <img src="#" alt="image" />
                  <img src="#" alt="icon" />
                  <p>アカウント名</p>
                </div>
                <h2>魚種</h2>
                <p>場所</p>
                <p>日付</p>
                <p>本文</p>
                <div className="flex">
                  <img src="#" alt="like" />
                  <p>13</p>
                </div>
              </div>
            </div>

            <div className="w-1/4 p-2.5">
              <div className="border">
                <div>
                  <img src="#" alt="image" />
                  <img src="#" alt="icon" />
                  <p>アカウント名</p>
                </div>
                <h2>魚種</h2>
                <p>場所</p>
                <p>日付</p>
                <p>本文</p>
                <div className="flex">
                  <img src="#" alt="like" />
                  <p>13</p>
                </div>
              </div>
            </div>

          </div>

        </div>
        </>
    );
}
