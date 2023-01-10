import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import HistoryBackBtn from '@/Components/HistoryBackBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import exifr from 'exifr';

export default function Create(props) {

  // useStateでAPIで返ってきたデータを状態維持する
  const [ addressData, setAddressData ] = useState([]);
  function fetchData(value) {
    axios.post("http://localhost/api/getport",{
      data: value
    })
    .then((res) => {
      console.log(res.data);
      setAddressData(res.data);
    });
  }
  // 都道府県をセレクトで選んだときにAPI走らせて一致する港をとってくる
  const handleChange = (e) => {
    e.preventDefault();
    //入力された都道府県名をAPIに送信
    fetchData(e.target.value);
  }

  
  console.log(addressData);


  //tide736.net
  useEffect(() => {
    async function fetchData () {
        const response = await axios.get("https://api.tide736.net/get_tide.php", {
            params: {
              // ここにクエリパラメータを指定する
              pc: 34,
              hc: 20,
              yr: 2023,
              mn: 1,
              dy: 1,
              rg: 'day'
            }
          });
        console.log(response);
    }
    fetchData();
  }, []);

  const { data, setData, post, processing, errors, reset } = useForm({
    port_id: "",
    eyecatch: "", // TOP画像
    title: "", // タイトル
    content: "", // 文章
    access: "", // 県名 ２：APIで緯度経度から住所を取得し,保存
    time: "", // 釣った時間
    weather: "", // 天候 Select
    tackle: "", // 竿、リール → タックル！！！！！
    lure: "", // ルアー
    tide: "", // 潮位 ４：画像選択時にAPIでとってきたdateを使用し、APIでその日の潮位を取得 jsonで保存
    kind: "", // 魚種
    lat: "", // 緯度 １：画像選択時に画像から取得 API
    lng: "", // 経度 １：画像選択時に画像から取得 API
    date: "", // 写真の撮影日時 １：複数画像選択時に画像から取得(TOP画像で取得する)
    images: "", // TOP画像と別にブログの中に置く複数選択された画像ども 別テーブルに保存するが一緒に送る
  });



  // EXIFデータ取得関数
  const [exifData, setExifData] = useState(null);
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await exifr.parse(file);
    setExifData(data);
    console.log(data);
  };

  let lat = '';
  let lng = '';
  // EXIFデータで取得した緯度、経度、撮影時間をuseFormにセット
  useEffect(() => {
    if (exifData) {
      // 緯度、経度を１０進数になおす
      const latitude = exifData.GPSLatitude[0] / 1 + exifData.GPSLatitude[1] / 60 + exifData.GPSLatitude[2] / 3600
      const longitude = exifData.GPSLongitude[0] / 1 + exifData.GPSLongitude[1] / 60 + exifData.GPSLongitude[2] / 3600
      // console.log(lat)
      // console.log(lng)
      // console.log(exifData.DateTimeOriginal)
      console.log(exifData)
      const dateTime = new Date(exifData.DateTimeOriginal);
      const year = dateTime.getFullYear();
      const month = ('00' + (dateTime.getMonth() + 1)).slice(-2);
      const date1 = ('00' + dateTime.getDate()).slice(-2);
      const hour = ('00' + dateTime.getHours()).slice(-2);
      const minute = ('00' + dateTime.getMinutes()).slice(-2);
      const second = ('00' + dateTime.getSeconds()).slice(-2);
      const createDateTime = `${year}-${month}-${date1} ${hour}:${minute}:${second}`;
      // console.log(createDateTime);
      lat = latitude;
      lng = longitude;
      let date = createDateTime;

      async function set() {
        await setData('date', date);
        await setData('lat', lat);
        await setData('lng', lng);
      };
      
      set();
      
      // setData({
      //   lat: lat, lng: lng, date: createDateTime
      // })
      console.log(data);
    }
  }, [exifData]);

  // useEffect(() => {
  //   setData('lat', lat);
  // }, [data.date])

  // useEffect(() => {
  //   setData('lng', lng);
  //   console.log(data);
  // }, [data.lat])


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
  useEffect(() => {
    fetch('/pref_city.json')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        data.map((x, i) => {
          let code = ('00' + (i + 1)).slice(-2); // ゼロパディング
          // console.log(code);
          let prefSelect = document.querySelector('#select-pref');
          let option = document.createElement('option');
          option.text = x[code].pref;
          option.value = x[code].pref;
          prefSelect.appendChild(option);
        });
      });
  }, [])

  // 都道府県選択時にAPI走らせてとってきた港情報でセレクト作成
  useEffect(() => {
    if (addressData.length !== 0) {
      const portSelect = document.querySelector('#select-port');
      let children = portSelect.children; // selectの中のoption
      for (let i = children.length - 1; i > 0; i--) {
        portSelect.removeChild(children[i]); // 今あるoptionを削除
      }
      addressData.map((port) => {
        let option = document.createElement('option');
        option.text = port.port_name;
        option.value = port.id;
        portSelect.appendChild(option);
      })
    }
  }, [addressData])


  // 画像複数選択時にuseFormにファイルデータセット
  const onHandleChangeImages = (e) => {
    // console.log(e.target.files);
    setData('images', e.target.files);
    console.log(data);
  }

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

      <AuthenticatedLayout auth={props.auth} errors={props.errors} header={<></>} />

      <h1 className='text-center text-2xl mt-10'>
        - 釣行日記 投稿画面 -
      </h1>

      {/* 投稿フォーム */}
      <form onSubmit={submit}
        encType="multipart/form-data">
        
        {/* 条件分岐でファイルが選択されていれば選択されているファイルを表示、なければデフォルトの画像を表示 */}
        {/* 画像クリックでもファイル選択できるようにlabelで囲んだ */}
        <div className="flex justify-center flex-col items-center w-full h-full">
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
            <p>画像を選択してください（１枚のみ）</p>
          </label>
          <input
            type="file"
            id='image'
            accept='.png,.jpeg,.jpg,.svg,.gif'
            hidden
            onChange={(e) => {
              handleFileChange(e);
              handleFileInputChange(e);
              setData('eyecatch', e.target.files[0]);
            }}
          />
        </div>

        <label htmlFor="title">釣行日記タイトル：
          <input type="text" id="title" name="title"
            className='rounded-md' onChange={onHandleChange} />
        </label>

        <div>
        <textarea name="content" type='text' placeholder='内容を入力？...'
          cols="50" rows="3"
          onChange={onHandleChange}
          className='rounded-md'/>
        </div>

        <label htmlFor="images">
          <input type="file"
            accept='.png,.jpeg,.jpg,.svg,.gif'
            multiple
            onChange={onHandleChangeImages} />
        </label>

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

        <div>
          <label htmlFor="time">釣った時間：
            <input type="time" name="time" className='rounded-md' onChange={onHandleChange} />
          </label>
        </div>

        <div>
          <label htmlFor="tackle">竿、リールなど：
            <input type="text" id="tackle" name="tackle" className='rounded-md' onChange={onHandleChange} />
          </label>
          <label htmlFor="lure">ルアー：
            <input type="text" id="lure" name="lure" className='rounded-md' onChange={onHandleChange} />
          </label>
        </div>

        
        {/* 都道府県/港 SelectBox */}
        <select id="select-pref" name='prefecture' className="rounded-md mb-2" onChange={handleChange}>
          <option value="">都道府県を選択してください</option>
        </select>
        <select id="select-port" name='port_id' className="rounded-md mb-2" onChange={onHandleChange}>
          <option value="">港を選択してください</option>
        </select>

        
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