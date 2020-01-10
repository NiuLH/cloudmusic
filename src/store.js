import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
    switch:false,
    songId:'',//歌曲id
    songCover:'',//歌曲封面
    songName:'',//歌曲名称
    singer:''//歌手
}
const mutations={
    playMusic(state,obj){
        state.switch=obj.switch;
        state.songId=obj.id;
        state.songCover=obj.picUrl;
        state.songName=obj.songName;
        state.singer=obj.singer;
    },
    backMusic(state,flag){
        state.switch=flag;
    },
    showPlayer(state,flag){
        state.switch=flag;
    }
}
const store=new Vuex.Store({
    state,
    mutations
})
export default store