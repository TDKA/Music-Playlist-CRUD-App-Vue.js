    
import {ref, watchEffect} from 'vue'
import { firestore } from '../firebase/config'


const getDocument = (collection, id) => {

    const document = ref(null)
    const error = ref(null)

    let docRef = firestore.collection(collection).doc(id)

    //Set real time listener
  const unsub = docRef.onSnapshot(doc => {
        if(doc.data()) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null; 

        }

    }, err => {
        console.log(err.message);
        error.value="Couldn' fetch the data..."
    })
    watchEffect((onInvalidate) => {
        //unmounted component / unsubscribe from previous collection when watcher stopps
        onInvalidate(() => unsub())
    })
    return { document, error}
}

export default getDocument