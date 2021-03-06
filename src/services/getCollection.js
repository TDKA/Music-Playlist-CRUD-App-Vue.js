
import {ref, watchEffect} from 'vue'
import { firestore } from '../firebase/config'


const getCollection = (collection, query) => {
    const docs = ref(null)
    const error = ref(null)

    let collectionRef = firestore.collection(collection).orderBy('createdAt')

    if(query) {
        collectionRef = collectionRef.where(...query)
    }

    //Set real time listener
  const unsub = collectionRef.onSnapshot((snap) => {
        console.log('snapshot');
        let results = [];
        // console.log(collectionRef);
        // console.log(snap);
        snap.docs.forEach((doc) => {
            doc.data().createdAt &&
            // console.log(doc);
            results.push({...doc.data(), id: doc.id})
        })
        docs.value=results
        error.value=null
    }, (err) => {
        console.log(err.message);
        docs.value =null
        error.value="Opsss ...."
    })

    watchEffect( (onInvalidate) => {
        //unmounted component / unsubscribe from previous collection when watcher stopps
        onInvalidate(() => unsub())
    })
    return { docs, error}
}

export default getCollection