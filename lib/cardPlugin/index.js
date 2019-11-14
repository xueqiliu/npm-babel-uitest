import CubeCardPreview from "./defaultCard.vue"

CubeCardPreview.install = Vue =>Vue.component(CubeCardPreview.name,CubeCardPreview);

if(typeof window !=='undefined' && window.Vue){
    window.Vue.use(CubeCardPreview);
}
export default CubeCardPreview;