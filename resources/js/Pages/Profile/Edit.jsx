import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        introduction: auth.user.introduction, // 紹介文
        icon: auth.user.icon, // アイコン画像
    });

    const submitIntroduction = (e) => {
        e.preventDefault();
        post(route("introduction.update", data));
    }

    const submitIcon = (e) => {
        e.preventDefault();
        post(route("icon.update"), data);
    }

    const onChangeInput = (e) => {
        setData(e.target.name, e.target.value);
        console.log(data);
    }

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
    }};


    return (
        <>
            <Head title="Mypage" />

            <div className="shadow-md mx-auto w-11/12 flex justify-between items-center h-20 my-4 rounded-xl">
                <div className='flex items-center'>
                    <img src="/images/home/Fish_logo3.png" alt="logo" className='mx-5 w-16' />
                    <h1 className='text-3xl font-semibold'>マイページ</h1>
                </div>
                <div className="flex items-center mx-2">
                    {auth.user ? (
                        <>
                            {auth.user.name} 様
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
        
            <AuthenticatedLayout auth={auth}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                        {/* アイコン編集フォーム */}
                        <section className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">ユーザーアイコン</h2>
                                <p className="mt-1 text-sm text-gray-600">Update your account's profile icon.</p>
                            </header>
                            <div>
                                <form onSubmit={submitIcon} encType="multipart/form-data">
                                    <div className="flex items-center">
                                        {!auth.user.icon ? (
                                            <>
                                                <label htmlFor="icon" className='mt-3'>
                                                    <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 text-9xl cursor-pointer" />
                                                </label>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="icon">
                                                    <img src={auth.user.icon} alt="icon" className="mr-3 cursor-pointer border" />
                                                </label>
                                            </>
                                        )}
                                        <label className='bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded cursor-pointer ml-12' htmlFor="icon">
                                            画像を選択してください
                                        </label>
                                        <label htmlFor="icon" className='w-1/5 h-1/5 flex justify-center rounded-md p-2 mt-5'>
                                            <img src={imageData === '' ? '/images/icon/default.png' : imageData} alt="icon"
                                                className='w-32 h-32 object-cover cursor-pointer rounded-full' />
                                        </label>
                                        <input type="file" id='icon' accept='.png,.jpeg,.jpg,.svg,.gif' hidden
                                            onChange={(e) => {
                                                handleFileChange(e);
                                                setData('icon', e.target.files[0]);
                                            }} />
                                    </div>
                                    <PrimaryButton processing={processing} className="mt-2">Save</PrimaryButton>
                                </form>
                            </div>
                        </section>


                        {/* ユーザー名 メアド 編集フォーム */}
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"/>
                        </div>

                        
                        {/* 紹介文編集フォーム */}
                        <section className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">紹介文</h2>
                                <p className="mt-1 text-sm text-gray-600">Update your account's profile introduction.</p>
                            </header>
                            <form onSubmit={submitIntroduction} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel for="name" value="紹介文" />
                                    <TextInput
                                        id="name"
                                        name="introduction"
                                        className="mt-1 block w-full"
                                        value={auth.user.introduction}
                                        handleChange={onChangeInput}
                                        required
                                        autoComplete="name"/>
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton processing={processing}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>

                        {/* パスワード変更フォーム */}
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        {/* アカウント削除フォーム */}
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>

                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
