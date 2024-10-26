// 定义详情模块ts数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
// 代表医院详情数据
export interface HosPitalDetail {
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
  },
  "hospital": {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "hostypeString": string,
      "fullAddress": string,
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": null,
    "route": string,
    "status": number,
    "bookingRule": null
  }
}

// 医院详情返回的数据
export interface HospitalDetail extends ResponseData {
  data: HospitalDetail
}

// 医院科室的ts类型
export interface Department {
  "depcode": string,
  "depname": string,
  "children"?: Department[]
}

// 代表存储科室的数组类型
export type DepartmentArr = Department[];

// 获取科室接口返回的数据类型
export interface DepartmentResponse extends ResponseData {
  data: DepartmentArr
}

// 用户登录接口需要携带的参数类型
export interface LoginData {
  phone: string,
  code: string,
}

// 登录接口返回用户信息数据
export interface UserInfo {
  name: string,
  token: string
}

// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}

// 定义微信扫码登录返回的ts类型
export interface WxLogin {
  "redirectUri": string,
  "appid": string,
  "scope": string,
  "state": string,
}

export interface WXLoginResponse extends ResponseData {
  data: WxLogin
}
// 医生科室挂号数据类型
export interface BaseMap {
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname": string,
}

export interface WorkData {
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": null,
  "availableNumber": number,
  "status": number,
}

export type BookingScheduleList = WorkData[]

export interface HospitalWorkData extends ResponseData {
  data: {
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: BaseMap
  }
}

// 医生排班数据的类型
export interface Doctor {
  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": string,
  "param": {
    "dayOfWeek": string,
    "depname": string,
    "hosname": string,
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": string,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": string
}

export type DocArr = Doctor[]

export interface DoctorResponseData extends ResponseData {
  data: DocArr
}

// 就诊人数据类型
export interface User {
  id: number,
  createTime: string,
  isDeleted: string
  param: {
    certificatesTypeString: string
    contactsCertificatesTypeString: string
    cityString: null
    fullAddress: string
    districtString: null
    provinceString: null
  },
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  isMarry: number
  provinceCode: null
  cityCode: null
  districtCode: null
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: number
  cardNo: null
  status: string
}
export type UserArr = User[]
export interface UserResPonseData extends ResponseData {
  data: UserArr
}

// 医生信息类型
export interface DoctorInfoData extends ResponseData {
  data: Doctor
}