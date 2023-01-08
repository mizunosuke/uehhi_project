import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FeedIcon from '@mui/icons-material/Feed';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';



export default function ShowPort (props) {


    //GoogleMap表示設定
    const containerStyle = {
        width: '100%',
        height: '100%',
      };
      
    const center = {
        lat: -3.745,
        lng: -38.523
    };

    //タブ機能
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="min-h-screen">
            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="#" alt="logo" className='mx-5' />
                    <h1 className='text-3xl font-semibold'>釣り場詳細</h1>
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

            <div className='min-w-full border-2 border-solid'>
                <h1 className='text-center mx-auto my-12 text-4xl font-semibold'>〇〇漁港（漁港の名前を取ってくる）</h1>
                <div className='w-full '>
                    <img src={props.image} alt="" />
                </div>
            </div>

            <div className='flex'>
                <div className='border-solid border-2 w-1/4 min-h-full'>
                    <div className='w-full my-8 relative'>
                        <h3 className='text-center font-semibold text-2xl'>〇〇漁港の近況</h3>
                        <Link href={route('sns.create')}
                            className="absolute left-12 -top-4 bg-blue-500 rounded-full text-2xl text-white font-medium leading-10 w-12 h-12 flex justify-center items-center m-1.5">
                            ＋
                        </Link>
                    </div>
                    <div className='w-full my-8 min-h-full'>
                        ここにスレッドを表示
                    </div>
                </div>

                <div className='border-solid border-2 w-3/4 min-h-full'>
                    <div className='w-full h-full border-solid border-2'>
                        <h3 className='text-center my-8 font-semibold text-xl'>MAP</h3>
                        <div className='w-4/5 h-72 mx-auto my-12'>
                            <LoadScript
                                googleMapsApiKey="AIzaSyCtWzUl7iuDKxNKU6tOTkLrCGly69PndV0"
                            >
                                <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={16}
                                >
                                { /* Child components, such as markers, info windows, etc. */ }
                                <></>
                                    <Marker position={center} label={props.port_name} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>

                    <div className='w-full h-full border-solid border-2'>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" className='w-full'>
                        <Tab icon={<FeedIcon />} label="基本情報" style={{width: "20%"}} />
                        <Tab icon={<DirectionsCarIcon />} label="駐車場情報" style={{width: "20%"}}/>
                        <Tab icon={<ErrorIcon />} label="注意事項" style={{width: "20%"}}/>
                        <Tab icon={<AddLocationAltIcon />} label="アクセス" style={{width: "20%"}}/>
                        <Tab icon={<PhoneIcon />} label="管理団体" style={{width: "20%"}}/>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}