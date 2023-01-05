import { Link, Head } from "@inertiajs/inertia-react"

export default function Home (props) {
    return (
        <div>
            <Head title="Home"/>
            <h1>HOME画面です</h1>

            <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                {props.auth.user ? (
                    <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Log in
                        </Link>

                        <Link
                            href={route('register')}
                            className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
        
    )
}

