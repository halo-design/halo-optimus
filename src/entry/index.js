import es5 from 'bundle-loader?lazy&name=es5!es5-shim'
import es6 from 'bundle-loader?lazy&name=es5!es6-shim'
import esPromise from 'bundle-loader?lazy&name=promise!es6-promise'
import esFetch from 'bundle-loader?lazy&name=fetch!isomorphic-fetch'
import main from 'bundle-loader?lazy&name=main!CORE/main'

const userAgent = navigator.userAgent
const hasString = str => userAgent.indexOf(str) > -1
const isOpera = hasString('Opera')
const isIE = hasString('compatible') && hasString('MSIE') && !isOpera
const isEdge = hasString('Edge') || !isIE && hasString('Windows NT') && hasString(' Trident/7.0;')

if (isIE || isEdge) {
  window.fetch = null
}

if (isIE) {
  es5(() => es6(() => esFetch(main)))
} else {
  if (Promise) {
    fetch ? main() : esFetch(main)
  } else {
    fetch ? esPromise(fn => fn.polyfill() && main()) : es6(() => esFetch(main))
  }
}
