var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function() {
  "use strict";
  class Extension {
    constructor(options = {}) {
      this.options = __spreadValues(__spreadValues({}, this.defaults), options);
    }
    init() {
      return null;
    }
    bindEditor(editor = null) {
      this.editor = editor;
    }
    get name() {
      return null;
    }
    get type() {
      return "extension";
    }
    get defaults() {
      return {};
    }
    plugins() {
      return [];
    }
    inputRules() {
      return [];
    }
    pasteRules() {
      return [];
    }
    keys() {
      return {};
    }
  }
  class Node extends Extension {
    constructor(options = {}) {
      super(options);
    }
    get type() {
      return "node";
    }
    get schema() {
      return null;
    }
    commands() {
      return {};
    }
  }
  class Heading extends Node {
    get button() {
      return this.options.levels.map((level) => {
        return {
          id: `h${level}`,
          command: `h${level}`,
          icon: `h${level}`,
          label: window.panel.$t("toolbar.button.heading." + level),
          attrs: { level },
          name: this.name,
          when: ["heading", "paragraph"]
        };
      });
    }
    commands({ type, schema, utils }) {
      let commands = {
        toggleHeading: (attrs) => utils.toggleBlockType(type, schema.nodes.paragraph, attrs)
      };
      this.options.levels.forEach((level) => {
        commands[`h${level}`] = () => utils.toggleBlockType(type, schema.nodes.paragraph, { level });
      });
      return commands;
    }
    get defaults() {
      return {
        levels: [1, 2, 3, 4, 5, 6]
      };
    }
    inputRules({ type, utils }) {
      return this.options.levels.map((level) => utils.textblockTypeInputRule(new RegExp(`^(#{1,${level}})\\s$`), type, () => ({ level })));
    }
    keys({ type, utils }) {
      return this.options.levels.reduce((items, level) => __spreadValues(__spreadValues({}, items), {
        [`Shift-Ctrl-${level}`]: utils.setBlockType(type, { level })
      }), {});
    }
    get name() {
      return "heading";
    }
    get schema() {
      return {
        attrs: {
          level: {
            default: 1
          }
        },
        content: "inline*",
        group: "block",
        defining: true,
        draggable: false,
        parseDOM: this.options.levels.map((level) => ({
          tag: `h${level}`,
          attrs: { level }
        })),
        toDOM: (node) => [`h${node.attrs.level}`, 0]
      };
    }
  }
  function writerNodes(Vue) {
    const thirdParty = window.panel.plugins.thirdParty;
    if (thirdParty.__nodesInitialized)
      return;
    const customNodes = thirdParty.nodes;
    if (!customNodes)
      return;
    const original = Vue.component("k-writer");
    Vue.component("k-writer", {
      extends: original,
      methods: {
        createNodes() {
          const originalNodes = original.options.methods.createNodes.call(this).filter(({ name }) => !Object.keys(customNodes).includes(name));
          const nodes = this.filterExtensions(Object.entries(customNodes).reduce((acc, [key, Constructor]) => {
            acc[key] = new Constructor();
            return acc;
          }, {}), this.nodes);
          if (this && this.nodes && !this.nodes.includes("heading")) {
            const levels = this.nodes.reduce((acc, node) => {
              var _a;
              const match = (_a = node.matchAll(/h([1-6])/gu)) == null ? void 0 : _a.next();
              if (match && match.value && match.value.length > 1 && !acc.includes(match.value[1]))
                acc.push(match.value[1]);
              return acc;
            }, []);
            if (levels.length > 0)
              nodes.push(new Heading({ levels }));
          }
          return [...originalNodes, ...nodes];
        }
      }
    });
    thirdParty.__nodesInitialized = true;
  }
  class largerParagraph extends Node {
    get button() {
      return {
        id: this.name,
        icon: "quote",
        label: window.panel.$t("coralic.extendedWriter.nodes.largerParagraph"),
        name: this.name
      };
    }
    commands({ type, schema, utils }) {
      return {
        largerParagraph: (attrs) => utils.toggleBlockType(type, schema.nodes.paragraph, attrs)
      };
    }
    get name() {
      return "largerParagraph";
    }
    get schema() {
      return {
        content: "inline*",
        group: "block",
        draggable: false,
        parseDOM: [
          {
            tag: "div",
            getAttrs: () => {
              return { class: "-larger-paragraph" };
            }
          }
        ],
        toDOM: () => ["div", { class: "-larger-paragraph" }, 0]
      };
    }
  }
  function writerMarks(Vue) {
    const thirdParty = window.panel.plugins.thirdParty;
    if (thirdParty.__marksInitialized)
      return;
    const customMarks = thirdParty.marks;
    if (!customMarks)
      return;
    const original = Vue.component("k-writer");
    Vue.component("k-writer", {
      extends: original,
      methods: {
        createMarks() {
          const originalMarks = original.options.methods.createMarks.call(this).filter(({ name }) => !Object.keys(customMarks).includes(name));
          const marks = Object.entries(customMarks).reduce((acc, [key, Constructor]) => {
            acc[key] = new Constructor();
            return acc;
          }, {});
          return [...originalMarks, ...this.filterExtensions(marks, this.marks)];
        }
      }
    });
    thirdParty.__marksInitialized = true;
  }
  class Mark extends Extension {
    constructor(options = {}) {
      super(options);
    }
    command() {
      return () => {
      };
    }
    remove() {
      this.editor.removeMark(this.name);
    }
    get schema() {
      return null;
    }
    get type() {
      return "mark";
    }
    toggle() {
      return this.editor.toggleMark(this.name);
    }
    update(attrs) {
      this.editor.updateMark(this.name, attrs);
    }
  }
  class Highlight extends Mark {
    get button() {
      return {
        icon: "star",
        label: window.panel.$t("coralic.extendedWriter.nodes.highlight")
      };
    }
    commands() {
      return () => this.toggle();
    }
    get name() {
      return "highlight";
    }
    get schema() {
      return {
        parseDOM: [{ tag: "mark" }],
        toDOM: (node) => [
          "mark",
          __spreadValues({}, node.attrs),
          0
        ]
      };
    }
  }
  class Doc extends Node {
    get defaults() {
      return {
        inline: false
      };
    }
    get name() {
      return "doc";
    }
    get schema() {
      return {
        content: this.options.inline ? "paragraph+" : "block+"
      };
    }
  }
  class ListDoc extends Doc {
    get defaults() {
      return {
        nodes: ["bulletList", "orderedList"]
      };
    }
    get schema() {
      return {
        content: this.options.nodes instanceof Array ? this.options.nodes.join("|") : "bulletList|orderedList"
      };
    }
  }
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("k-writer", _vm._b({ ref: "input", staticClass: "k-list-input", attrs: { "extensions": _vm.extensions, "nodes": _vm.toolbarNodes, "value": _vm.list }, on: { "input": _vm.onInput } }, "k-writer", _vm.$props, false));
  };
  var staticRenderFns = [];
  render._withStripped = true;
  var ListInput_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const __vue2_script = {
    inheritAttrs: false,
    props: {
      autofocus: Boolean,
      marks: {
        type: [Array, Boolean],
        default: true
      },
      nodes: {
        type: [Array, Boolean],
        default: true
      },
      value: String
    },
    data() {
      return {
        list: this.value,
        html: this.value
      };
    },
    computed: {
      toolbarNodes() {
        return this.nodes === false ? ["bulletList"] : this.nodes === true ? ["bulletList", "orderedList"] : this.nodes;
      },
      extensions() {
        return [
          new ListDoc({
            nodes: this.toolbarNodes,
            inline: true
          })
        ];
      }
    },
    watch: {
      value(html) {
        if (html !== this.html) {
          this.list = html;
          this.html = html;
        }
      }
    },
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      onInput(html) {
        let dom = new DOMParser().parseFromString(html, "text/html");
        let list = dom.querySelector("ul, ol");
        if (!list) {
          this.$emit("input", this.list = "");
          return;
        }
        let text = list.textContent.trim();
        if (text.length === 0) {
          this.$emit("input", this.list = "");
          return;
        }
        this.list = html;
        this.html = html.replace(/(<p>|<\/p>)/gi, "");
        this.$emit("input", this.html);
      }
    }
  };
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  __component__.options.__file = "src/Input/ListInput.vue";
  var ListInput = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  function listNodes(Vue) {
    const originalWriter = Vue.component("k-writer");
    Vue.component("k-writer", {
      extends: originalWriter,
      components: {
        "k-writer-toolbar": {
          extends: originalWriter.component("k-writer-toolbar"),
          computed: {
            hasVisibleButtons() {
              const nodeButtons = Object.keys(this.nodeButtons);
              return nodeButtons.length > 1 || nodeButtons.length === 1 && !(nodeButtons.includes("bulletList") || nodeButtons.includes("paragraph") || nodeButtons.includes("orderedList"));
            }
          }
        }
      }
    });
    const originalList = Vue.component("k-list-field");
    Vue.component("k-list-field", {
      extends: originalList,
      props: {
        nodes: [Array, Boolean]
      }
    });
  }
  var index = "";
  function writerTextAlign(Vue) {
    Vue.component("k-writer", {
      extends: Vue.component("k-writer"),
      props: {
        align: "left" | "center" | "right"
      },
      mounted() {
        this.$el.classList.add("k-writer-text-align-" + (this.align || "left"));
      }
    });
    Vue.component("k-writer-field", {
      extends: Vue.component("k-writer-field"),
      props: {
        align: "left" | "center" | "right"
      }
    });
  }
  window.panel.plugin("coralic/frohberger-writer-nodes", {
    use: [writerNodes, writerMarks, listNodes, writerTextAlign],
    thirdParty: {
      nodes: __spreadProps(__spreadValues({}, window.panel.plugins.thirdParty.nodes || {}), {
        largerParagraph
      }),
      marks: __spreadProps(__spreadValues({}, window.panel.plugins.thirdParty.marks || {}), {
        highlight: Highlight
      })
    },
    components: {
      "k-list-input": ListInput
    }
  });
})();
