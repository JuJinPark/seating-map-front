import Vue from "vue";
import Vuex from "vuex";
// import marker from './modules/marker'
import axios from 'axios'
import router from '../router';

Vue.use(Vuex);


//테스트용, 추후 에는 marker.js , **.js로 모듈화해서 import후에 처리
const store = new Vuex.Store({
  state: {
    selectedSeatId:"",
    seatList: [],
    updatedSeatList:[],
        // seatList: {},
    localModifyingMarkers: {},
    floorList:[],
    employeeList:[],
    isEmpDrawerOpen: false,
    isLogin: false,
    
  },
  mutations: {

    setFloorList(state,payload){
      state.floorList=payload;
    },
    setSeatList(state,payload){
      state.seatList=payload
    },

    setEmpDrawState(state,payload){
      state.isEmpDrawerOpen=payload
    },
    setSelectedSeatId(state,payload){
      state.selectedSeatId=payload
    },
    
    setEmpList(state,payload){
      state.employeeList=payload
    },

    addLocalMarker(state, payload) {
      state.localMarkers[payload.key] = null;
      state.localMarkers[payload.key] = payload;
    },
    addLocalModifyingMarker(state, payload) {
      state.localModifyingMarkers[payload.key] = null;
      state.localModifyingMarkers[payload.key] = payload;
    },

    addSeatToList(state, payload){
      state.seatList.push(payload);
    },

    addUpdatedSeat(state,payload){
      const idx = state.updatedSeatList.findIndex(function(seat) {return seat.id === payload.id})
      if (idx == -1) {
      state.updatedSeatList.push(payload)
      }else{
      state.updatedSeatList[idx]=payload
      }
      //console.log(state.updatedSeatList)
    },

    updateSeatInlist(state,payload){
      const idx2=state.seatList.findIndex(function(seat) {
        if(seat.employee){
          return seat.employee.id === payload.employee.id}
        }
        )
      if (idx2 > -1) Vue.set(state.seatList[idx2],'employee',null) 
  
      const idx = state.seatList.findIndex(function(seat) {return seat.id === payload.id})
      if (idx > -1) Vue.set(state.seatList[idx],'employee',payload.employee) 
      //
      
    },

    updateEmpInList(state,payload){
      const idx2=state.employeeList.findIndex(function(emp) {
        if(emp.seat){
          return emp.seat.id === payload.employee.seat.id}
        }
        )
      if (idx2 > -1) Vue.set(state.employeeList[idx2],'seat',null) 

      const idx = state.employeeList.findIndex(function(emp) {return emp.id === payload.employee.id})
      if (idx > -1) Vue.set(state.employeeList[idx],'seat',payload.employee.seat) 

    },

    removeSeatFromList(state, payload){
      const idx = state.seatList.findIndex(function(seat) {return seat.id === payload})
      if (idx > -1) state.seatList.splice(idx, 1)
    },
    removeSeatFromUpdateList(state,payload){
      const idx = state.updatedSeatList.findIndex(function(seat) {return seat.id === payload})
      if (idx > -1) state.updatedSeatList.splice(idx, 1)
    },
    unselectEmpFromlist(state,payload){
      console.log(state.employeeList);
      const idx = state.employeeList.findIndex(function(emp) {
        if(emp.seat){
        return emp.seat.id === payload
        }
      })
      if (idx > -1) Vue.set(state.employeeList[idx],'seat',null) 
    },
    
    emptyUpdatedSeatList(state){
      state.updatedSeatList=[];
    },

    setLoginFlag(state,payload){
      state.isLogin=payload;
    }
 
  },
  actions: {
    //실제 적용 시 aixos 통신 서버 적용후에
    //mutations 호출해서 변경 후 UI도 업데이트
    assignSeat({state,commit},employeeId){
      console.log(employeeId,state.selectedSeatId)

      if(employeeId&&(state.selectedSeatId)){

        axios.patch('/seats/'+state.selectedSeatId+'/employee',{employeeId:employeeId})
        .then(response => {
          commit("updateSeatInlist",response.data);
          commit("updateEmpInList",response.data);
          })
      }


    },

    removeSeat({state,commit},seatId){
      axios.delete('/seats/'+seatId)
      .then(response=>{
        })
        commit("removeSeatFromList",seatId);
        commit("removeSeatFromUpdateList",seatId);
        commit("unselectEmpFromlist",seatId);

    },

    getFloorList({state,commit}){
      return new Promise((resolve, reject) => {
        axios.get('/floors')
        .then(response => {
          commit("setFloorList",response.data);
          resolve(response);
       
      })   
    })
      
    },

    getSeatList({state,commit}){
    return new Promise((resolve, reject) => {
      axios.get('/seats/employees')
      .then(response => {
         commit("setSeatList",response.data);
          resolve(response);
        })   
      })
    },

    addSeat({state,commit},newSeatData){
      axios.post('/seats',newSeatData)
      .then(response => {
        commit("addSeatToList",response.data);
      })
    },

    updateSeat({state,commit}){
      if(state.updatedSeatList.length>0){
        console.log(state.updatedSeatList)
        axios.patch('/seats/bulk',state.updatedSeatList)
        .then(response => {
          commit("emptyUpdatedSeatList");
          })

      }


      
    },

    getEmpList({state,commit}){
      return new Promise((resolve, reject) => {
        axios.get('/employees')
        .then(response => {
           commit("setEmpList",response.data);
            resolve(response);
          })   
        })
    },

    logOut({state,commit}){
      axios.post("/logout")
      .then(response => {
       
         if(response.status==200){

          commit("setLoginFlag",false);
          router.push({name : 'Login' })
         }
        
        })
    }
    

  },
  getters: {
    getIsUpdated(state) {
     // return Object.keys(state.localModifyingMarkers).length > 0;
      return state.updatedSeatList.length>0;
    },
    getLoading(state){
      return state.loading;
    },
    getFloorList(state){
      return state.floorList;
    },
    getSeatList(state){
      return state.seatList
    },
    getEmpDrawerState(state){
      return state.isEmpDrawerOpen
    },
    getEmpList(state){
      return state.employeeList
    },
    getIsLogin(state){
      return state.isLogin;
    },
  

  },
  modules: {
    // marker
  }

});


export default store;
