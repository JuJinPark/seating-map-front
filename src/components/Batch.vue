<template>


<div class='container' style="margin-top: 81px;">

<div v-if="!isLoaded">loading...</div>

<div v-if="isLoaded">


  <div>
  

    <div class="bg-white" style="position:fixed;z-index: 2000;width:100%; height: 42px;">
  
      <div  style="width:80%;text-align:center;display: inline-block;">
    <el-select size="medium" v-model="crtFloorId" placeholder="층 선택" style="width:71px; margin-right:10px;">
      <el-option
        v-for="floor in floorList"
        :key="floor.id"
        :label="floor.floorName"
        :value="floor.id"
      >
      </el-option>
    </el-select>
   <span>위치변경</span>
   <el-switch v-model="draggable" style="margin-right:10px;"></el-switch>
   <span>자리 추가</span>
  <el-switch v-model="isSeatAddable" style="margin-right:10px;"></el-switch>
   <el-button type="success" size="small" icon="el-icon-check" circle :disabled='!isUpdated' v-on:click="updateSeat()" style="background-color:rgb(90, 135, 202); border-color:rgb(90, 135, 202);"></el-button>
      </div>
     <div style="display: inline-block;; vertical-align:middle;">
    <img src="../assets/blue_circle.svg" style="width:30px;"/>
     <div style="display:inline-block;"> Occupied</div>
     </div>

    <div style="display: inline-block;margin-left: 14px; vertical-align:middle;">
    <img src="../assets/orange_circle.svg" style="width:30px;"/>
     <div style="display:inline-block;"> Vacant</div>
     </div>
     <div>

     </div>
</div>



    <l-map
      id="map"
      :zoom.sync="zoom"
      :options="mapOptions"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :crs="crs"
      :max-bounds="maxBounds"
      style="width:100%;height: 825px; margin:auto;"
      @popupopen="openPopupEvent"
      @popupclose="closePopupEvent"
      @click="addMarker"
    >
    <!-- <Header></Header> -->
   


      <l-image-overlay :url="overalyUrl" :bounds="imageBound" />
        
      <l-marker
        v-for="seat in seatList"
        :lat-lng= "seat.coordinate"
        :key="seat.id" 
        :draggable="draggable" 
        @dragend="seatMoveEvent($event,seat)"  >
        <l-icon :icon-size="dynamicSize">
            <!-- <div class="image-container"> -->
        
          <div v-if="seat.employee!==null">
            <img src="../assets/blue_circle.svg"/>
          </div>
          <div v-else>
              <img src="../assets/orange_circle.svg"/>
          </div>
            
          <!-- </div> -->
          <l-popup :options="popupOption" style="display: none;">
            <div style="text-align: center; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-edit" circle size="mini" v-on:click="openEmployeeDrawer(seat.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" v-on:click="removeSeat(seat.id)" ></el-button>
            </div>
            <div>
               <div style="text-align: center;">
               <el-avatar shape="square" :size="80" :src="squareUrl" ></el-avatar>
                </div>
                <div v-if="seat.employee==null">
                  <p class='empDetail'>미지정</p>
                </div>

                <div v-if="seat.employee!==null">
                <p class='empDetail'>부서:{{seat.employee.department.departmentName}}</p>
                <p class='empDetail'>이름:{{seat.employee.employeeName}}님</p>
                <p class='empDetail'>사번:{{seat.employee.employeeNumber}}</p>
                <p class='empDetail'>내선번호:{{seat.employee.employeeExtension}}</p>
                <p class='empDetail'>이메일:{{seat.employee.companyEmail}}</p>
                </div>
               
            </div>
          </l-popup>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</div>

<employee-drawer></employee-drawer>
</div>

</template>

<script>
import { CRS } from "leaflet";
import { LMap, LImageOverlay, LMarker, LPopup, LIcon } from "vue2-leaflet";
import { mapMutations } from "vuex";
import employeeDrawer from './EmployeeDrawer'
import axios from 'axios'
import Header from "../views/Header";


