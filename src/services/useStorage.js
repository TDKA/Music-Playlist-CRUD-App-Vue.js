import { ref } from 'vue'
import {firestore, storage} from '../firebase/config'
import getUser from '@/services/getUser'

const { user } = getUser()
const useStorage  = () => {
    const error = ref(null)
    const url = ref(null)
    const imgPath = ref(null)
    // uploadImg
    const uploadImg = async (file) => {
        imgPath.value = `images/${user.value.uid}/${file.name}`

        const storageRef = storage.ref(imgPath.value)

        try {
            const response = await storageRef.put(file)
            url.value = await response.ref.getDownloadURL()
        }catch(err) {
            console.log(err.message);
            error.value = err.message
        }

    }
    // Delete Image
    const deleteImg = async (imgPath) => {
        const storageRef = storage.ref(imgPath)
        try {
         await storageRef.delete()

        }catch(err) {
            error.value = err.message
            console.log(err.message);
        }
    }

    return { error, url, imgPath, uploadImg, deleteImg}
}

export default useStorage