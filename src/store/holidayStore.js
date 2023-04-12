import api from "@/api/api";
import { defineStore } from "pinia";
import { useConfigStore } from "./configStore";
export const useHolidayStore= defineStore("holidayStore",{
    state(){
        return{
         allHolidays:[],
         loading:false,
         openHolidayModal:false
        }
    },
    getters:{
      getFutureHoliday(){
        const currentDate= new Date()
        return this.allHolidays.filter((item)=>item.date > currentDate.toISOString())
      }
    },
    actions:{
     async fetchHolidays(){
        const {data} = await api.get('/holiday')
        this.allHolidays=data
     },
     async addHoliday(holiday){
        const configStore =useConfigStore()
        this.loading=true
        const {data} = await api.post('/holiday',{
            name:holiday.name,
            date:holiday.date
        })
        this.allHolidays=[...this.allHolidays,data]
        this.toogleHolidayModal()
        this.loading=false
        
        configStore.toggleMsgModal("Holiday added successfully")
     },
     toogleHolidayModal(){
        this.openHolidayModal=!this.openHolidayModal
     }
    }
})