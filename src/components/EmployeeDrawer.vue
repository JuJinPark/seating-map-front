<template>

<el-drawer class="drawerBody"
  title="Employee List"
  :visible="isOpen"
  :direction="direction"
  :before-close="handleClose"
  >
    <el-table
      :data="employees"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        fixed="left"
        prop="employeeNumber"
        label="사번"
        width="120">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="이름"
        width="120">
      </el-table-column>
      <el-table-column
        prop="department.departmentName"
        label="부서"
         width="120">
      </el-table-column>
      <el-table-column
        prop="companyEmail"
        label="사내이메일"
        width="120">
      </el-table-column>
       <el-table-column
        prop="employeeExtension"
        label="내선번호"
         >
      </el-table-column>

      <el-table-column
      fixed="right"
      label="자리지정"
      width="100">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="assignSeat(scope)"
          type="text"
          size="small">
          선택
        </el-button>
      </template>
    </el-table-column>
    </el-table>


  <!-- <div v-for="employee in employees" :key="employee.id" class="text item">
    <el-avatar>{{employee.employeeName}}</el-avatar>
    <div>{{employee.department.deparmentName}}/{{employee.companyEmail}}</div>
   
  </div> -->
</el-drawer>

</template>

<script>
export default {
  name: 'employeeDrawer',

  data: () => ({
  
    direction:"rtl"
  }),
  methods: {
      handleClose(done) {
        this.$store.commit("setEmpDrawState", false);
      },
      assignSeat(scope){
        this.$store.dispatch('assignSeat',scope.row.id)
        console.log(scope)
      },
       tableRowClassName({row}) {
         console.log(row)
         if(row.seat){
           return 'taken'
         }
        // if (rowIndex === 1) {
        //   return 'warning-row';
        // } else if (rowIndex === 3) {
        //   return 'success-row';
        // }
        return '';
      }

  },
  computed: {
    isOpen() {
     return this.$store.getters.getEmpDrawerState;
    },
    employees(){
      return this.$store.getters.getEmpList;
    },
  },
    mounted() {
      this.$store.dispatch('getEmpList')
    // this.localTmpMakerList = this.$store.state.marker.markers;
  },
}
</script>

<style>
.drawerBody {
  margin-top:80px;
}
  .el-table .taken {
    background:oldlace;
  }
</style>

