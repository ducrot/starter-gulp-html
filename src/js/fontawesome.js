/********************************************************************
 * Font Awesome
 * SVG JavaScript Core
 * https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
 * https://fontawesome.com/how-to-use/with-the-api/setup/importing-icons
 * https://fontawesome.com/icons?d=gallery
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core'


// fas free-solid-svg-icons
import {
    faHome, faBars, faCheck, faCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faHome, faBars, faCheck, faCircle
)


// far free-regular-svg-icons
import {
    faSmile
} from '@fortawesome/free-regular-svg-icons'

library.add(faSmile)


// fab free-brands-svg-icons
import {
    faApple,
    faYoutube, faFacebookF, faTwitter, faXing, faPinterest, faInstagram
} from '@fortawesome/free-brands-svg-icons'

library.add(faApple, faYoutube, faFacebookF, faTwitter, faXing, faPinterest, faInstagram)


// fas pro-solid-svg-icons
import {
    faLightbulbOn as fasFaLightbulbOn
} from '@fortawesome/pro-solid-svg-icons'

library.add(
    fasFaLightbulbOn
)


// far pro-regular-svg-icons
import {
    faLightbulbOn as farFaLightbulbOn, faSearch as farFaSearch
} from '@fortawesome/pro-regular-svg-icons'

library.add(
    farFaLightbulbOn, farFaSearch
)


// fal pro-light-svg-icons
import {
    faCircle as falFaCircle
} from '@fortawesome/pro-light-svg-icons'

library.add(
    falFaCircle
)


// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()
