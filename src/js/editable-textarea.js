Vue.component("editable-textarea", {
  props: ["value", "disabled"],
  template: `
    <span class='editableText'>
        <span v-if="!disabled" v-show='!editing' @click='editing=!editing'>{{value}}</span>
        <span v-else>{{value}}</span>
        <textarea v-show='editing' type="text" v-model='value' @input='triggerEdit' @blur="editing=!editing" v-focus>{{value}}</textarea>
    </span>
    `,
  data() {
    return {
      editing: false
    };
  },
  methods: {
    triggerEdit(e) {
      this.$emit("edit", e.target.value);
    }
  }
});
Vue.directive("focus", {
  update: function(el) {
    el.focus();
  }
});
