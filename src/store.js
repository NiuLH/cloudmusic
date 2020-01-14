import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
    switch: false,
    songId: '',//歌曲id
    songCover: '',//歌曲封面
    songName: '',//歌曲名称
    singer: '',//歌手
    rankingType: '',//榜单类型id，1,2,3,4
    rankingTitle: '',//榜单标题
    rankingDescribe: '',//榜单描述
    rankingCover: '',//榜单封面
}
const mutations = {
    // 第一次播放
    playMusic(state, obj) {
        state.switch = obj.switch;
        state.songId = obj.id;
        state.songCover = obj.picUrl;
        state.songName = obj.songName;
        state.singer = obj.singer;
    },
    // 退出播放页
    backMusic(state, flag) {
        state.switch = flag;
    },
    // 显示播放页
    showPlayer(state, flag) {
        state.switch = flag;
    },
    // 传递排行榜数据
    getRankingData(state, obj) {
        var name = obj.name;
        state.rankingTitle=obj.name;
        state.rankingDescribe=obj.describe;
        state.rankingCover=obj.cover;
        var type = '';//类型
        switch (name) {
            case '云音乐新歌榜':
                type = "0";
                break;
            case '云音乐热歌榜':
                type = "1";
                break;
            case '网易原创歌曲榜':
                type = "2";
                break;
            case '云音乐飙升榜':
                type = "3";
                break;
            case '云音乐电音榜':
                type = "4";
                break;
            case 'UK排行榜周榜':
                type = "5";
                break;
            case '美国Billboard周榜':
                type = "6";
                break;
            case 'KTV嗨榜':
                type = "7";
                break;
            case 'iTunes榜':
                type = "8";
                break;
            case 'Hit FM Top榜':
                type = "9";
                break;
            case '日本Oricon周榜':
                type = "10";
                break;
            case '韩国Melon排行榜周榜':
                type = "11";
                break;
            case '韩国Mnet排行榜周榜':
                type = "12";
                break;
            case '韩国Melon原声周榜':
                type = "13";
                break;
            case '中国TOP排行榜(港台榜)':
                type = "14";
                break;
            case '中国TOP排行榜(内地榜)':
                type = "15";
                break;
            case '香港电台中文歌曲龙虎榜':
                type = "16";
                break;
            case '华语金曲榜':
                type = "17";
                break;
            case '中国嘻哈榜':
                type = "18";
                break;
            case '法国NRJ Euro Hot30周榜':
                type = "19";
                break;
            case '台湾Hito排行榜':
                type = "20";
                break;
            case 'Beatport全球电子舞曲榜':
                type = "21";
                break;
            case '云音乐ACG音乐榜':
                type = "22";
                break;
            case '云音乐说唱榜':
                type = "23";
                break;
            case '云音乐古典音乐榜':
                type = "24";
                break;
            case '云音乐电音榜':
                type = "25";
                break;
            case '抖音排行榜':
                type = "26";
                break;
            case '新声榜':
                type = "27";
                break;
            case '云音乐韩语榜':
                type = "28";
                break;
            case '英国Q杂志中文版周榜':
                type = "29";
                break;
            case '电竞音乐榜':
                type = "30";
                break;
            case '云音乐欧美热歌榜':
                type = "31";
                break;
            case '云音乐欧美新歌榜':
                type = "32";
                break;
            case '说唱TOP榜':
                type = "33";
                break;
            default:
                type="0";
                break;
        }
        state.rankingType=type;
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store