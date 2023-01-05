import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

export default function PortSearch (props) {
    return (
        <div className="min-h-screen">
            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="#" alt="logo" className='mx-5' />
                    <h1 className='text-3xl font-semibold'>釣り場を検索</h1>
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

            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            >
                <Head title="Search" />
            </AuthenticatedLayout>

            <div>
                <div>
                    <h1>釣り場を検索</h1>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}