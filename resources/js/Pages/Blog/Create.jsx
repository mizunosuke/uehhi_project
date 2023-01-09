import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import HistoryBackBtn from '@/Components/HistoryBackBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Create(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    eyecatch: "", // TOP画像
    title: "", // タイトル
    content: "", // 文章
    prefecture: "", // 県名 ２：APIで緯度経度から住所を取得し、県名を保存
    area: "", // 住所 ２：APIで緯度経度から住所を取得し、県名以下を保存
    time: "", // 釣った時間
    weather: "", // 天候 ３：画像選択時にAPIでとってきたdateを使用し、APIでその日の天候を取得
    barometric: "", // 気圧
    tackle: "", // 竿、リール → タックル！！！！！
    lure: "", // ルアー
    tide: "", // 潮位 ４：画像選択時にAPIでとってきたdateを使用し、APIでその日の潮位を取得
    kind: "", // 魚種 (画像認識しても良さそうではある TensorFlowのライブラリにないかな？)
    lat: "", // 緯度 １：複数画像選択時に画像から取得 API
    lng: "", // 経度 １：複数画像選択時に画像から取得 API
    date: "", // 写真の撮影日時 １：複数画像選択時に画像から取得
              //(複数画像を選択したときの１枚目で決めることとする)
    images: "", // TOP画像と別にブログの中に置く複数選択された画像ども 別テーブルに保存するが一緒に送る
  });

  // ファイル選択時にuseFormのdata.imageが書き換えられる
  // それと同時にdata.dateを選択された画像ファイルの最終更新日で更新する
  // lastModifiedに用意されている関数でデータを綺麗にする参考サイト
  // https://www.tohoho-web.com/wwwxx033.htm
  // useEffect(() => {
  //   // console.log(data.image);
  //   if (data.images !== undefined) {
  //     // ファイルの最終更新日をcreated_atの形に合わせる方法
  //     const lastModified = new Date(data.image.lastModified);
  //     const year = lastModified.getFullYear();
  //     const month = ('00' + (lastModified.getMonth() + 1)).slice(-2);
  //     const date = ('00' + lastModified.getDate()).slice(-2);
  //     const hour = ('00' + lastModified.getHours()).slice(-2);
  //     const minute = ('00' + lastModified.getMinutes()).slice(-2);
  //     const second = ('00' + lastModified.getSeconds()).slice(-2);
  //     const dateTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  //     // const dateTime = lastModified.toLocaleString();
  //     // console.log(lastModified.toLocaleString());

  //     setData('date', dateTime);
  //   } else {
  //     setData('date', '');
  //   }
  // }, [data.image])

  // useFormの値を更新する関数
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
    console.log(data);
  };

  // 投稿ボタンの関数
  const submit = (e) => {
    e.preventDefault();
    post(route("blog.store"));
  };

  // 画像選択時にプレビューさせる機能 (TOP画像)
  // https://tektektech.com/laravel-view-image-at-public/#i-2
  // https://blog.capilano-fw.com/?p=10887#i
  const [imageData, setImageData] = useState('');
  const handleFileChange = e => { // 画像が選択された <input>タグのonChange属性
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const imageData = e.target.result;
        setImageData(imageData);
      }
      reader.readAsDataURL(file);
    } else {
      setImageData('');
      setData('date', '');
    }
    // console.log(imageData);
  };

  // https://lancers.work/pref-city-form-jquery-json/
  // jsonファイルから都道府県フォーム生成
  // useEffect(() => {
  //   fetch('/pref_city.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data);
  //       data.map((x, i) => {
  //         let code = ('00' + (i + 1)).slice(-2); // ゼロパディング
  //         // console.log(code);
  //         let prefSelect = document.querySelector('#select-pref');
  //         let option = document.createElement('option');
  //         option.text = x[code].pref;
  //         option.value = code + x[code].pref;
  //         prefSelect.appendChild(option);
  //       });
  //     });
  // }, [])

  // jsonファイルから都道府県メニューに連動した市区町村フォーム生成
  // useEffect(() => {
  //   if (data.prefecture !== '') {
  //     const citySelect = document.querySelector('#select-city');
  //     let children = citySelect.children; // selectの中のoption
  //     for (let i = children.length - 1; i > 0; i--) {
  //       citySelect.removeChild(children[i]);
  //     }
  //     const prefSelect = document.getElementById('select-pref').value;
  //     console.log(prefSelect)
  //     let code = prefSelect.slice(0, 2);
  //     console.log(code)
  //     let selectPref = ('00' + code).slice(-2);
  //     let key = Number(selectPref) - 1;
  //     fetch('/pref_city.json')
  //       .then(response => response.json())
  //       .then(data => {
  //         data[key][selectPref].city.map(city => {
  //           let option = document.createElement('option');
  //           option.text = city.name;
  //           citySelect.appendChild(option);
  //         });
  //       });
  //   }
  // }, [data.prefecture])

  // const onHandleChangePref = (e) => {
  //   let value = e.target.value.slice(2)
  //   setData('prefecture', value);
  // }

  return (
    <>
      <Head title="釣り人の今" />
      <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
        <div className='flex items-center'>
          <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
          <h1 className='text-3xl font-semibold'>釣り人の今</h1>
        </div>
        <div className="flex items-center mx-3">
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

      <AuthenticatedLayout auth={props.auth} errors={props.errors} header={<></>} />

      <h1 className='text-center text-2xl mt-10'>
        - 投稿画面 -
      </h1>

      {/* 投稿フォーム */}
      <form onSubmit={submit}
        className='flex flex-col justify-center items-center'
        encType="multipart/form-data"
      >
        {/* 条件分岐でファイルが選択されていれば選択されているファイルを表示、なければデフォルトの画像を表示 */}
        <label htmlFor="image" className='w-1/5 h-1/5 flex justify-center border border-gray-400 rounded-md p-2 mt-5'>
          <img
            src={imageData === '' ? '/images/sns/default.png' : imageData}
            alt="image"
            className='w-full h-full object-cover cursor-pointer rounded-md'
          />
        </label>

        <label
          className='bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded cursor-pointer mb-5 mt-3'
          htmlFor="image">
          画像を選択してください
        </label>
        <input
          type="file"
          name='image'
          id='image'
          accept='.png,.jpeg,.jpg,.svg,.gif'
          hidden
          onChange={(e) => {
            handleFileChange(e);
            setData('eyecatch', e.target.files[0]);
          }}
        />

        <textarea name="content" type='text' placeholder='内容を入力？...'
          cols="50" rows="3"
          onChange={onHandleChange}
          className='rounded-md'
        />

        <div className="flex items-center m-5">
          <label htmlFor="kind">釣った魚種： </label>
          <input
            type="text"
            name="kind"
            id='kind'
            placeholder='例:アジ カサゴ...'
            onChange={onHandleChange}
            className='rounded-md'
          />
        </div>

        {/* 都道府県/市区町村 SelectBox */}
        {/* <select
          id="select-pref"
          name='prefecture'
          onChange={onHandleChangePref}
          className="rounded-md mb-2"
        >
          <option value="">都道府県を選択してください</option>
        </select>
        <select
          id="select-city"
          name='area'
          onChange={onHandleChange}
          className="rounded-md mb-2"
        >
          <option value="">市区町村を選択してください</option>
        </select> */}

        <button
          className='bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-4'
          disabled={processing}>
          投稿
        </button>
      </form>


      <div className='absolute top-56 left-16'>
        <HistoryBackBtn />
      </div>
    </>
  )
}