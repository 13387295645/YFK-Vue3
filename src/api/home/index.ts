// 统一管理首页模块接口
import request from "@/utils/request";
import type { HospitalResponeseData, HospitalLevelAndAreaResponseData, HospitalInfo } from "./type";
// 通过枚举管理首页模块的接口地址
enum API {
  // 获取已有的医院的数据接口
  HOSPITAL_URL = '/hosp/hospital/',
  // 获取医院的等级与地区的接口
  HOSPITALLEVERLANDAREA_URL = '/cmn/dict/findByDictCode/',
  // 根据关键字获取医院的信息
  HOSPITALINFO_URL = '/hosp/hospital/findByHosname/',
}
// 获取医院数据
export const reqHospital = (page: number, limit: number, hostype = '', districtCode = '') =>
  request.get<any, HospitalResponeseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

// 获取医院的等级与地区的数据
export const reqHospitalLevelAndArea = (dictCode: string) =>
  request.get<any, HospitalLevelAndAreaResponseData>(API.HOSPITALLEVERLANDAREA_URL + dictCode)

// 根据关键字获取医院的信息数据
export const reqHospitalInfo = (hosname: string) =>
  request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + hosname)
