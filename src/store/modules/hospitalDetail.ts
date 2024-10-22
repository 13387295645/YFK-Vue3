import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitaDepartment } from "@/api/hospital";
import type { HosPitalDetail, HospitalDetail, DepartmentResponse } from "@/api/hospital/type";
import type { DetailState } from "./interface";


const useDetailStore = defineStore('Detail', {
  state: (): DetailState => {
    return {
      hospitalInfo: ({} as HosPitalDetail),
      departmentArr: [],
    }
  },
  actions: {
    // 获取医院详情的方法
    async getHospital(hoscode: string) {
      let result: HospitalDetail = await reqHospitalDetail(hoscode)
      if (result.code == 200) {
        // @ts-ignore
        this.hospitalInfo = result.data
      }
    },
    //获取医院科室的方法
    async getDepartment(hoscode: string) {
      let result: DepartmentResponse = await reqHospitaDepartment(hoscode)
      if (result.code == 200) {
        this.departmentArr = result.data
      }
    }
  },
  getters: {

  }
})

export default useDetailStore