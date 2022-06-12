import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
const Center = (props) => {
    const { data: session } = useSession()
    return (
        <div className='flex flex-grow text-white'>

            <h2>
                center
            </h2>

            <header>
                <div>
                    <img
                        className='rounded-full w-10 h-10'
                        src={session?.user?.image}
                        alt={session?.user?.name}
                    />

                </div>
            </header>
        </div>
    )
}

export default Center  