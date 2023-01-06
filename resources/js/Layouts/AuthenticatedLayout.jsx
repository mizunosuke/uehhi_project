import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="h-1/5">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 min-w-full">
                        <div className="flex min-w-full">

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('home.index')} active={route().current('home.index')}>
                                    <div className='text-base'>
                                        HOME
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('mypage.index')} active={route().current('mypage.index')}>
                                    <div className='text-base'>
                                        マイページ
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('blog.index')} active={route().current('blog.index')}>
                                    <div className='text-base'>
                                        釣行日記
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('sns.index')} active={route().current('sns.index')}>
                                    <div className='text-base'>
                                        釣り人の今
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('community.index')} active={route().current('community.index')}>
                                    <div className='text-base'>
                                        コミュニティ
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('search.index')} active={route().current('search.index')}>
                                    <div className='text-base'>
                                        釣り場を探す
                                    </div>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex w-36">
                                <NavLink href={route('home.index')} active={route().current('home.index')}>
                                    <div className='text-base'>
                                        よくある質問
                                    </div>
                                </NavLink>
                            </div>

                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>



            <main>{children}</main>
        </div>
    );
}
