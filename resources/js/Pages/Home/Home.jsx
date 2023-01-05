import { Link, Head } from "@inertiajs/inertia-react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home(props) {
    return (
        <>
            <div>
                <Head title="Home" />
                <h1>HOME画面です</h1>

                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('home.index')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Home
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                ログイン
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                新規登録
                            </Link>
                        </>
                    )}
                </div>
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
                    <img src="" alt="" />
                    <h2 >概要</h2>
                    <div>
                        <img src="" alt="" />
                        <p>デモデモデモデモデモ</p>
                    </div>
                    <div>
                        <p>デモデモデモデモデモ</p>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <img src="" alt="" />
                        <p>デモデモデモデモデモ</p>
                    </div>
                </div>
                <div>
                    <h2>釣行日記</h2>
                    <button>MORE</button>
                    {/* <Link href={route('blog/index')}>MORE</Link> */}
                </div>
                <div>
                    <h2>釣り人の今</h2>
                    <button>MORE</button>
                    {/* <Link href={route('sns')}>MORE</Link> */}
                </div>
                <div>
                    <h2>釣り場検索</h2>
                    <div>
                        <div>
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
                            {/* 日本地図入れる */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

