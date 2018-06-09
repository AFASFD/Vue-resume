Vue.component("resume", {
  props: ["mode", "displayResume", "resume"],
  data() {
    return {};
  },
  template: `
    <div class="resume ">
        <section class="profile ">
            <h1>
                <editable-span :disabled="mode === 'preview'" :value='displayResume.name' v-on:edit="onEdit( 'name',$event) "></editable-span>
            </h1>
            <div class="about">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-nianling"></use>
                    </svg>
                    <editable-span :disabled="mode === 'preview'" :value='displayResume.birthday' v-on:edit="onEdit( 'birthday',$event) "></editable-span>
                </p>
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dizhi1"></use>
                    </svg>
                    <editable-span :disabled="mode === 'preview'" :value='displayResume.gender' v-on:edit="onEdit( 'gender',$event) "></editable-span>
                </p>
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianhua"></use>
                    </svg>
                    <editable-span :disabled="mode === 'preview'" :value='displayResume.email' v-on:edit="onEdit( 'email',$event) "></editable-span>
                </p>
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youxiang"></use>
                    </svg>
                    <editable-span :disabled="mode === 'preview'" :value='displayResume.phone' v-on:edit="onEdit( 'phone',$event) "></editable-span>
                </p>
            </div>
            <div class="job">
                <p>
                    应聘职位：
                    <editable-span :disabled="mode === 'preview'" :value='displayResume.job' v-on:edit="onEdit( 'job',$event) "></editable-span>
                </p>
            </div>
        </section>
        <section class="skills ">
            <h2>
                个人技能
            </h2>
            <ul>
                <li v-for="skill,index in displayResume.skills ">
                    <span class="name ">
                        <editable-span :disabled="mode === 'preview'" :value="skill.name " @edit="onEdit('skills['+index+'].name',$event) "></editable-span>
                    </span>
                    <div class="description ">
                        <editable-textarea :disabled="mode === 'preview'" :value="skill.description " @edit="onEdit('skills['+index+'].description',$event) "></editable-textarea>
                    </div>
                    <span v-if="index>=4" @click="removeSkill(index)" class="removeSkill">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete-br"></use>
                        </svg>
                    </span>
                </li>
                <li v-if="mode==='edit'" class="addSkill">
                    <svg class="icon" aria-hidden="true" @click="addSkill">
                        <use xlink:href="#icon-tianjia"></use>
                    </svg>
                </li>
            </ul>
        </section>
        <section class="projects">
            <h2>项目经历</h2>
            <ol>
                <li v-for="project,index in displayResume.projects">
                    <div class="header">
                        <div class="start">
                            <h3>
                                <editable-span :disabled="mode === 'preview'" :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                            </h3>
                            <span class="keywords">
                                <editable-span :disabled="mode === 'preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                            </span>
                        </div>
                        <div class="end">
                            <span class="link">
                                <editable-span :disabled="mode === 'preview'" :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                            </span>
                        </div>
                    </div>
                    <p class="description">
                        <editable-textarea :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-textarea>
                    </p>
                    <span v-if="index>=2" @click="removeProject(index)" class="removeProject">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete-br"></use>
                        </svg>
                    </span>
                </li>
                <li v-if="mode==='edit'" class="addProject">
                    <svg class="icon" aria-hidden="true" @click="addProject">
                        <use xlink:href="#icon-tianjia"></use>
                    </svg>
                </li>
            </ol>
        </section>
        <footer>求职<span>简</span>历</footer>
    </div>
    `,
  methods: {
    onEdit(key, value) {
      let reg = /\[(\d+)\]/g;
      key = key.replace(reg, (match, number) => {
        return `.${number}`;
      });
      let array = key.split(".");
      let result = this.resume;
      for (let i = 0; i < array.length; i++) {
        if (i === array.length - 1) {
          result[array[i]] = value;
        } else {
          result = result[array[i]];
        }
      }
    },
    addSkill() {
      this.resume.skills.push({
        name: "静态页面制作",
        description: "完美还原设计稿"
      });
    },
    removeSkill(index) {
      this.resume.skills.splice(index, 1);
    },
    addProject() {
      this.resume.projects.push({
        name: "我的简历",
        keywords: "CSS3、jQuery、响应式",
        link: "http://xxxx/xxx",
        description: "我是怎么做这个项目的"
      });
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1);
    }
  }
});
