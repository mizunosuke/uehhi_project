import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Create(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    content: "",
    image: "",
    kind: "",
    prefecture: "",
    area: "",
    date: "",
  });

  useEffect(() => {
    setData('date', data.image.lastModifiedDate);
  }, [data.image])

  // useFormの値を更新する関数
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
    console.log(data);
  };

  // 投稿ボタンの関数
  const submit = (e) => {
    e.preventDefault();
    console.log(data.image.lastModified);
    // setData('date', data.image.lastModifiedDate);
    post(route("sns.store"));
  };

  // 一覧画面に戻るボタンの関数
  const back = (e) => {
    history.back();
  }

  // 画像選択時にプレビューさせる機能
  // https://tektektech.com/laravel-view-image-at-public/#i-2
  // https://blog.capilano-fw.com/?p=10887#i
  const [imageData, setImageData] = useState('');
  const handleFileChange = e => { // 画像が選択された <input>タグのonChange属性
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = e => {
                const imageData = e.target.result;
                setImageData(imageData);
            }
            reader.readAsDataURL(file);
        } else {
          setImageData('');
          setData('date', '');
        }
    // console.log(imageData);
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

      <h1 className='text-center text-2xl mt-10'>
        - 投稿画面 -
      </h1>

      {/* 投稿フォーム */}
      <form onSubmit={submit} 
        className='flex flex-col justify-center items-center'
        encType="multipart/form-data"
      >
          {/* 条件分岐でファイルが選択されていれば選択されているファイルを表示、なければデフォルトの画像を表示 */}
        <label htmlFor="image" className='w-2/5 h-2/5 flex justify-center border border-gray-400 rounded-md p-2 mt-5'>
          <img
            src={imageData === '' ? '/images/sns/default.png' : imageData}
            alt="image"
            className='w-full h-full object-cover cursor-pointer rounded-md'
          />
        </label>

        <label
          className='bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded cursor-pointer mb-5 mt-3'
          htmlFor="image">
          画像を選択してください
        </label>
        <input
          type="file"
          name='image'
          id='image'
          accept='.png,.jpeg,.jpg,.svg,.gif'
          hidden
          onChange={(e) => {
            handleFileChange(e);
            setData('image', e.target.files[0]);
          }}
        />
        
        <textarea name="content" type='text' placeholder='今なにしてる？...'
          cols="50" rows="3"
          onChange={onHandleChange}
          className='rounded-md'
        />
        
        <div className="flex items-center m-5">
          <label htmlFor="kind">釣った魚種： </label>
          <input
            type="text"
            name="kind"
            id='kind'
            placeholder='例:アジ,カサゴ...'
            onChange={onHandleChange}
            className='rounded-md'
          />
        </div>
        
        <button
          className='bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-4'
          disabled={processing}>
          投稿
        </button>
      </form>

      {/* 一覧画面に戻るボタン */}
      <button
        className='bg-blue-500 rounded-md py-2 px-4 absolute top-56 left-16' type='button' onClick={back} >
        <FontAwesomeIcon icon={faArrowLeft} className="bg-blue-500 text-white" />
      </button>
    </>
  )
}