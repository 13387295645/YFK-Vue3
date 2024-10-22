<template>
  <div class='notice'>
    <h1 class="hosname">{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知</h1>
    <div class="top">为方便您早日就医康复，请认真阅读预约挂号须知：</div>
    <div class="info">
      <div class="realName">一、预约实名制</div>
      <div class="text">
        1.&nbsp;为确保医疗服务的安全和准确性，医院实行预约实名制。你在预约挂号时，需提供真实、准确的个人信息，包括姓名、身份证号码、联系方式等。<br><br>
        2.&nbsp;就诊时，你需携带有效身份证件（如身份证、医保卡等），以便医院核对身份信息。若身份信息不符，医院有权拒绝为你提供医疗服务。
      </div>
      <div class="realName">二、预约挂号</div>
      <div class="text">
        1.&nbsp;线上预约：你可以通过医院官方网站、手机 APP 等渠道进行预约挂号。在预约过程中，请按照系统提示填写个人信息、选择科室、医生和就诊时间。<br><br>
        2.&nbsp;挂号机预约：在医院门诊大厅的挂号机上，按照操作提示进行预约挂号。挂号机预约可选择科室、医生和就诊时间，并可使用身份证、医保卡等进行身份验证。<br><br>
        3.&nbsp;预约时间：医院通常提前一定天数开放预约挂号服务，具体预约时间可在医院官方网站、手机 APP 或挂号机上查询。建议你提前规划就诊时间，尽早预约，以免耽误病情。<br><br>
        4.&nbsp;预约科室和医生：在预约挂号时，你可以根据自己的病情选择相应的科室和医生。医院会提供医生的简介、擅长领域和出诊时间等信息，供你参考选择。<br><br>
        5.&nbsp;预约确认：预约成功后，你将收到医院发送的预约确认短信或邮件。请妥善保存预约信息，以便就诊时使用。<br><br>
        6.&nbsp;电话预约：拨打医院预约挂号热线，由工作人员为你进行预约。在通话过程中，请提供准确的个人信息和就诊需求。<br><br>
      </div>
      <div class="realName">三、取消预约</div>
      <div class="text">
        1.&nbsp;如果你因特殊情况需要取消预约，请在规定的时间内进行操作。不同的预约方式，取消预约的时间和方式可能会有所不同。<br><br>
        2.&nbsp;未在规定时间内取消预约或爽约的患者，可能会被记录为不良信用记录，影响你今后的预约挂号。多次爽约的患者，医院有权采取限制预约等措施。<br><br>
      </div>
      <div class="realName">四、挂号机预约</div>
      <div class="text">
        1.&nbsp;挂号机位置：医院门诊大厅通常设有多台挂号机，你可以根据指示牌找到挂号机的位置。<br><br>
        2.&nbsp;请你认真阅读以上医院挂号预约须知，按照规定进行预约挂号和就诊。如有任何疑问或需要帮助，请及时联系医院工作人员。祝你早日康复！<br><br>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name='Notice'>
import useDetailStore from '@/store/modules/hospitalDetail';

//数据
let hospitalStore = useDetailStore()
//方法

</script>

<style scoped lang="scss">
.notice {
  margin: 20px 30px;

  .hosname {
    text-align: center;
    font-size: 30px;
  }

  .top {
    color: #7f7f7f;
    margin: 30px 0px 10px 0;
  }

  .info {
    line-height: 25px;

    .realName {
      color: #7f7f7f;
      font-weight: 900;
      margin: 10px 0px;
      line-height: 40px;
    }

    .text {
      color: #7f7f7f;
    }
  }
}
</style>