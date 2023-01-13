import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import HistoryBackBtn from '@/Components/HistoryBackBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import exifr from 'exifr';
import { set } from 'lodash';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Inertia } from '@inertiajs/inertia';

export default function Create(props) {
const  { isLoaded }  =  useJsApiLoader ( { 
    id : 'google-map-script' , 
    googleMapsApiKey : "AIzaSyCtWzUl7iuDKxNKU6tOTkLrCGly69PndV0" 
})

  
  // console.log(props);
  const google = window.google;
  var maps;

  const [portId, setPortId] = useState("");
  const [eyecatch, setEyecatch] = useState("");
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [access, setAccess] = useState("");
  // const [time, setTime] = useState("");
  // const [weather, setWeather] = useState("");
  // const [tackle, setTackle] = useState("");
  // const [lure, setLure] = useState("");
  const [tide, setTide] = useState("");
  // const [kind, setKind] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLngtude] = useState("");
  const [newDate, setNewDate] = useState("");
  const [images, setImages] = useState("");
  // const [arrayTide, setArrayTide] = useState([]);

  const [values, setValues] = useState({
    title: "",// タイトル
    content: "", // 文章
    time: "",// 釣った時間
    weather: "", // 天候 Select
    tackle: "",// 竿、リール → タックル！！！！！
    lure: "",// ルアー
    kind: "", // 魚種
  });

  const apiData = {
    port_id: portId,
    eyecatch: eyecatch,
    access: access,
    tide: tide,
    lat: latitude,
    lng: longitude,
    date: newDate,
    images: images
  }

  const allData = { ...values, ...apiData };

  

  const onHandleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
    console.log(values);
    console.log(allData);
  }


  // tideを取得するために選んだ港の情報を持たせる
  const [port, setPort] = useState("");
  const [yr, setYr] = useState("");
  const [mn, setMn] = useState("");
  const [dy, setDy] = useState("");


  // 
  const handlePortDataChange = (e) => {
    setPortId(e.target.value);
    // port_idで港情報を単体で引っ張ってくる
    const portData = addressData.find(x => x.id == e.target.value);
    setPort(portData);
        // tide API の門をたたく！！！！
    //潮汐データを取得する関数
      function gotData() {
        axios.get("https://api.tide736.net/get_tide.php", {
          params: {
            // ここにクエリパラメータを指定する
            pc: portData.pc,
            hc: portData.hc,
            yr: yr,
            mn: mn,
            dy: dy,
            rg: 'day'
          }
        })
          .then((response) => {
          console.log(response.data);
          const tideData = response.data.tide.chart;
            console.log(tideData);
            return tideData;
          })
          .then((tideData) => {
            const cmData = [];
          Object.keys(tideData).map((key) => {
            console.log(key);
            const tides = tideData[key].tide;
            console.log(tides);
            tides.map((tide) => {
              cmData.push(tide.cm);
            });
            console.log(cmData);
          })
            return cmData;
          })
          .then((cmData) => {
          console.log(cmData);
          const jsonTide = JSON.stringify(cmData);
          
          setTide(jsonTide);
          console.log(jsonTide);
        })
      }
    gotData();
    // console.log(allData);
  }

  
  const handleEyeChange = (e) => {
    e.preventDefault();
    handleFileChange(e);
    handleFileInputChange(e);
    setEyecatch(e.target.files[0]);
    // console.log(allData);
  };

  // const handleTitleChange = (e) => {
  //   setData('title',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleContentChange = (e) => {
  //   setData('content',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleAccessChange = (e) => {
  //   setData('access',e.target.value);
  //   // console.log(allData);
  // };

  // const handleTimeChange = (e) => {
  //   setData('time',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleWeatherChange = (e) => {
  //   setData('weather',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleTackleChange = (e) => {
  //   setData('tackle',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleLureChange = (e) => {
  //   setData('lure',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleTideChange = (e) => {
  //   setData('tide',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleKindChange = (e) => {
  //   setData('kind',e.target.value);
  //   // console.log(allData);
  //   console.log(data);
  // };

  // const handleLatChange = (e) => {
  //   setLat()
  // };

  // const handleLngChange = (e) => {
  //   setLng()
  // };

  // const handleDateChange = (e) => {
  //   setDate()
  // };

  // const handleImageChange = (e) => {
  //   setImage()
  // };
  
 //入力するすべてのデータをステート管理
  // const allData = {
  //   port_id: portId,
  //   eyecatch: eyecatch, // TOP画像
  //   title: title, // タイトル
  //   content: content, // 文章
  //   access: access, // 県名 ２：APIで緯度経度から住所を取得し,保存
  //   time: time, // 釣った時間
  //   weather: weather, // 天候 Select
  //   tackle: tackle, // 竿、リール → タックル！！！！！
  //   lure: lure, // ルアー
  //   tide: tide, // 潮位 ４：画像選択時にAPIでとってきたdateを使用し、APIでその日の潮位を取得 jsonで保存
  //   kind: kind, // 魚種
  //   lat: lat, // 緯度 １：画像選択時に画像から取得 API
  //   lng: lng, // 経度 １：画像選択時に画像から取得 API
  //   date: newDate, // 写真の撮影日時 １：複数画像選択時に画像から取得(TOP画像で取得する)
  //   images: image, // TOP画像と別にブログの中に置く複数選択された画像ども 別テーブルに保存するが一緒に送る
  // };


  // useStateでAPIで返ってきたデータを状態維持する
  const [ addressData, setAddressData ] = useState([]);
  function fetchData(value) {
    axios.post("http://localhost/api/getport",{
      data: value
    })
    .then((res) => {
      console.log(res.data);
      setAddressData(res.data);
      console.log(addressData);
    });
  }


  // 都道府県をセレクトで選んだときにAPI走らせて一致する港をとってくる
  const handleChange = (e) => {
    e.preventDefault();
    //入力された都道府県名をAPIに送信
    fetchData(e.target.value);
  }

  const [location, setLocation] = useState("");


  // const { data, setData, post, processing, errors, reset } = useForm({
  //   port_id: "",
  //   eyecatch:"",// TOP画像
  //   title: "",// タイトル
  //   content: "", // 文章
  //   access: "",// 県名 ２：APIで緯度経度から住所を取得し,保存
  //   time: "",// 釣った時間
  //   weather: "",// 天候 Select
  //   tackle: "", // 竿、リール → タックル！！！！！
  //   lure: "", // ルアー
  //   tide: "", // 潮位 ４：画像選択時にAPIでとってきたdateを使用し、APIでその日の潮位を取得 jsonで保存
  //   kind: "", // 魚種
  //   locate: "",
  //   // lat: "", // 緯度 １：画像選択時に画像から取得 API
  //   // lng: "", // 経度 １：画像選択時に画像から取得 API
  //   // date: "", // 写真の撮影日時 １：複数画像選択時に画像から取得(TOP画像で取得する)
  //   }    
  // );


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
      const tideDate = `${year}-${month}-${date1}`
      // console.log(createDateTime);
      let lat = latitude;
      let lng = longitude;
      let date = createDateTime;

      //日付を更新
      console.log(lat, lng, date);
      setLatitude(lat);
      setLngtude(lng);
      setNewDate(date);

      console.log(latitude);
      console.log(longitude);
      console.log(newDate);
      // setLocation(locate);
      
      // setData('lng', lng);
      // setData('lat',lat);
      // console.log(data);

      // 緯度経度から住所取得
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: lat, lng: lng };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setAccess(results[0].formatted_address);
          } else {
            console.log("No results found");
          }
        } else {
              console.log("Geocoder failed due to: " + status);
        }
      });
      // console.log(access);

      // tide APIで使用するように状態管理
      setYr(dateTime.getFullYear())
      setMn(dateTime.getMonth() + 1);
      setDy(dateTime.getDate());
      // console.log(yr)
      // console.log(mn)
      // console.log(dy)
    }
  }, [exifData]);


  // 投稿ボタンの関数
  const submit = (e) => {
    e.preventDefault();    
    // console.log(data);
      Inertia.post("/blogFunction",allData);
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
    } 
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
    setImages(e.target.files);
    // console.log(data);
  }

  // console.log(allData);

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
        encType="multipart/form-data" method='POST' className='flex flex-col items-center'>
        
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
            onChange={handleEyeChange}
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
          天候：
          <select className='rounded-md' name="weather" id="weather" onChange={onHandleChange}>
            <option value="">選択してください</option>
            <option value="晴れ">晴れ</option>
            <option value="曇り">曇り</option>
            <option value="雨">雨</option>
          </select>
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
        <select id="select-port" name='port_id' className="rounded-md mb-2" onChange={handlePortDataChange}>
          <option value="">港を選択してください</option>
        </select>

        
        <button
          className='bg-blue-500 rounded-lg text-lg text-white font-medium leading-10 w-32 h-12 flex justify-center items-center m-4'
          >
          投稿
        </button>
      </form>


      <div className='absolute top-56 left-16'>
        <HistoryBackBtn />
      </div>
    </>
  )
}