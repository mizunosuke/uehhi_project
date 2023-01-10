import React from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faMagnifyingGlass, faMap } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

export default function Blog(props) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        area: "",
        prefecture: "",
        fishname: "",
        word: "",
    });

    //フォームに入力された値をステート管理
    const [inputData, setInputData] = useState([]);

    //１つ目のプルダウンの値を管理（一致確認に使う）
    const [area, setArea] = useState("選択してください");
    const [speicies, setSpeicies] = useState("選択してください");

    //setDataは第一引数に更新を行う名前、第二引数には値を設定します。名前にはuseFormの引数で指定したオブジェクトのプロパティ名を指定します。
    const onHandleChange = (event) => {
        setArea(event.target.value);
        setSpeicies(event.target.value);
        setData(event.target.name, event.target.value);
        setInputData(event.target.value);
        // console.log(data.area);
        console.log(data);
    };

    //地域、都道府県のデータ
    const areaData = ["選択してください", "北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"];

    const prefectureData = [
        { areaname: "北海道", data: ["北海道"] },
        { areaname: "東北", data: ["青森", "秋田", "岩手", "山形", "宮城", "福島"] },
        { areaname: "関東", data: ["山梨", "群馬", "栃木", "東京", "埼玉", "千葉", "神奈川"] },
        { areaname: "中部", data: ["愛知", "静岡", "長野", "新潟", "石川", "岐阜"] },
        { areaname: "近畿", data: ["青森", "秋田", "岩手", "山形", "宮城", "福島"] },
        { areaname: "中国", data: ["青森", "秋田", "岩手", "山形", "宮城", "福島"] },
        { areaname: "四国", data: ["青森", "秋田", "岩手", "山形", "宮城", "福島"] },
        { areaname: "九州", data: ["青森", "秋田", "岩手", "山形", "宮城", "福島"] },
    ];

    //魚種のデータ
    const kindsData = ["選択してください", "青物", "ハタ類", "タイ類", "その他"];
    const fishData = [
        { category: "青物", data: ["ブリ", "サワラ", "マグロ", "アジ", "カツオ", "イワシ", "サバ"] },
        { category: "ハタ類", data: ["キジハタ", "マハタ", "オオモンハタ", "カサゴ", "メバル", "クエ", "オコゼ"] },
        { category: "タイ類", data: ["ブリ", "サワラ", "マグロ", "アジ", "カツオ", "イワシ", "サバ"] },
        { category: "その他", data: ["ブリ", "サワラ", "マグロ", "アジ", "カツオ", "イワシ", "サバ"] },
    ];

    //フォーム送信時
    const submit = (e) => {
        e.preventDefault();
        post(route('blog.search', data));
    }

    return (
        <div>
            <Head title="釣行日記" />

            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                    <h1 className='text-3xl font-semibold'>釣行日記</h1>
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

            <div className='w-full min-h-screen h-full my-6'>
                <div className='w-full h-screen flex'>
                    <div className='w-1/4 h-full'>
                        <div className='text-center w-6/12 mx-auto'>
                            <h3><span><FontAwesomeIcon icon={faMap} /></span>条件を絞る</h3>
                        </div>

                        <form onSubmit={submit}>
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
                                            <select name="prefecture" id="selection" className='text-center w-full' onChange={onHandleChange}>
                                                <option value="" id="option01">選択してください</option>
                                                {prefectureData.forEach((pre) => {
                                                    // console.log(pre);
                                                    // console.log(area);
                                                    //選択したエリアの値とprefecturedataの値が一致するか
                                                    for (let i = 0; i < areaData.length; i++) {
                                                        if (pre.areaname === area) {
                                                            //optionタグを初期化
                                                            const secondOp = document.querySelectorAll('#selection > option');
                                                            secondOp.forEach(option => {
                                                                option.remove();
                                                            });
                                                            //セレクトボックスを動的に作成
                                                            const firstOp = document.getElementById("selection")
                                                            pre.data.map((name) => {
                                                                // console.log(name);
                                                                let option = document.createElement("option");
                                                                option.value = name;
                                                                option.textContent = name;
                                                                firstOp.appendChild(option);
                                                            });

                                                            break;
                                                        }
                                                    }
                                                })}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='mx-auto w-1/4 items-center mt-4'>
                                <PrimaryButton className="ml-4" processing={processing}>
                                    検索
                                </PrimaryButton>
                            </div>
                        </form>


                        <form>
                            <div className='mx-auto mt-4 w-2/3 border-solid border-2 rounded-md'>
                                <div className='text-center w-full mx-auto'>
                                    <p className='mt-2'>魚種で絞る</p>
                                </div>

                                <div>
                                    <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">大分類
                                            <select name="kind" id="" className='text-center w-full' onChange={onHandleChange}>
                                                {kindsData.map((kindname) => (
                                                    <option value={kindname}>{kindname}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className='w-2/3 mx-auto my-4'>
                                        <label htmlFor="">小分類
                                            <select name="fishname" id="selection02" className='text-center w-full' onChange={onHandleChange}>
                                                <option value="" id="option02">選択してください</option>
                                                {fishData.forEach((fish) => {
                                                    // console.log(fish);
                                                    // console.log(speicies);
                                                    //選択したエリアの値とprefectureDataの値が一致するか
                                                    for (let i = 0; i < kindsData.length; i++) {
                                                        if (fish.category === speicies) {
                                                            //optionタグを初期化
                                                            const secondOp = document.querySelectorAll('#selection02 > option');
                                                            secondOp.forEach(option => {
                                                                option.remove();
                                                            });
                                                            //セレクトボックスを動的に作成
                                                            const firstOp = document.getElementById("selection02")
                                                            fish.data.map((name) => {
                                                                // console.log(name);
                                                                let option = document.createElement("option");
                                                                option.value = name;
                                                                option.textContent = name;
                                                                firstOp.appendChild(option);
                                                            });

                                                            break;
                                                        }
                                                    }
                                                })}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='mx-auto w-1/4 items-center mt-4'>
                                <PrimaryButton className="ml-4" processing={processing}>
                                    検索
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>

                    <div className='w-3/4 h-full relative'>
                        <div className="relative">
                            <form className="flex justify-center items-center my-0" onSubmit={submit}>
                                <div className='flex items-center border-solid border-gray-400'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-3" />
                                    <input id="searchWord" name="word" type="text" placeholder='住所、魚種を入力して投稿を検索...'
                                        className='rounded border-gray-500 w-96' onChange={onHandleChange} />
                                </div>
                                <button className='bg-blue-500 rounded text-white font-medium leading-10 w-20 h-10 m-1.5' disabled={processing}>
                                    検索
                                </button>
                            </form>

                        <Link href={route('blog.create')}
                            className="absolute right-40 top-1 bg-blue-500 rounded-full text-lg text-white font-medium leading-10 w-8 h-8 flex justify-center items-center m-1.5">＋
                        </Link>
                    </div>

                        <div className='h-full w-full flex flex-wrap justify-start mt-6'>

                            <div className='w-1/3 my-4'>
                                <div className='border-solid border-2 w-4/5 rounded shadow-sm'>
                                    <h4 className='text-center my-4 font-semibold border-indigo-400 border-solid border-b w-4/5 mx-auto text-2xl'>ぼくだお</h4>
                                    <div className='w-10/12 mx-auto'>
                                        <img src='#' alt="" />
                                    </div>
                                    <div className='text-left w-10/12 mx-auto'>
                                        <ul>
                                            <li className='my-4 ml-20 font-semibold'>住所 : 住所あsdfじょhげrbkwんjljえfkんjgrbんぇmふぁ</li>
                                            <li className='my-2 ml-20 font-semibold'>対象魚 : ハゼ、コブダイ</li>
                                        </ul>
                                    </div>
                                    <div className='w-3/5 ml-24 my-4'>
                                        <Link href={route('blog.show')}
                                            className="bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-1.5">
                                            詳細を見る
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}