import { Schema, model } from 'mongoose'

const imageSchema = new Schema({

    url: String,
    metadata: {
        size: Number,
        format: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    },
    preset_name : String

})

export default model('image', imageSchema)