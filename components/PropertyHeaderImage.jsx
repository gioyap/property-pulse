import React from 'react'
import Image from 'next/image'

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div class="container-xl m-auto">
        <div class="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            class="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage