export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT === null ? 3000 : process.env.PORT
        return `http://localhost:${process.env.PORT}`
    }

    return `https://${process.env.VERCEL_URL}`
}