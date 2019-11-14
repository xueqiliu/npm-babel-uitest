import service from './service'
export default {
    install(Vue) {
        Vue.prototype.$axios = service
    }
}