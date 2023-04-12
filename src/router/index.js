import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RequestsPage from "@/pages/RequestsPage.vue";
import ConfigrationPage from "@/pages/ConfigrationPage.vue";
import TeamsPage from "@/pages/configration/TeamsPage.vue";
import SingleTeamPage from "@/pages/configration/SingleTeam.vue";
import CalendarPage from "@/pages/CalendarPage.vue";
import ReportPage from "@/pages/ReportPage.vue";
import StandupPage from "@/pages/StandupPage.vue";
import SingleStandup from "@/pages/SingleStandup.vue";
import AllRequests from "@/pages/AllRequests.vue"
import LeaveTypes from "@/pages/configration/LeaveTypes.vue"
import AllHolidays from "@/pages/configration/AllHolidays.vue"
import RolesPage from "@/pages/RolesPage.vue"
import { useUserStore } from "@/store/userStore";
import CreateStandup from "@/pages/CreateStandup.vue"
import EmployeePage from "@/pages/configration/EmployeePage.vue"
import Test from "@/pages/VortexAnimation.vue"
const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
    meta:{
      isAuth:true
    }
  },
  {
    name: "LoginPage",
    path: "/login",
    component: LoginPage,
    meta:{
      isAuth:false,
      
    }
  },
  {
    name: "RequestPage",
    path: "/request",
    component: RequestsPage,
    meta:{
      isAuth:true
    }
  },
  {
    name: "CalendarPage",
    path: "/calendar",
    component: CalendarPage,
    meta:{
      isAuth:true
    }
  },
  {
    name: "ConfigrationPage",
    path: "/configration",
    component: ConfigrationPage,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
    name: "TeamsPage",
    path: "/configration/teams",
    component: TeamsPage,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },

  {
    name: "ReportPage",
    path: "/report",
    component: ReportPage,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
    name: "SingleTeamPage",
    path: "/configration/teams/:id",
    component: SingleTeamPage,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
   name:"leaveTypePage",
   path:"/configration/leave-types",
   component:LeaveTypes,
   meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
    name:'allHolidays',
    path:'/configration/all-holidays',
    component:AllHolidays,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
    name:"RolesPage",
    path:'/configration/roles',
    component:RolesPage,
    meta:{
      isAdmin:true,
      isAuth:true
    }
  },
  {
    name: "StandupPage",
    path: "/standups",
    component: StandupPage,
   meta:{
     isAuth:true
   }
  },
  {
    name: "CreateStandup",
    path: "/standup/create",
    component: CreateStandup,
    meta:{
     isAuth:true
   }
  },
  {
    name: "SingleStandupPage",
    path: "/standups/:id",
    component: SingleStandup,
    meta:{
       isAuth:true
    }
  },
  {
    name:"allRequests",
    path:"/all-request",
    component:AllRequests,
    meta:{
      isAdmin:true,
       isAuth:true
    }
  },
  {
    name:"test",
    path:"/test",
    component:Test,
  },
  {
   name:'EmployeePage',
   path:'/employees',
   component:EmployeePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
const requireAdmin= to.matched.some(record => record.meta.isAdmin);
const requireAuth = to.matched.some(record => record.meta.isAuth)
const authed = to.matched.some(record => record.meta.isAuth===false)
const userStore = useUserStore()
const user = userStore.user
if(requireAuth && user===null){ // when user is authenticated 
 next('/login') 
}
if(authed && user!==null){  // when user is authenticated 
  next('/')
}
if(requireAdmin &&  !user.admin){ // pages for admin users only
    next('/')
}
else{
  next()
}
})

export default router;
