import express from "express";
import Image from '../models/image'
const router = express.Router()

router.get('/images', async (req, res) => {

    console.log('get images')
    try {
        const foundImages = await Image.find({})
        console.log(foundImages)
        if (!foundImages) {
            return res.status(422).json({ error: "Something went wrong!" })
        }
        return res.json(foundImages)
    } catch (error) {
        console.log(error)
    }
})

router.post('/images', async (req, res) => {


    try {
        const { url, metadata, presetName } = req.body

        if (!url || !presetName) {
            return res.status(422).json({ error: 'Url and preset name must be there!' })
        }
        const newImage = new Image({
            url,
            metadata: {
                size: metadata.size,
                format: metadata.format
            },
            preset_name: presetName
        })
        const savedImage = await newImage.save()

        if (!savedImage) {
            return res.status(422).json({ error: 'Something went wrong!' })
        }
        console.log(savedImage)
        return res.json({
            message: 'Uploaded Successfully',
            savedImage
        })
    } catch (err) {
        console.log('Got this error =>', err)
    }
})

export default router