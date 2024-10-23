// 引入二次封装的axios
import request from "@/utils/request";
import {
  SubmitOrder, OrderResponseData, QrCode, payCon, MemberInfoResponseData,
  CertifiResponseData, MemberParams, MemberOrderInfoResponseData, OrderStatusResponseData
} from "./type";
// 枚举API地址
enum API {
  // 提交订单，获取订单接口
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取订单详情接口
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  // 取消订单接口
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  // 微信支付接口
  QRCODE_RUL = '/order/weixin/createNative/',
  // 获取支付状态
  PAYCONDITION_URL = '/order/weixin/queryPayStatus/',
  // 获取会员信息
  MEMBERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件类型接口(身份证/户口本)
  CERTIFICATESTYPE_URL = '/cmn/dict/findByDictCode/',
  // 会员认证接口
  MEMBERCERTATION_URL = '/user/auth/userAuah',
  // 获取所有订单接口
  MEMBERORDERINFO_URL = '/order/orderInfo/auth/',
  // 获取订单状态
  GETORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList',
  // 获取省市数据接口
  CITY_URL = '/cmn/dict/findByParentId/'
}

// 提交订单数据
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) =>
  request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
// 获取订单详情数据
export const reqGetOrderInfo = (id: string) =>
  request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)
// 取消订单
export const reqOrderCancel = (id: string) =>
  request.get<any, any>(API.ORDERCANCEL_URL + id)
// 微信支付二维码
export const reqQrCode = (orderId: string) =>
  request.get<any, QrCode>(API.QRCODE_RUL + orderId)
// 获取支付状态接口
export const reqPay = (orderId: string) =>
  request.get<any, payCon>(API.PAYCONDITION_URL + orderId)
// 获取会员信息
export const reqMemberInfo = () =>
  request.get<any, MemberInfoResponseData>(API.MEMBERINFO_URL)
// 获取证件类型
export const reqCertificatesType = (CertificatesType = 'CertificatesType') =>
  request.get<any, CertifiResponseData>(API.CERTIFICATESTYPE_URL + CertificatesType)
// 会员认证
export const reqMemberCreation = (data: MemberParams) =>
  request.post<any, any>(API.MEMBERCERTATION_URL, data)
// 获取所有订单
export const reqMemberOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) =>
  request.get<any, MemberOrderInfoResponseData>(API.MEMBERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取订单状态
export const reqOrderStatus = () =>
  request.get<any, OrderStatusResponseData>(API.GETORDERSTATUS_URL)
// 获取省市地区
export const reqCity = (parentId: string) =>
  request.get<any, any>(API.CITY_URL + parentId)