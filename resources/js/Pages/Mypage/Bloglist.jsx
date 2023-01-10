import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import HistoryBackBtn from '@/Components/HistoryBackBtn';


export default function Sns(props) {
  // propsをdataに入れる
  // 検索したときにコントローラーでまたpropsにデータを渡し表示させる
  // let dataList = props;
  console.log(props);
  // console.log(props.posts);
  // console.log(props.post.data[0].image);

  const { data, setData, post, processing, errors, reset } = useForm({ word: "" });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
    console.log(data);
    // console.log(data);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("sns.search", data));
  };

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
    </>
  )
}