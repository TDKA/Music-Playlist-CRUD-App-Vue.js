import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { auth } from './firebase/config'
// styles
import './assets/style.css'

let app;

auth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App).use(router).mount('#app')
    }
})

