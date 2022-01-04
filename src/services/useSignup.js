import {ref} from 'vue'
import  {auth}  from '../firebase/config';

const error = ref(null)
const isLoading = ref(false)

const signup = async (email, password, displayName) => {

    error.value = null;
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password)
        console.log(response );

        if(!response) {
            throw new Error('Ops... try again !')
        }
        await response.user.updateProfile({ displayName })

        error.value = null
        isLoading.value = false

     return response
     console.log(response);
    }
    catch(err) {
        error.value = "This email is already used in another account !"
        isLoading.value = true
        console.log(err.message);
    }

}
const useSignup =  () => {
    return  { error, signup, isLoading }
}

export default useSignup