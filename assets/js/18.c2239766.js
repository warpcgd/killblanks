(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{774:function(s,t,e){"use strict";e.r(t);var a=e(101),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey},scopedSlots:s._u([{key:"features",fn:function(){return[e("div",{staticClass:"feature"},[e("h2",[s._v("简单配置⚙️")]),s._v(" "),e("p",[s._v("通过简单的配置即可为页面添加预渲染和骨架屏")])]),s._v(" "),e("div",{staticClass:"feature"},[e("h2",[s._v("预渲染+骨架屏💀")]),s._v(" "),e("p",[s._v("你可以只使用预渲染，也可以预渲染+骨架屏组合使用")])]),s._v(" "),e("div",{staticClass:"feature"},[e("h2",[s._v("提升页面性能⚡")]),s._v(" "),e("p",[s._v("通过使用预渲染和骨架屏可以明显提升页面FCP和LCP")])])]},proxy:!0},{key:"startDemo",fn:function(){return[e("h3",{attrs:{id:"_1-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装"}},[s._v("#")]),s._v(" 1. 安装")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("  "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" @killblanks/prerender -D\n")])])]),e("h3",{attrs:{id:"_2-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-配置"}},[s._v("#")]),s._v(" 2. 配置")]),s._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// webpack.config.js")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" prerender "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@killblanks/prerender'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n  plugins"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("prerender")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("ul",[e("li",[s._v("更多配置请查看"),e("RouterLink",{attrs:{to:"/guides/prerender/"}},[s._v("@killblanks/prerender")])],1)]),s._v(" "),e("h3",{attrs:{id:"_3-使用-killblanks-skeleton-ext"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用-killblanks-skeleton-ext"}},[s._v("#")]),s._v(" 3. 使用"),e("code",[s._v("@killblanks/skeleton-ext")])]),s._v(" "),e("ul",[e("li",[s._v("更多配置请查看"),e("RouterLink",{attrs:{to:"/guides/skeleton-ext/"}},[s._v("@killblanks/skeleton-ext")])],1)]),s._v(" "),e("h3",{attrs:{id:"_4-将生成的骨架屏组件使用在项目中"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-将生成的骨架屏组件使用在项目中"}},[s._v("#")]),s._v(" 4. 将生成的骨架屏组件使用在项目中")]),s._v(" "),e("ul",[e("li",[s._v("比如像"),e("a",{attrs:{href:"https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue",target:"_blank",rel:"noopener noreferrer"}},[s._v("DEMO"),e("OutboundLink")],1),s._v("中所做的一样")])]),s._v(" "),e("h3",{attrs:{id:"_5-在浏览器的console启用prerender-skeleton"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-在浏览器的console启用prerender-skeleton"}},[s._v("#")]),s._v(" 5. 在浏览器的"),e("code",[s._v("console")]),s._v("启用"),e("code",[s._v("PRERENDER_SKELETON")])]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v(" 在Chrome console中输入"),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("PRERENDER_SKELETON"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("启动骨架屏预览\n")])])])]},proxy:!0}])},[e("common-home")],1)}),[],!1,null,null,null);t.default=r.exports}}]);