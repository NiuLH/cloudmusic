import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Mine from './components/home/Mine'
import Find from './components/home/Find'
import Village from './components/home/Village'
import Video from './components/home/Video'
import Recommendation from './components/home/Recommendation'
import RankingList from './components/home/RankingList'
import Radio from './components/home/Radio'
import PlayList from './components/home/PlayList'
import PlayListDetail from './components/home/PlayListDetail'
import RankingListDetail from './components/home/RankingListDetail' 
Vue.use(VueRouter);
var routes=[
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'/home/mine',
                component:Mine,
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'/home/find',
                component:Find,
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'/home/village',
                component:Village,
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'/home/video',
                component:Video,
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'/',
                redirect:'/home/find',
                meta:{
                    keepAlive:true
                }
            }
        ]
    },
    {
        path:'/home/recommendation',
        component:Recommendation,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/home/rankingList',
        component:RankingList,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/home/playList',
        component:PlayList,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/home/radio',
        component:Radio,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/playListDetail/:id',
        component:PlayListDetail,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/rankingListDetail',
        component:RankingListDetail,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/',
        redirect:'/home'
    }
]
var router=new VueRouter({
    routes
})
export default router