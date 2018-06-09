window.logIn = {
  props: ["currentUser"],
  data() {
    return {
      logIn: {
        userName: "",
        password: ""
      },
      logInSuccess: false
    };
  },
  template: `
    <div id="particles-js" class="logIn" v-cloak>
      <div v-show="!logInSuccess" class="logInWrapper">
        <router-link to="/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-2guanbi"></use>
          </svg>
        </router-link>
        <h2>登录</h2>
        <form class="form" @submit.prevent="onLogIn(logIn)">
          <input type="text" v-model="logIn.userName" placeholder="Username">
          <input type="password" v-model="logIn.password" placeholder="Password">
          <br/>
          <button type="submit">提交</button>
          <router-link to="/signUp">注册</router-link>
        </form>
      </div>
      <div v-if="logInSuccess" class="logInSuccess" :class="{active:logInSuccess}">
        <div class="container">
	        <div class="icon-circle icon-success">
		        <svg class="icon-svg">
			        <polyline class="icon-svg-line" points="6.5,25.2 18.7,37.4 43.5,12.6 "/>
		        </svg>
	        </div>
        </div>
        <p>登录成功</p>
      </div>
    </div>
    `,
  mounted() {
    particlesJS.load("particles-js", "./particles.json", function() {});
  },
  methods: {
    onLogIn(user) {
      AV.User.logIn(user.userName, user.password).then(
        loginedUser => {
          loginedUser = loginedUser.toJSON();
          this.currentUser.id = loginedUser.objectId;
          let shareLink =
            location.origin +
            location.pathname +
            "?user_id=" +
            this.currentUser.id;
          this.$emit("loginsuccess", {
            id: loginedUser.objectId,
            shareLink: shareLink
          });
          this.logInSuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 1300);
        },
        function(error) {
          if (error.code === 210) {
            alert("邮箱和密码不匹配");
          } else if (error.code === 211) {
            alert("邮箱不存在");
          }
        }
      );
    }
  }
};
Vue.component("log-in", window.logIn);
