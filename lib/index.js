import cubeTable from './tablePlugin/index'
import cubeCard from './cardPlugin/index'
import '../static/base.css'
const components = [
  cubeTable,
  cubeCard,
]
const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  cubeTable,
  cubeCard,
}
export default {
  install,
  ...components,
};