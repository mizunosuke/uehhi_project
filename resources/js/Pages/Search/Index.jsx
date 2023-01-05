import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function PortSearch (props) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={        
            <div className='header_container'>
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">釣り場を探す</h1>
            </div>
            }
            >
                <Head title="Search" />

            </AuthenticatedLayout>

            <div>
                
            </div>
        </div>
    )
}