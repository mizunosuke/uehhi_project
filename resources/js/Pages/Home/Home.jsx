import { Link, Head, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

// トップに戻るbuttonのcss
const returnTopButton = {
    position: "fixed",
    bottom: "50px",
    right: "60px",
};

export default function Home(props) {
    // console.log(props);
    return (
        <>
            <div>
                <Head title="Home" />

                {/* Header(ログイン時と非ログイン時で条件分岐) */}
                <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                    <div className='flex items-center'>
                        <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                        <h1 className='text-3xl font-semibold'>HOME</h1>
                    </div>
                    <div className="flex items-center mx-2">
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

                {/* TOPへスクロールで戻るボタン */}
                <div style={returnTopButton}>
                    <a href="#" src=""><FontAwesomeIcon icon={faCircleUp} /></a>
                </div>

                {/* TOP画像 */}
                <div className="top_img">
                    <img src="/images/home/fishing2.jpg" alt="TOP画像" style={{ width: "80%" }} />
                </div>

                {/* 概要 */}
                <div>
                    <h2 className="menu">このサイトでできること</h2>
                    <div className="all_box">
                        <div className="box">
                            <img src="/images/home/seach1.png" className="p-6" alt="調べる画像" />
                            <h1>釣り場が簡単に調べられる</h1>
                            <p></p>
                        </div>
                        <div className="box">
                            <img src="/images/home/network.png" className="p-6" alt="繋がる画像" />
                            <p className="item-center">釣り好き同士で繋がれる</p>
                        </div>
                        <div className="box">
                            <img src="/images/home/fishing_man.png" className="p-6" alt="釣り画像" />
                            <p>釣り場のタイムリーな情報を知ることができる</p>
                        </div>
                    </div>
                </div>

                {/* 釣行日記 */}
                <div>
                    <h2 className="menu">釣行日記</h2>
                    <div className="post_top3">最新の投稿を３つ並べる</div>
                    <Link href={route('blog.index')}>
                        <div className='more_button'>
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">MORE</button>
                        </div>
                    </Link>
                </div>

                {/* 釣り人の今 */}
                <div>
                    <h2 className="menu">釣り人の今</h2>
                    <div className="post_top3">最新の投稿を３つ並べる</div>
                    <Link href={route('sns.index')}>
                        <div className='more_button'>
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">MORE</button>
                        </div>
                    </Link>
                </div>

                {/* 釣り場検索 */}
                <div>
                    <h2 className="menu">釣り場検索</h2>
                    <div className="flex">
                        <div className="flex mt-4">
                            <div className="region">
                                <p><a type='button' href={route('search.index')}>北海道</a></p>
                                <p><a type='button' href={route('search.index')}>東北</a></p>
                                <p><a type='button' href={route('search.index')}>関東</a></p>
                                <p><a type='button' href={route('search.index')}>甲信越</a></p>
                                <p><a type='button' href={route('search.index')}>東海</a></p>
                                <p><a type='button' href={route('search.index')}>北陸</a></p>
                                <p><a type='button' href={route('search.index')}>近畿</a></p>
                                <p><a type='button' href={route('search.index')}>中国</a></p>
                                <p><a type='button' href={route('search.index')}>四国</a></p>
                                <p><a type='button' href={route('search.index')}>九州</a></p>
                                <p><a type='button' href={route('search.index')}>沖縄</a></p>
                            </div>
                            <div className="prefecture">
                                <p><Link className="m-2.5">北海道</Link></p>
                                <p><Link className="m-2.5">青森</Link><Link className="m-2.5">岩手</Link><Link className="m-2.5">宮城</Link><Link className="m-2.5">秋田</Link><Link className="m-2.5">山形</Link><Link className="m-2.5">福島</Link></p>
                                <p><Link className="m-2.5">茨城</Link><Link className="m-2.5">栃木</Link><Link className="m-2.5">群馬</Link><Link className="m-2.5">埼玉</Link><Link className="m-2.5">千葉</Link><Link className="m-2.5">東京</Link><Link className="m-2.5">神奈川</Link></p>
                                <p><Link className="m-2.5">新潟</Link><Link className="m-2.5">山梨</Link><Link className="m-2.5">長野</Link></p>
                                <p><Link className="m-2.5">岐阜</Link><Link className="m-2.5">静岡</Link><Link className="m-2.5">愛知</Link></p>
                                <p><Link className="m-2.5">富山</Link><Link className="m-2.5">石川</Link><Link className="m-2.5">福井</Link></p>
                                <p><Link className="m-2.5">三重</Link><Link className="m-2.5">滋賀</Link><Link className="m-2.5">京都</Link><Link className="m-2.5">大阪</Link><Link className="m-2.5">兵庫</Link><Link className="m-2.5">奈良</Link><Link className="m-2.5">和歌山</Link></p>
                                <p><Link className="m-2.5">鳥取</Link><Link className="m-2.5">島根</Link><Link className="m-2.5">岡山</Link><Link className="m-2.5">広島</Link><Link className="m-2.5">山口</Link></p>
                                <p><Link className="m-2.5">徳島</Link><Link className="m-2.5">香川</Link><Link className="m-2.5">愛媛</Link><Link className="m-2.5">高知</Link></p>
                                <p><Link className="m-2.5">福岡</Link><Link className="m-2.5">佐賀</Link><Link className="m-2.5">長崎</Link><Link className="m-2.5">熊本</Link><Link className="m-2.5">大分</Link><Link className="m-2.5">宮崎</Link><Link className="m-2.5">鹿児島</Link></p>
                                <p><Link className="m-2.5">沖縄</Link></p>
                            </div>
                        </div>
                        <div className="map_img">
                            <img src="/images/home/map.png" alt="日本地図" />
                        </div>
                    </div>
                </div>

                {/* CSS */}
                <style jsx>{`
                .fa-circle-user {
                    color: #183780;
                    // #004aad; (アイコンと同じ色)
                }
                .top_img {
                    padding: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .menu {
                    text-align: center;
                    font-size: 25px;
                    color: #004aad;
                    margin-top: 60px;
                    margin-bottom:20px;
                }
                .all_box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .box {
                    margin-right: 0px;
                }
                .box img {
                    height: 300px;
                    margin: 10px;
                }
                .box p {
                    width: 100%;
                    text-align: center;
                }
                .more_button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .post_top3 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .region {
                    margin-right: 40px;
                    margin-left: 130px;
                }
                .region p {
                    margin: 10px;
                }
                .prefecture p {
                    margin: 10px;
                }
                .map_img {
                    width: 40%;
                    margin-right: 100px;
                }`}
                </style>
            </div>




            {/* Footer */}
            <footer className="p-4 bg-white sm:p-6 dark:bg-white-900">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">UEHHIIIIII</a>. All Rights Reserved.
                    </span>
                    {/* 連携参照 https://qiita.com/kohsukeve/items/316b200755ac0761101d */}
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 mr-10">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        {/* プロアカウントにしたら連携できる */}
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                            <span className="sr-only">Instagram page</span>
                        </a>
                        <a href="#" className=" text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                    </div>
                </div>
            </footer>

        </>
    )
}


