<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invaild: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入你的验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invaild: errors.has('code') }"
        />
        <button style="width: 100px; height: 38px" @click="sendCode">
          获取验证码
        </button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          placeholder="请输入你的密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{4,20}$/ }"
          :class="{ invaild: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          placeholder="请输入确认密码"
          v-model="confirmPassword"
          name="confirmPassword"
          v-validate="{ required: true, is: password }"
          :class="{ invaild: errors.has('confirmPassword') }"
        />
        <span class="error-msg">{{ errors.first('confirmPassword') }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          placeholder="请输入你的密码"
          v-model="agree"
          name="agree"
          v-validate="{ required: true, agree: true }"
          :class="{ invaild: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：广东省广州市白云区江高镇大田村学苑路1号</div>
      <div class="beian">粤ICP备13433555号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      agree: true
    }
  },
  methods: {
    async sendCode() {
      const { phone } = this
      try {
        phone && (await this.$store.dispatch('sendCode', phone))
        this.code = this.$store.state.user.code
      } catch (error) {
        alert(error.message)
      }
    },
    async userRegister() {
      // success返回的时boolean 当表单全部通过才为true
      const success = await this.$validator.validateAll()
      if (success) {
        const { phone, code, password, confirmPassword } = this
        try {
          await this.$store.dispatch('userRegister', {
            phone,
            code,
            password
          })
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
button {
  cursor: pointer;
}

.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      cursor: pointer;
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>