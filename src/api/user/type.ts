export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
// 订单id类型
export interface SubmitOrder extends ResponseData {
  data: number
}

// 订单数据类型
export interface OrderInfo {
  "id": number
  "createTime": string
  "updateTime": string
  "isDeleted": number
  "param": {
    "orderStatusString": string
  },
  "userId": number
  "outTradeNo": string
  "hoscode": string
  "hosname": string
  "depcode": string
  "depname": string
  "scheduleId": string
  "title": string
  "reserveDate": string
  "reserveTime": number
  "patientId": number
  "patientName": string
  "patientPhone": string
  "hosRecordId": string
  "number": number
  "fetchTime": string
  "fetchAddress": string
  "amount": number
  "quitTime": string
  "orderStatus": number
}

// 订单接口返回的数据类型
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}

// 微信支付二维码数据类型
export interface payInfo {
  "codeUrl": string,
  "orderId": number,
  "totalFee": number,
  "resultCode": string
}

export interface QrCode extends ResponseData {
  data: payInfo
}

// 微信支付状态数据类型
export interface payCon extends ResponseData {
  data: boolean
}

// 代表一个用户信息的数据类型
export interface MemberInfo {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {

  }
  openid: null
  nickName: null
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: null
  authStatus: number
  status: number
}
export interface MemberInfoResponseData extends ResponseData {
  data: MemberInfo
}

// 用户证件类型的ts类型
export interface CertificationType {
  "id": number
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {},
  "parentId": number,
  "name": string,
  "value": string,
  "dictCode": string,
  "hasChildren": boolean
}

export type CertifiArr = CertificationType[]

export interface CertifiResponseData extends ResponseData {
  data: CertifiArr
}

// 会员认证类型
export interface MemberParams {
  "certificatesNo": string,
  "certificatesType": string,
  "certificatesUrl": string,
  "name": string,
}

// 订单数据类型
export interface MemberOrderInfo {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "orderStatusString": string,
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": null,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number,
}

export type Records = MemberOrderInfo[]

export interface MemberOrderInfoResponseData extends ResponseData {
  data: {
    records: Records
    "total": number,
    "size": number,
    "current": number,
    "orders": [],
    "hitCount": boolean,
    "searchCount": boolean,
    "pages": number,
  }
}
