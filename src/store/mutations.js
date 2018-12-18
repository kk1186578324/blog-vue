import {KEY,VALUE}from './mutation-type.js';
// import index from "@/components/leftMenu"
export default {
  onSubmit(state,param) {
    console.log(state,param)
    state.key = param.key;
    state.value = param.value;


  }
};
