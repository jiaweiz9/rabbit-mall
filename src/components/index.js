import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
    install (app) {
        app.Component('XtxImageView', ImageView)
        app.Component('XtxSku', Sku)
    }
}