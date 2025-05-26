import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faFile, faHouse, faUser, faGear, faRightFromBracket, faCaretDown, faEnvelope, faPhone, faCircleCheck, faLink, faDownload } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faHouse)
library.add(faUser)
library.add(faBell)
library.add(faFile)
library.add(faGear)
library.add(faRightFromBracket)
library.add(faCaretDown)
library.add(faEnvelope)
library.add(faPhone)
library.add(faCircleCheck)
library.add(faLink)
library.add(faDownload)


createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
