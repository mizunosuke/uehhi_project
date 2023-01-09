import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faComment, faHeart, faCircleUser } from "@fortawesome/free-solid-svg-icons";

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
              <p>{props.auth.user.name}様</p>
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
        
        <div className="relative">
          <form onSubmit={submit} className="flex justify-center items-center my-10">
            <div className='flex items-center border-solid border-gray-400'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-3" />
              <input id="searchWord" name="word" value={data.word} type="text" placeholder='住所、魚種を入力して投稿を検索...'
                className='rounded border-gray-500 w-96' onChange={onHandleChange} />
              </div>
            <button className='bg-blue-500 rounded text-white font-medium leading-10 w-20 h-10 m-1.5' disabled={processing}>
              検索
            </button>
          </form>
          
          <Link href={route('sns.create')}
            className="absolute right-1/4 top-1 bg-blue-500 rounded-full text-lg text-white font-medium leading-10 w-8 h-8 flex justify-center items-center m-1.5">
              ＋
          </Link>
        </div>

        <div className="flex justify-center">
          <div id="displayItem" className="flex flex-wrap w-11/12 box-border">
            {
              props.posts.map((x) => (
                  // console.log('hoge');
                  // const element = document.getElementById('displayItem');
                  // element.innerHTML = htmlElements;
                  <div className="w-1/4 p-2.5">
                    <div className="border rounded-md">
                      <div className="p-2 relative">
                        <img src={x.image} alt="image" className="p-2 w-full h-60 object-cover rounded-md border" />
                        <div className="flex items-center absolute bottom-6 left-8">
                        {!x.user.icon ? (
                          <>
                              <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 mr-3 text-4xl" />
                          </>
                        ) : (
                            <>
                              <img src="#" alt="icon" className="mr-3" />
                            </>
                        )}
                        {/* Userモデルとrelationさせてusernameを表示させるのに参考になった記事
                         https://blog.capilano-fw.com/?p=10909#i-9 */}
                        <p className="text-white bg-gray-600 rounded-md px-2 bg-opacity-70">{ x.user.name }</p>
                        </div>
                      </div>
                      <h2 className="text-center text-xl">{x.kind}</h2>
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faComment} />
                        <p>{ x.content }</p>
                      </div>
                      <div className="flex justify-end mr-3 my-2">
                      <table className="text-gray-500">
                        <tbody>
                          <tr>
                            <td>地域：</td>
                            <td>{ x.prefecture} { x.area }</td>
                          </tr>
                          <tr>
                            <td>釣った日：</td>
                            <td>{ x.date }</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {props.auth.user ? (
                      <>
                        <div className="flex justify-end">
                          <FontAwesomeIcon icon={faHeart} className="text-gray-500 cursor-pointer" />
                          <FontAwesomeIcon icon={faHeart} className="text-red-500 cursor-pointer" />
                          <p>13</p>
                        </div>
                      </>
                    ) : (
                        <>
                        </>
                    )}
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        </>
    );
}
