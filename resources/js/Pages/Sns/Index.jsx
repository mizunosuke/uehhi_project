import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm } from '@inertiajs/inertia-react';

export default function Sns(props) {
  const { data, setData, post, processing, errors, reset } = useForm({ word: "" });
  const onHandleChange = (event) => { setData(event.target.value) };
  const submit = (e) => {
    e.preventDefault();
    post(route("sns.search"));
  };
  
    return (
        <>
        <Head title="釣り人の今" />
          <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
            <div className='flex items-center'>
              <img src="#" alt="logo" className='mx-5' />
              <h1 className='text-3xl font-semibold'>釣り人の今</h1>
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
        
          <AuthenticatedLayout auth={props.auth} errors={props.errors} header={<></>} />
        <label htmlFor="searchWord">
          <div className='flex'>
            <input id="searchWord" type="text" placeholder='住所、魚種を入力して投稿を検索...'
              className='border-none'/>
          </div>
        </label>
        </>
    );
}
