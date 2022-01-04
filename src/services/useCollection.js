
import {ref} from 'vue'
import { firestore } from '../firebase/config'




const useCollection = () => {
    // loader
    const isLoading = ref(false)
    const error = ref(null)

        
    const addDocument = async (doc) => {
        isLoading.value = true
        error.value=null;
        try {
          const res =  await firestore.collection('playlist').add(doc)
            isLoading.value = false

            return res
        }catch(err) {
            isLoading.value = false
            console.log(err.message);
            error.value = 'Message is not sended ....'
        }

    }
    return { error, addDocument, isLoading}

}


export default useCollection