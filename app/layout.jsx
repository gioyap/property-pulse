import React from 'react'
import '@/assets/styles/global.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
    title: 'PropertyPulse | Find the Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rentel, find rentals, find properties',
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <html lang='en'>
        <body>
            <Navbar/>
            <div>{children}</div>
        </body>
    </html>
    </AuthProvider>
    
  )
}

export default MainLayout