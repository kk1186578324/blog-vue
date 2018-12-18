import {KEY,VALUE} from './mutation-type.js'

export default {
  keyAction({commit}, {key}) {
    commit(KEY, key);
  }
};
