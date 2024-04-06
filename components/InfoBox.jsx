import React from 'react'
import Link from 'next/link'
const InfoBox = ({
    heading,
    backgroundColor,
    textColor,
    buttonInfo,
    children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
        <h2 className={`text-2xl font-bold ${textColor}`}> 
            {heading}
        </h2>
        <p className={`mt-2 mb-4 ${textColor}`}>
            {children}
        </p>
        <Link 
            href={buttonInfo.link}
            className={`inline-block ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-2 hover:opacity-90`}   
        >
        {buttonInfo.text}
        </Link>
    </div>
  )
}

export default InfoBox