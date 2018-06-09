window.appMain = {
  props: ["currentUser", "resume", "previewResume", "mode"],
  data() {
    return {
      loginVisible: false,
      registeredVisible: false,
      shareVisible: false,
      skinPeeler: "default"
    };
  },
  computed: {
    displayResume() {
      return this.mode === "edit" ? this.resume : this.previewResume;
    }
  },
  template: `
      <div class="app-main">
          <app-aside :logoutvisible="currentUser.id" :mode="mode" @click-save="onClickSave" @click-print="printResume" @change-skin-peeler="changeSkinPeeler" @click-log-out="onLogOut" @click-share="onClickShare"></app-aside>
          <main :class="skinPeeler">
              <button v-if="mode==='preview'" @click="exitPreview">退出预览</button>
              <resume :mode="mode" :display-resume="displayResume" :resume="resume"></resume>
          </main>
      </div>
      `,
  methods: {
    onClickSave() {
      let currentUser = AV.User.current();
      if (!currentUser) {
        this.$router.push("/login");
      } else {
        this.saveResume();
      }
    },
    saveResume() {
      let { id } = AV.User.current();
      var user = AV.Object.createWithoutData("User", id);
      user.fetch().then(
        () => {
          user.set("resume", this.resume);
          user.save();
          console.log("保存成功");
        },
        function(error) {
          // 异常处理
          console.log("出错了");
        }
      );
    },
    printResume() {
      window.print();
    },
    changeSkinPeeler() {
      if (this.skinPeeler === "dark") {
        this.skinPeeler = "default";
        return;
      }
      this.skinPeeler = "dark";
    },
    onLogOut() {
      AV.User.logOut();
      alert("注销成功");
      window.location.reload();
    },
    onClickShare() {
      let currentUser = AV.User.current();
      if (!currentUser) {
        this.$router.push("/login");
      } else {
        this.$router.push("/share");
      }
    },
    exitPreview() {
      this.mode = "edit";
      location.href=location.origin+location.pathname;
    }
  }
};
Vue.component("app-main", appMain);
