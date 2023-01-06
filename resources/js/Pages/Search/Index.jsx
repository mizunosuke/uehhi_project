import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function PortSearch (props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        prefecture: "",
        kind: "",
        word: "",
    });

    const prefectureData = ["北海道地方","東北地方","関東地方","中部地方","近畿地方","中国・四国地方","九州・沖縄地方"];
    const fishData = ["アオリイカ","タコ","アジ","スズキ","ブリ","カンパチ","サワラ","メバル","カサゴ","チヌ","マダイ","マゴチ","ヒラメ","キジハタ"];

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

            <div className='w-full min-h-screen h-full my-6'>

                <div className='w-full h-screen flex'>
                    <div className='w-1/4 h-full'>
                        <div className='text-center w-6/12 mx-auto'>
                            <h3><span><FontAwesomeIcon icon={faMap} /></span>条件を絞る</h3>
                        </div>
                        
                        <form>
                            <div className='mx-auto mt-4 w-2/3 border-solid border-2 rounded-md'>
                                <div className='text-center w-full mx-auto'>
                                    <p className='mt-2'>地域</p>
                                </div>
                                {prefectureData.map((pre) => (
                                    <div className='w-full'>
                                        <div className="block my-4 w-full mx-auto">
                                            <label className="flex items-center">
                                                <div className='w-full mx-auto'>
                                                    <Checkbox name="prefecture" value={data.prefecture}/>
                                                    <span className="ml-2 text-sm text-gray-600">{pre}</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mx-auto mt-4 w-2/3 border-solid border-2 rounded-md'>
                                <div className='text-center w-full mx-auto'>
                                    <p className='mt-2'>魚種</p>
                                </div>
                                {fishData.map((kind) => (
                                    <div className='w-full'>
                                        <div className="block my-4 w-full mx-auto">
                                            <label className="flex items-center">
                                                <div className='w-full mx-auto'>
                                                    <Checkbox name="prefecture" value={data.kind}/>
                                                    <span className="ml-2 text-sm text-gray-600">{kind}</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div  className='mx-auto w-1/4 items-center mt-4'>
                                <PrimaryButton className="ml-4" processing={processing}>
                                    検索
                                </PrimaryButton>
                            </div>
                        </form>
                        
                    </div>

                    <div className='w-3/4 h-full'>
                        <div className="relative">
                            <form className="flex justify-center items-center my-0">
                                <div className='flex items-center border-solid border-gray-400'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-3" />
                                <input id="searchWord" name="word" value={data.word} type="text" placeholder='住所、魚種を入力して投稿を検索...'
                                    className='rounded border-gray-500 w-96' />
                                </div>
                                <button className='bg-blue-500 rounded text-white font-medium leading-10 w-20 h-10 m-1.5' disabled={processing}>
                                検索
                                </button>
                            </form>
                        </div>

                        <div>
                            {props.ports.map((port) => (
                                <div>
                                    <h4>{port.port_name}</h4>
                                    <div>
                                        <img src="{{ asset({port.image}) }}"  alt="" />
                                    </div>
                                    <div>
                                        <ul>
                                            <li>{port.access}</li>
                                            <li>{port.kind}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}