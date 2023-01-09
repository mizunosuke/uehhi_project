import { Link, Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faCircleUser } from "@fortawesome/free-solid-svg-icons";


export default function Mypage(props) {
    console.log(props.blog);
    
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
                            <Link href={route('profile.edit')}
                                className="rounded-3xl text-base text-white border bg-gray-400 font-medium leading-10 text-center w-36 px-3 flex justify-center items-center m-1.5">
                                <div>アカウント編集</div>
                            </Link>
                            <Link method='post' href={route('logout')}
                                className="bg-gray-400 text-base text-white w-36 text-center px-5 py-2 mr-4 rounded-3xl" >
                                ログアウト
                            </Link>
                            {props.auth.user.name} 様
                            <a href={route('mypage.index')} className="fa-3x p-2.5" src="mypage_icon"><FontAwesomeIcon icon={faCircleUser} className="text-blue-900" /></a>
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

            <div>
                <div className='flex flex-col justify-center items-center mt-14 '>
                    {/* アイコンが登録されていれば登録されたアイコン表示 なければデフォルトのアイコン表示 */}
                    {!props.auth.user.icon ? (
                        <>
                            <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 text-9xl mb-12" />
                        </>
                    ) : (
                        <>
                            <img src={props.auth.user.icon} alt="icon" className="w-44 h-44 border border-gray-500 rounded-full object-cover mb-12" />
                        </>
                    )}
                    <p className='text-3xl mb-5'>ユーザー名：{props.auth.user.name}</p>
                    {!props.auth.user.introduction ? (
                        <></>
                    ) : (
                            <>
                                <p className='mb-2'>{props.auth.user.introduction}</p>
                            </>
                    )}
                    
                    <div className="flex flex-col items-center w-10/12">
                        {/* map で３件表示する */}
                        <div className="flex justify-center w-full">
                            <div id="displayItem" className="flex justify-center w-11/12 box-border">
                                {props.sns.map((x) => {
                                    const created = x.created_at;
                                    const created1 = created.slice(0, -8);
                                    const createdAt = created1.replace('T', ' ')
                                    return (
                                    // console.log('hoge');
                                    // const element = document.getElementById('displayItem');
                                    // element.innerHTML = htmlElements;
                                        <div className="w-1/3 p-2.5">
                                            <div className="border rounded-md">
                                            <div className="p-2 relative">
                                                <img src={x.image} alt="image" className="p-2 w-full h-60 object-cover rounded-md border" />
                                                <div className="flex items-center absolute bottom-6 left-8">
                                                {!x.user.icon ? (
                                                    <>
                                                    <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 mr-3 text-4xl" />
                                                    </>
                                                ) : (
                                                    <>
                                                    <img src={x.user.icon} alt="icon" className="mr-3 rounded-full w-12 h-12" />
                                                    </>
                                                )}
                                                {/* Userモデルとrelationさせてusernameを表示させるのに参考になった記事
                                                https://blog.capilano-fw.com/?p=10909#i-9 */}
                                                <p className="text-white bg-gray-600 rounded-md px-2 bg-opacity-70">{x.user.name}</p>
                                                </div>
                                            </div>
                                            <h2 className="text-center text-xl">{x.kind}</h2>
                                            <div className="flex justify-center items-center">
                                                <FontAwesomeIcon icon={faComment} />
                                                <p>{x.content}</p>
                                            </div>
                                            <div className="flex justify-center mr-3 my-2">
                                                <table className="text-gray-500">
                                                <tbody>
                                                    <tr>
                                                    <td>地域：</td>
                                                    <td>{x.prefecture} {x.area}</td>
                                                    </tr>
                                                    <tr>
                                                    <td>釣った日：</td>
                                                    <td>{x.date}</td>
                                                    </tr>
                                                    <tr>
                                                    <td>投稿日：</td>
                                                    <td>{createdAt}</td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </div>
                                            {props.auth.user ? (
                                                <>
                                                <div className="flex justify-end items-center my-2 mx-3">
                                                    <FontAwesomeIcon icon={faHeart} className="text-red-500 cursor-pointer mr-1" />
                                                    <p>13</p>
                                                </div>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Link href={route('mypage.sns')}
                            className="rounded-lg text-lg text-white border bg-blue-400 font-medium leading-10 w-40 px-3 flex justify-center items-center m-1.5">
                            <div>釣り人の今 一覧</div>
                        </Link>

                        <div>
                            {/* map でブログを３件表示する */}
                            <Link href={route('mypage.blog')}
                                className="rounded-lg text-lg text-white border bg-blue-400 font-medium leading-10 w-40 px-3 flex justify-center items-center m-1.5">
                                <div>釣果日記 一覧</div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}