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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Thread from '../Thread/Index';



export default function ShowPort (props) {


    console.log(props);

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
                    <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                    <h1 className='text-3xl font-semibold'>釣り場詳細</h1>
                </div>
                <div className="flex items-center mx-3">
                        {props.auth.user ? (
                        <>
                            {props.auth.user.name}様
                            <a href={route('mypage.index')} className="fa-3x p-2.5" src="mypage_icon"><FontAwesomeIcon icon={faCircleUser} className="text-blue-900"/></a>
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

            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            >
                <Head title="Search" />
            </AuthenticatedLayout>

            <div className='min-w-full border-2 border-solid'>
                <h1 className='text-center mx-auto my-12 text-4xl font-semibold'>{props.ports.port_name}</h1>
                <p className='text-center mx-auto my-12 text-xl font-semibold'>{props.ports.access}</p>
                <div className='w-full '>
                    <img src={props.image} alt="" />
                </div>
            </div>

            <div className='flex'>
                <div className='border-solid border-2 w-1/4 min-h-full'>
                    <div className='w-full my-8 relative'>
                        <h3 className='text-center font-semibold text-2xl'>{props.ports.port_name}の近況</h3>
                        <Link href={route('sns.create')}
                            className="absolute left-12 -top-4 bg-blue-500 rounded-full text-2xl text-white font-medium leading-10 w-12 h-12 flex justify-center items-center m-1.5">
                            ＋
                        </Link>
                    </div>
                    <div className='w-full my-8 min-h-full'>
                        {props.threads.map((thread) => (
                            <div className='w-4/5 my-2 mx-auto border-solid border-2'>
                                <div className='border-b-2 border-solid border-red-50 flex'>
                                    {!thread.user.icon ? (
                                        <div>
                                            <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 mr-3 text-4xl" />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={thread.user.icon} alt="" />
                                        </div>
                                    )}
                                    <h3>{thread.user.name}</h3>
                                    {/* <span>posted at {thread.created_at}</span> */}
                                </div>
                                <p>{thread.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='border-solid border-2 w-3/4 min-h-full'>
                    <div className='w-full h-full'>
                        <h3 className='text-center font-semibold text-xl'>MAP</h3>
                        <div className='w-4/5 h-72 mx-auto'>
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

                        {value === 0 && <div>タブ1のコンテンツが表示されます</div>}
                        {value === 1 && <div>タブ2のコンテンツが表示されます</div>}
                        {value === 2 && <div>タブ3のコンテンツが表示されます</div>}
                        {value === 3 && <div>タブ4のコンテンツが表示されます</div>}
                        {value === 4 && <div>タブ5のコンテンツが表示されます</div>}
                    </div>
                </div>
            </div>
        </div>

        
    )
}