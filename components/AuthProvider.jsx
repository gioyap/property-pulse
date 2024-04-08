'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>

    </SessionProvider>
  )
}

export default AuthProvider