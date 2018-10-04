import svg4everybody from 'svg4everybody'

svg4everybody({
    fallback: function (src, svg, use) {
        return false
    }
})