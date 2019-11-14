import CubeTablePreview from './defaultTable.vue'

CubeTablePreview.install = Vue => Vue.component(CubeTablePreview.name, CubeTablePreview);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CubeTablePreview);
}

export default CubeTablePreview;