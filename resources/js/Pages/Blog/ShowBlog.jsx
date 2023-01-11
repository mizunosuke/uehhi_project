import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Link, Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";


// トップに戻るbuttonのcss
const returnTopButton = {
    position: "fixed",
    bottom: "50px",
    right: "60px",
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

  const ShowBlog = (props) => {
    const data = {
      labels: ['0時', '3時', '6時', '9時', '12時', '15時','18時','21時','24時',],
      datasets: [{
        data: [112, 134, 223, 200, 189, 133, 110, 132, 178],
        backgroundColor: 'transparent',
        pointBorderColer: '#000080',
        pointBorderWith: 4,
        tension: 0.5
      }]
    };
    const options = {
      plugin: {
        legend: false,
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          min: 2,
          max: 10,
          ticks: {
            stepSize: 2,
            callBack: (value) => value + 'K'
          },
          grid: {
            borderDash: [10]
          }
        }
      }
    }

  return (
    <>
    <Head title="Home" />

    {/* Header(ログイン時と非ログイン時で条件分岐) */}
    <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
        <div className='flex items-center'>
            <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
            <h1 className='text-3xl font-semibold'>釣行日記詳細</h1>
        </div>
        <div className="flex items-center mx-2">
            {props.auth.user ? (
                <>
                    {props.auth.user.name}様
                    <a href={route('mypage.index')} className="fa-3x p-2.5" src="mypage_icon"><FontAwesomeIcon icon={faCircleUser} /></a>
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

    {/* TOPへスクロールで戻るボタン */}
    <div style={returnTopButton}>
        <a href="#" src=""><FontAwesomeIcon icon={faCircleUp} /></a>
    </div>
    <div className="w-full h-72">
      <Line data={data} option={options}></Line>
    </div>
    
    </>
    )
}

export default ShowBlog