import { Link, Head, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Mypage(props) {
    
    return (
        <div>
            <Head title="Mypage" />

            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                    <h1 className='text-3xl font-semibold'>マイページ</h1>
                </div>
                <div className="flex items-center mx-2">
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

            {/* ナビゲーションバー */}
            <div>
                <AuthenticatedLayout
                    header={
                        <div className='header_container'>
                            <h1 className="font-semibold text-xl text-gray-800 leading-tight">HOME</h1>
                        </div>
                    }
                >
                    <Head title="HOME" />
                </AuthenticatedLayout>
            </div>

            {/* アイコン画像表示 */}
            <div>
                <div className='flex flex-col justify-center items-center'>
                    {/* アイコンが登録されていれば登録されたアイコン表示 なければデフォルトのアイコン表示 */}
                    {!props.auth.user.icon ? (
                        <>
                            <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 mr-3 text-9xl" />
                        </>
                    ) : (
                        <>
                            <img src={props.auth.user.icon} alt="icon" className="mr-3" />
                        </>
                    )}
                    <p>ユーザー名：{props.auth.user.name}</p>
                    <p className='text-center'>ああああああ</p>
                    {!props.auth.user.introduction ? (
                        <>
                        <p>{ props.auth.user.introduction }</p>
                        </>
                    ) : (
                            <></>
                    )}
                <Link href={route('profile.edit')}
                    className="rounded-lg text-lg text-white border bg-gray-400 font-medium leading-10 w-40 px-3 flex justify-center items-center m-1.5">
                    <div>アカウント編集</div>
                </Link>
                </div>
            </div>

        </div>
    )
}