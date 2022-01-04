
import {ref} from 'vue'
import { auth } from '../firebase/config'


const user = ref(auth.currentUser)

auth.onAuthStateChanged(authUser => {
    user.value=authUser
    console.log('Current User is ', authUser);
}) 

const getUser = () => {
    return {user}
}

export default getUser