import {createWebHistory,createRouter} from"vue-router"
import HomePage from "../pages/HomePage.vue"
import LoginPage from "../pages/LoginPage.vue"
import RequestsPage from "@/pages/RequestsPage.vue"
import ConfigrationPage from "@/pages/ConfigrationPage.vue"
import TeamsPage from "@/pages/configration/TeamsPage.vue"
import SingleTeamPage from "@/pages/configration/SingleTeam.vue"
import CalendarPage from "@/pages/CalendarPage.vue"
import ReportPage from "@/pages/ReportPage.vue"
import StandupPage from "@/pages/StandupPage.vue"
import SingleStandup from "@/pages/SingleStandup.vue"
const routes =[
    {
        name:"HomePage",
        path:"/",
        component:HomePage,
        // meta:{
        //     requireAuth:true
        // }
    },
    {
        name:"LoginPage",
        path:"/login",
        component:LoginPage,
        // meta:{
        //   hideForAuth:true
        // }
    },
    {
        name:"RequestPage",
        path:"/request",
        component:RequestsPage
    },
    {
     name:"CalendarPage",
     path:'/calendar',
     component:CalendarPage
    },
    {
        name:"ConfigrationPage",
        path:"/configration",
        component:ConfigrationPage
    },{
        name:'TeamsPage',
        path:'/configration/teams',
        component:TeamsPage,
    },
    
    {
        name:"ReportPage",
        path:'/report',
        component:ReportPage
    },
    {
        name:'SingleTeamPage',
        path:'/configration/teams/:id',
        component:SingleTeamPage
    },
    {
        name:"StandupPage",
        path:'/standups',
        component:StandupPage
    },
    {
        name:"SingleStandupPage",
        path:'/standups/:id',
        component:SingleStandup
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router