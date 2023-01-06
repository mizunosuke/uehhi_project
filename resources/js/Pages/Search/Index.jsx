import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


export default function PortSearch (props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        prefecture: "",
        area: "",
        fishname: "",
    });

    const [ area, setArea ] = useState("選択してください");

    //setDataは第一引数に更新を行う名前、第二引数には値を設定します。名前にはuseFormの引数で指定したオブジェクトのプロパティ名を指定します。
    const onHandleChange = (event) => {
        setArea(event.target.value);
        setData(event.target.name, event.target.value);
        console.log(data.area);
    };

    //地域、都道府県のデータ
    const areaData = ["選択してください","北海道","東北","関東","中部","近畿","中国","四国","九州"];

    const prefectureData = [
        {areaname:"北海道",data: ["北海道"]},
        {areaname: "東北", data: ["青森","秋田","岩手","山形","宮城","福島"]},
        {areaname: "関東", data: ["山梨","群馬","栃木","東京","埼玉","千葉","神奈川"]},
        {areaname: "中部", data: ["愛知","静岡","長野","新潟","石川","岐阜"]},
        {areaname: "近畿", data: ["青森","秋田","岩手","山形","宮城","福島"]},
        {areaname: "中国", data: ["青森","秋田","岩手","山形","宮城","福島"]},
        {areaname: "四国", data: ["青森","秋田","岩手","山形","宮城","福島"]},
        {areaname: "九州", data: ["青森","秋田","岩手","山形","宮城","福島"]},
    ];

    //魚種のデータ
    const kindsData = ["青物","ハタ類","タイ類","その他"];
    const fishData = [
        {category: "青物", data: ["ブリ","サワラ","マグロ","アジ","カツオ","イワシ","サバ"]},
        {category: "青物", data: ["ブリ","サワラ","マグロ","アジ","カツオ","イワシ","サバ"]},
        {category: "青物", data: ["ブリ","サワラ","マグロ","アジ","カツオ","イワシ","サバ"]},
        {category: "青物", data: ["ブリ","サワラ","マグロ","アジ","カツオ","イワシ","サバ"]},
        {category: "青物", data: ["ブリ","サワラ","マグロ","アジ","カツオ","イワシ","サバ"]},
    ]

      

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
                                    <p className='mt-2'>エリアで絞る</p>
                                </div>
                                
                                <div>
                                    <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">地域
                                            <select name="area" id="" className='text-center w-full' onChange={onHandleChange}>
                                                {areaData.map((areaname) => (
                                                    <option value={areaname}>{areaname}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">都道府県
                                            <select name="prefecture" id="" className='text-center w-full' onChange={onHandleChange}>
                                                <option value="">選択してください</option>
                                                {prefectureData.forEach((pre) => {
                                                    console.log(pre);
                                                    console.log(area);
                                                    //選択したエリアの値とprefecturedataの値が一致するか
                                                    if(area === pre.areaname) {
                                                        pre.data.map((prename) => (
                                                            <option value={prename}>{prename}</option>
                                                        ))
                                                    }
                                                })}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='mx-auto mt-4 w-2/3 border-solid border-2 rounded-md'>
                                <div className='text-center w-full mx-auto'>
                                    <p className='mt-2'>魚種で絞る</p>
                                </div>
                                
                                <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">大分類
                                            <select name="kind" id="" className='text-center w-full' onChange={onHandleChange}>
                                                {kindsData.map((kind) => (
                                                    <option value={kind}>{kind}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">小分類
                                            <select name="fishname" id="" className='text-center w-full' onChange={onHandleChange}>
                                                <option value="">選択してください</option>
                                                {fishData.forEach((pre) => {
                                                    console.log(pre);
                                                    console.log(area);
                                                    //選択したエリアの値とprefecturedataの値が一致するか
                                                    if(area === pre.areaname) {
                                                        pre.data.map((prename) => (
                                                            <option value={prename}>{prename}</option>
                                                        ))
                                                    }
                                                })}
                                            </select>
                                        </label>
                                    </div>
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

                        <div className='h-full w-full flex flex-wrap justify-start mt-6'>
                            {props.ports.map((port) => (
                                <div className='w-1/3 my-4'>
                                    <div className='border-solid border-2 h-full w-4/5'>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}