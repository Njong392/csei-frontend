import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faFile, faHouse, faUser, faGear, faRightFromBracket, faCaretDown, faEnvelope, faPhone, faCircleCheck, faLink, faDownload, faPen, faCaretLeft, faCaretRight, faFilter, faList, faGrip, faGripVertical } from '@fortawesome/free-solid-svg-icons'


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
library.add(faPen)
library.add(faCaretLeft)
library.add(faCaretRight)
library.add(faFilter)
library.add(faList)
library.add(faGrip)
library.add(faGripVertical)


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
