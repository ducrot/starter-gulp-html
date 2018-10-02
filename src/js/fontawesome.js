/********************************************************************
 * Font Awesome
 * SVG JavaScript Core
 * https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
 * https://fontawesome.com/icons?d=gallery
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core'


// fas
import {
    faHome, faBars, faCheck
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faHome, faBars, faCheck
)


// far
import {
    faSmile
} from '@fortawesome/free-regular-svg-icons'

library.add(faSmile)


// fab
import {
    faApple
} from '@fortawesome/free-brands-svg-icons'

library.add(faApple)


// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()