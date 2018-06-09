Vue.component("editable-span", {
  props: ["value", "disabled"],
  template: `
    <span class='editableSpan'>
        <span v-if="!disabled" v-show='!editing' @click='editing=!editing'>{{value}}</span>
        <span v-else>{{value}}</span>
        <input v-show='editing' type="text" v-model='value' @input='triggerEdit' @blur="editing=!editing" v-focus>
    </span>
    `,
  data() {
    return {
      editing: false
    };
  },
  updated() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      let width = input.value.length + "em";
      input.style.width = width;
    });
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
