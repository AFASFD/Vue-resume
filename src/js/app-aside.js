Vue.component("app-aside", {
  props: ["logoutvisible", "mode"],
  data() {
    return {
      selected: "save",
      upper: ["save", "share", "print", "changeSkinPeeler"]
    };
  },
  template: `
      <aside v-if="mode==='edit'">
          <div class="upper ">
              <ul>
                  <li @click="onClick($event)" :class="{active: selected==='save'}">
                      <button @click="$emit('click-save')">保存</button>
                  </li>
                  <li @click="onClick($event)" :class="{active: selected==='share'}">
                      <button @click="$emit('click-share')" to="/share">分享</button>
                  </li>
                  <li @click="onClick($event)" :class="{active: selected==='print'}">
                      <button @click="$emit('click-print')">打印</button>
                  </li>
                  <li @click="onClick($event)" :class="{active: selected==='changeSkinPeeler'}">
                      <button @click="$emit('change-skin-peeler')">换肤</button>
                  </li>
              </ul>
          </div>
          <div class="lower ">
              <button @click="$emit('click-log-out')" v-show="logoutvisible">登出</button>
          </div>
      </aside>`,
  methods: {
    onClick(e) {
      let li = e.currentTarget;
      let parent = li.parentNode;
      let children = parent.children;
      for (let i = 0; i < children.length; i++) {
        if (li === children[i]) {
          this.selected = this.upper[i];
        }
      }
    }
  }
});
