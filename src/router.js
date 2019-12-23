import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Mine from './components/home/Mine'
import Find from './components/home/Find'
import Village from './components/home/Village'
import Video from './components/home/Video'
import Recommendation from './components/home/Recommendation'
import RankingList from './components/home/RankingList'
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
        path:'/',
        redirect:'/home'
    }
]
var router=new VueRouter({
    routes
})
export default router