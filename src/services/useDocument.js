
import { ref } from "vue";
import { firestore } from "../firebase/config";

const useDocument = (collection, id) => {

    let error = ref(null)
    let isLoading = ref(false)

    let docRef = firestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await docRef.delete()
            isLoading.value = false
            return response
        }catch (err) {
            error.value = err.message
            isLoading.value = false
        }
    }
    const updateDoc = async (updates) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await docRef.update(updates)
            isLoading.value = false
            return response
        }catch (err) {
            isLoading.value = false
            error.value = err.message
        }
    }


    return {isLoading, error, deleteDoc, updateDoc}

}

export default useDocument