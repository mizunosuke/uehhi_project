import { Link, Head, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

export default function Community(props) {
    return (
        <div>
            <Head title="Community" />

            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                    <h1 className='text-3xl font-semibold'>コミュニティ</h1>
                </div>
                <div className="mx-2">
                    {props.auth.user ? (
                        <>
                            {props.auth.user.name}様
                            <a href={route('mypage.index')} className="fa-3x p-2.5" src="mypage_icon"><FontAwesomeIcon icon={faCircleUser} /></a>
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
        </div>
    )
}