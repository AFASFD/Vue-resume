let app = new Vue({
  el: "#app",
  data: {
    currentUser: {
      id: "",
      userName: ""
    },
    shareLink: "",
    mode: "edit",
    resume: {
      name: "姓名",
      job: "前端工程师",
      birthday: "111111",
      gender: "女",
      email: "123@.com",
      phone: "13644565445",
      skills: [
        {
          name: "静态页面制作",
          description: "完美还原设计稿"
        },
        {
          name: "静态页面制作",
          description: "完美还原设计稿"
        },
        {
          name: "静态页面制作",
          description: "完美还原设计稿"
        },
        {
          name: "静态页面制作",
          description: "完美还原设计稿"
        }
      ],
      projects: [
        {
          name: "我的简历",
          keywords: "CSS3、jQuery、响应式",
          link: "http://xxxx/xxx",
          description: "我是怎么做这个项目的"
        },
        {
          name: "我的简历",
          keywords: "CSS3、jQuery、响应式",
          link: "http://xxxx/xxx",
          description: "我是怎么做这个项目的"
        }
      ]
    },
    previewResume: {}
  },
  watch: {
    "currentUser.id": function(newValue, oldValue) {
      if (newValue) {
        this.getResume(newValue).then(resume => {
          Object.assign(this.resume, resume);
        });
      }
    }
  },
  methods: {
    getResume(id) {
      var query = new AV.Query("_User");
      return query.get(id).then(
        function(todo) {
          return todo.toJSON().resume;
          // 成功获得实例
          // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
        },
        function(error) {
          // 异常处理
        }
      );
    }
  }
});
let currentUser = AV.User.current();
if (currentUser) {
  app.currentUser = currentUser;
  app.shareLink =
    location.origin + location.pathname + "?user_id=" + currentUser.id;
  app.getResume(app.currentUser.id).then(resume => {
    Object.assign(app.resume, resume);
  });
}
let search = location.search;
let reg = /user_id=([^&]+)/;
let matches = search.match(reg);
let userId;
if (matches) {
  userId = matches[1];
  app.mode = "preview";
  app.getResume(userId).then(resume => {
    app.previewResume = resume;
  });
}