export default {
  name: "Home",
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LIcon,
    employeeDrawer,
    Header
  },
  data() {
    return {
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: false
      },
      popupOption: {
        keepInView: true,
        minWidth: 120
      },
      toolTipOptions: {
        permanent: false,
        direction: "center"
      },

      draggable: false,
      iconSize: 22,
      isSeatAddable: false,
      zoom: 0,
      crs: CRS.Simple,
      minZoom: 0,
      maxZoom: 2.9,
      imageBound: [[0, 0], [825, 1200]],
      maxBounds: [[0, 0], [825, 1200]],
      overalyUrl: "",
      isPopupOpen: false,
      crtFloorId: "",
      isAddEnd: true,
      isLoaded:false,
      isEmployeeDrawerOpen:false,
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"  
    };
  },
  methods: {
    addMarker(event) {
      console.log("!")
      if (this.isSeatAddable && this.isAddEnd) {
        this.isAddEnd = false;
        // const dateKey = Date.now() + "";
        const newMaker = {
          floorId:this.crtFloorId,
          coordinate:{
            lng: event.latlng.lng,
            lat: event.latlng.lat,
          },
        };

        console.log(newMaker)
        this.$store.dispatch('addSeat',newMaker)
        // this.$store.commit("addLocalMarker", newMaker);
        // this.$store.commit("addLocalModifyingMarker", newMaker);
      }
      this.isAddEnd = true;
    },
    openPopupEvent(event) {
      event.popup._content.style = "display: block;";
    },
    closePopupEvent(event) {
     this.$store.commit("setSelectedSeatId", ""); 
      event.popup._content.style = "display: none;";
    },
    seatMoveEvent(event, seat) {
      
      seat.coordinate.lat = event.target._latlng.lat;
      seat.coordinate.lng = event.target._latlng.lng;
      seat.floorId=this.crtFloorId;
      this.$store.commit("addUpdatedSeat", seat);
      // this.$store.commit("addLocalMarker", value);
      // this.$store.commit("addLocalModifyingMarker", value);
    },
    setDefaultValues(){
      this.overalyUrl=this.floorList[1].imagePath
      this.crtFloorId=this.floorList[1].id
    },
    removeSeat(seatId){
      console.log(seatId)
      this.$store.dispatch('removeSeat',seatId)
    },
    updateSeat(){
      this.$store.dispatch('updateSeat')
      this.draggable=false;
    },
    openEmployeeDrawer(seatId){
     this.$store.commit("setSelectedSeatId", seatId); 
     this.$store.commit("setEmpDrawState", true);
    },



  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },

    //Vuex

    floorList(){
      return this.$store.getters.getFloorList;
    },
    isUpdated() {
      return this.$store.getters.getIsUpdated;
    },
    seatList() {
      return this.$store.getters.getSeatList.filter(seat => {
         return seat.floor.id==this.crtFloorId
      })
      
    },
    localTmpModifyingMarkerList() {
      return this.$store.state.localTmpModifyingMarkerList;
    }
  },
  watch: {
    zoom(zoom) {
      if (zoom >= 1) {
        this.iconSize = zoom * 22 * 1.5;
      } else if (zoom < 1) {
        this.iconSize = 22;
      }
    },
    crtFloorId(newVal, oldVal) {
      let crtFloor=this.floorList.find(floor => floor.id === newVal)
      this.overalyUrl = crtFloor.imagePath;
      if(oldVal!==""){
        this.updateSeat();
      }
      
   
    }

  },

  mounted() {
     this.$store.dispatch('getFloorList')
      .then(()=>{
       this.setDefaultValues();  
      this.$store.dispatch('getSeatList')
       this.isLoaded=true;
        this.$store.commit("setLoginFlag", true);
        })
      
     

  }
};
</script>


<style>
  .grid-content {
    border-radius: 15px;
    min-height: 36px;
  }
    .bg-white {
   background: white;
  }
p.empDetail{
  text-align: center;
}
.showPopup {
  display: block !important;
}
.hidePopup {
  display: none !important;
}
.image-container{
    position: relative;
  text-align: center;
}
/* .text-append{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 5vh;
} */
</style>