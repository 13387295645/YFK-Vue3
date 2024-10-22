// 引入二次封装的axios
import request from "@/utils/request";
import type {
  HospitalDetail, DepartmentResponse, LoginData, UserLoginResponseData, WXLoginResponse,
  HospitalWorkData, DoctorResponseData, UserResPonseData, DoctorInfoData
} from "./type";
// 枚举请求地址
enum API {
  // 获取医院想详情数据的接口
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  // 获取医院科室数据的接口
  HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/',
  // 获取手机验证码接口
  GETUSERCODE_URL = '/sms/send/',
  // 用户登录接口
  USERLOGIN_URL = '/user/login',
  // 微信扫码登录接口
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  // 获取医院科室挂号数据
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  // 获取医生排班数据
  HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  // 获取就诊人接口
  GETUSER_URL = '/user/patient/auth/findAll',
  // 根据医生id获取医生信息
  GETDOCTOR_URL = '/hosp/hospital/getSchedule/',
}
// 获取医院详情接口
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode)
// 获取医院科室接口
export const reqHospitaDepartment = (hoscode: string) =>
  request.get<any, DepartmentResponse>(API.HOSPITALDEPARTMENT_URL + hoscode)
// 验证码接口
export const reqUserCode = (phone: number) =>
  request.get<any, any>(API.GETUSERCODE_URL + phone)
// 用户登录接口
export const reqUserLoing = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)
//微信扫码登录接口
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WXLoginResponse>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
// 获取医院科室挂号数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) =>
  request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)
// 获取医生排班数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) =>
  request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
// 获取就诊人数据
export const reqGetUser = () =>
  request.get<any, UserResPonseData>(API.GETUSER_URL)
// 获取医生信息
export const reqGetDoctor = (scheduleId: string) =>
  request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId)