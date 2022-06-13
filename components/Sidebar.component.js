import React, { useState, useEffect } from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    HeartIcon
} from '@heroicons/react/outline'

import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
const Sidebar = () => {

    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])

    //gets our initial state from playList Atom
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    console.log('playlist id >>> ', playlistId)

    //using my custom hook
    const spotifyApi = useSpotify()
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                console.log(data.body.items)
                setPlaylists(data.body.items)
            }).catch((error) => (alert('error getting playlist', error)))
        }
    }, [session, spotifyApi])
    return (
        <div className=' text-gray-500 p-5 text-xs lg:text-sm  sm:max-w-[12rem] lg:max-w-[15rem] border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen hidden  md:inline-flex  pb-36'>
            <div className='space-y-4'>

                <button className='flex item-center space-x-4 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>
                        Home
                    </p>

                </button>

                <button className='flex item-center space-x-4 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />

                    <p>
                        Search
                    </p>
                </button>


                <button className='flex item-center space-x-4 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>
                        Your Library
                    </p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                <button className='flex item-center space-x-4 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>
                        Create Playlist
                    </p>

                </button>

                <button className='flex item-center space-x-4 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />

                    <p>
                        Liked Songs
                    </p>
                </button>


                <button className='flex item-center space-x-4 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>
                        Your Episodes
                    </p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {playlists.map((playlist) => (

                    <p key={playlist.id} onClick={() => (setPlaylistId(playlist.id))} className="cursor-pointer hover:text-white">{playlist.name} </p>
                ))}


            </div>

        </div>

    )
}

export default Sidebar