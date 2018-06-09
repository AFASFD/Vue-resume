window.shareLink = {
  props: ["shareLink"],
  template: `
      <div class="share" v-cloak>
        <router-link to="/">关闭</router-link>
        <div class="shareContainer">
            <h1>分享链接:</h1>
            <textarea readonly class="shareLink">{{shareLink}}</textarea>
            <button class="shareBtn" data-clipboard-target=".shareLink" @click="copy">一键复制链接</button>
        </div>
      </div>
      `,
  methods: {
    copy() {
      var clipboard = new ClipboardJS(".shareBtn");
      clipboard.on("success", function(e) {
        e.clearSelection();
      });
    }
  }
};
Vue.component("share", window.shareLink);
