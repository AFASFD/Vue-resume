window.signUp = {
  props: ["currentUser", "shareLink"],
  data() {
    return {
      registered: {
        userName: "",
        password: ""
      },
      signUpSuccess: false
    };
  },
  template: `
    <div id="particles-js" class="registered" v-cloak>
      <div v-show="!signUpSuccess" class="signInWrapper">
        <router-link to="/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-2guanbi"></use>
          </svg>
        </router-link>
        <h2>注册</h2>
        <form class="form" @submit.prevent="onRegistered">
            <input type="text" v-model="registered.userName" placeholder="Username">
            <input type="password" v-model="registered.password" placeholder="Password">
            <br/>
            <button type="submit">提交</button>
            <router-link to="/login">登录</router-link>
        </form>
      </div>
      <div v-if="signUpSuccess" class="signUpSuccess" :class="{active:signUpSuccess}">
        <div class="container">
	        <div class="icon-circle icon-success">
		        <svg class="icon-svg">
			        <polyline class="icon-svg-line" points="6.5,25.2 18.7,37.4 43.5,12.6 "/>
		        </svg>
	        </div>
        </div>
        <p>注册成功</p>
      </div>
    </div>
    `,
  mounted() {
    particlesJS.load("particles-js", "./particles.json", function() {});
  },
  methods: {
    onRegistered() {
      var user = new AV.User();
      // 设置用户名
      user.setUsername(this.registered.userName);
      // 设置密码
      user.setPassword(this.registered.password);
      user.signUp().then(
        loginedUser => {
          loginedUser = loginedUser.toJSON();
          this.currentUser.id = loginedUser.objectId;
          this.signUpSuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 1300);
        },
        function(error) {
          if (error.code === 202) {
            alert("用户名已存在");
          }
        }
      );
    }
  }
};
Vue.component("sign-up", window.signUp);
