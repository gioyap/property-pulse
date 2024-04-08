import connectDB from "@/config/database"
import Property from "@/models/Property"
import {  getServerSession } from 'next-auth/next'
import { authOptions } from "@/utils/authOption"
import { getSessionUser } from "@/utils/getSessionUser"
import cloudinary from "@/config/cloudinary"
//get /api/properties
export const GET = async (request) => {
    try {
        await connectDB()

        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), {
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status: 500})
    }
}

export const POST = async (request) => {
    try {
        await connectDB()    
        const getSessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401})
        }

        const {userId} = sessionUser

        const formData = await request.formData()

        //access all values from amenites and images
        const amenites = formData.getAll('amenites')
        const images = formData.getAll('images').filter((image) => image.name !== '')

        //create propertydata object for db
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                state: formData.get('location.state'),
                city: formData.get('location.city'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('squarefeet'),
            amenites,
            rates: {
                weekly: formData.get('location.weekly'),
                monthly: formData.get('location.monthly'),
                nightly: formData.get('location.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        }

        //upload image(s) to cloudinary
        const imageUploadPromises = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint*Array(imageBuffer))
            const imageData = Buffer.from(imageArray)
            
            //convert the image data to base64
            const imageBase64 = imageData.toString('base64')

            //make r equest to upload to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder: 'PropertyPulse'
                }
            )

            imageUploadPromises.push(result.secure_url)

            //wait for all images to upload
            const uploadImages = await Promise.all(imageUploadPromises)
            //add uploaded images to the propertydata object
            propertyData.images= uploadImages
        }

        const newProperty = new Property(propertyData)
        await newProperty.save()

        return Response.redirect(
            `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
        )

        // return new Response(JSON.stringiify({ message: 'Success'}), {
        //     status: 200,
        // })
    } catch (error) {
        return new Response('Failed to add property', { status: 500})
    }
}