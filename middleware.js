export { default } from 'next/auth/middleware'

//going back to sign in page if the user is not log in
export const config = {
    matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
}