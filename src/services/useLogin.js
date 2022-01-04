import {ref} from 'vue'
import  {auth}  from '../firebase/config';

const error = ref(null);

    // loader
    const isLoading = ref(false)


const login = async (email, password) => {
    isLoading.value= true
    error.value= null
    try {
        const response = await auth.signInWithEmailAndPassword(email, password)
        error.value=null
        
        isLoading.value = false

        return response
    }
    catch(err){
        isLoading.value = false
        error.value = 'Incorrect email or password !'
    }

}

const useLogin = () => {
    return {login, error, isLoading}
}

export default useLogin