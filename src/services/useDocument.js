
import { ref } from "vue";
import { firestore } from "../firebase/config";

const useDoc = (collection, id) => {

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

    return {isLoading, error, deleteDoc}

}

export default useDoc