import React from 'react'
import Link from 'next/link'
import InfoBox from './InfoBox'
const InfoBoxes = () => {
  return (
    <section>
        <div className='container-xl lg:container m-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                <InfoBox
                    heading='For Renters'
                    backgroundColor = 'bg-gray-100'
                    textColor='text-gray-800'
                    buttonInfo={{
                        text: 'Browse Properties',
                        link: '/properties/add',
                        backgroundColor: 'bg-black',
                        textColor: 'text-white hover:bg-gray-600',
                    }}
                    children='Find your dream rental property. Bookmark properties and contact owners.'
                />
                <InfoBox
                    heading='For Property Owners'
                    backgroundColor = 'bg-blue-100'
                    textColor='text-gray-800'
                    buttonInfo={{
                        text: 'Browse Properties',
                        link: '/properties/add',
                        backgroundColor: 'bg-blue-500',
                        textColor: 'hover:bg-blue-600 text-white'
                    }}
                    children={'List your properties and reach potential tenants. Rent as an airbnb or long term.'}
                />
            </div>
        </div>
    </section>
  )
}

export default InfoBoxes