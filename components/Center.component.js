import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

import Songs from './Songs.component'
const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]
const Center = (props) => {
    const { data: session } = useSession()
    const [color, setColor] = useState(null)
    const spotifyApi = useSpotify()
    const [playlist, setPlayList] = useRecoilState(playlistState)

    //gets our initial state from playList Atom
    //const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    //to make the state read only
    const playlistId = useRecoilValue(playlistIdState)
    useEffect(() => {

        //changes the color of the background using shuffle from lodash
        setColor(shuffle(colors).pop())
    }, [playlistId])


    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
            .then((data) => setPlayList(data.body))
            .catch((error) => alert('you have an error', error))

    }, [spotifyApi, setPlayList, playlistId])
    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide '>


            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2' onClick={signOut}>
                    {/* 
                    <Image src={session?.user?.image}
                        alt={session?.user?.name} width={10} height={10} /> */}
                    <img
                        className='rounded-full w-10 h-10'
                        src={session?.user.image}
                        alt={session?.user?.name}
                    />


                    <h2>
                        {session?.user.name}
                    </h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} from-red-500 h-80 text-white padding-8`}>




                <img className=' h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />

                <h1>

                    <div>
                        <p>
                            PLAYLIST
                        </p>

                        <h1 className='text-2xl md:text-3xl xl:text-5xl '>
                            {playlist?.name}

                        </h1>
                    </div>
                </h1>
            </section>

            <div>
                <Songs />
            </div>
        </div>

    )
}

export default Center  