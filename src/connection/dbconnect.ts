import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected")
        return
    }

    try {
        const result = await mongoose.connect(`${process.env.MONGODB_URI}`)
        connection.isConnected = result.connections[0].readyState
    } catch (error) {
        console.log("Error in connecting to DB", error)
        process.exit()
    }
}