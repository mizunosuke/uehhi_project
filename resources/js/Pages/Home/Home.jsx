import { Link, Head } from "@inertiajs/inertia-react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";


const returnTopButton = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    height: "30px",
};

export default function Home(props) {
    return (
        <>
            <div>
                <Head title="Home" />

                {/* Header(ログイン時と非ログイン時で条件分岐) */}
                <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                    <div className='flex items-center'>
                        <img src="#" alt="logo" className='mx-5' />
                        <h1 className='text-3xl font-semibold'>HOME</h1>
                    </div>
                    <div className="flex mx-3">
                        {props.auth.user ? (
                            <Link href={route('mypage.index')}
                                className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 inline-block flex justify-center items-center m-1.5">
                                マイページ
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}
                                    className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 inline-block flex justify-center items-center m-1.5">
                                    <div>ログイン</div>
                                </Link>
                                <Link href={route('register')}
                                    className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 inline-block flex justify-center items-center m-1.5">
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
                    <h2 className="menu">概要</h2>
                    <div className="flex justify-between h-16">
                        <img src="/images/home/fishing1.jpg" alt="釣り画像１" />
                        <p>デモデモデモデモデモ</p>
                    </div>
                    <div className="flex justify-between h-16">
                        <p>デモデモデモデモデモ</p>
                        <img src="/images/home/fishing1.jpg" alt="釣り画像１" />
                    </div>
                    <div className="flex justify-between h-16">
                        <img src="/images/home/fishing1.jpg" alt="釣り画像１" />
                        <p>デモデモデモデモデモ</p>
                    </div>
                </div>

                {/* 釣行日記 */}
                <div>
                    <h2 className="menu">釣行日記</h2>
                    <button>MORE</button>
                    {/* <Link href={route('blog/index')}>MORE</Link> */}
                </div>

                {/* 釣り人の今 */}
                <div>
                    <h2 className="menu">釣り人の今</h2>
                    <button>MORE</button>
                    {/* <Link href={route('sns')}>MORE</Link> */}
                </div>

                {/* 釣り場検索 */}
                <div>
                    <h2 className="menu">釣り場検索</h2>
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between h-16">
                            <div>
                                <p>北海道</p>
                                <p>東北</p>
                                <p>関東</p>
                                <p>甲信越</p>
                                <p>東海</p>
                                <p>北陸</p>
                                <p>近畿</p>
                                <p>中国</p>
                                <p>四国</p>
                                <p>九州</p>
                                <p>沖縄</p>
                            </div>
                            <div class="prefecture">
                                <p>北海道</p>
                                <p>青森岩手宮城秋田山形福島</p>
                                <p>茨城栃木群馬埼玉千葉東京神奈川</p>
                                <p>新潟山梨長野</p>
                                <p>岐阜静岡愛知</p>
                                <p>富山石川福井</p>
                                <p>三重滋賀京都大阪兵庫奈良和歌山</p>
                                <p>鳥取島根岡山広島山口</p>
                                <p>徳島香川愛媛高知</p>
                                <p>福岡佐賀長崎熊本大分宮崎鹿児島</p>
                                <p>沖縄</p>
                            </div>
                        </div>
                        <div>
                            <img src="/images/home/map.png" alt="日本地図" />
                        </div>
                    </div>
                </div>

                <style jsx>{`
                .top_img {
                    padding: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .menu {
                    text-align: center;
                    font-size: 25px;
                    color: blue;
                }`}
                </style>

            </div>
        </>

    )
}

