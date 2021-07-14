import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { signOut, useSession } from 'next-auth/client'

function Header() {
    const [session]=useSession()
    return (
        <div className=" sticky top-0 z-50 px-4 py-2 shadow-md bg-white flex items-center">
            <Button
                color="gray"
                buttonType="outline"
                rou nded={true}
                className="md:inline-flex h-20 w-20 border-0"
                iconOnly={true}
                ripple="dark" >
                <Icon name="menu" size="3xl" />

            </Button>
            <Icon color="gray" name="description" size="5xl" />
            <h1 className="md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>

            <div className="mx-5 md:mx-20 flex items-center flex-grow bg-gray-100 px-5 py-2 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
                <Icon name='search' size="3xl" color="gray" />
                <input className='flex-grow outline-none text-gray-600 px-5 bg-transparent text-base' type="text" />
            </div>
            <Button
                color="gray"
                buttonType="outline"
                rou nded={true}
                className="ml-5 md:ml-20 h-20 w-20 border-0"
                iconOnly={true}
                ripple="dark" >
                <Icon name="apps" size="3xl" />

            </Button>
            <img onClick={signOut} className='cursor-pointer ml-2 h-12 w-12 rounded-full' src={session?.user?.image} alt="Hi" loading='lazy' />
        </div>
    )
}

export default Header
