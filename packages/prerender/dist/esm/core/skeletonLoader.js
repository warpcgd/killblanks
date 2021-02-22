"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Vue = require('vue');
/**
 * skeleton加载模块，方便骨架屏页面和实际页面切换
 * `skeleton模块只能包含一个子节点`
 * @props
 * @example
 *
 * ```
 *  <template>
 *    <SkeletonLoader :show="show">
 *      <div _skeleton_>test skeleton</div>
 *    </SkeletonLoader>
 *  </template>
 *  <script>
 *    import SkeletonLoader from '@yy/prerender-skeleton/src/core/skeletonLoader'
 *    export default {
 *      data () {
 *        return {
 *          show: false
 *        }
 *      },
 *      components: {s
 *        SkeletonLoader
 *      }
 *    }
 *  </script>
 * ```
 */
const skeletonLoader = {
    /**
     * 接受show参数，判断是否展示slot内容
     * @type {Boolean}
     * @default false
     */
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    /**
     * @ignore
     */
    name: 'skeletocnLoader',
    /**
     * @ignore
     */
    functional: true,
    /**
     * @ignore
     */
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render(h, context) {
        const _skeleton_index_ = context.data.attrs._skeleton_ || context.children[0].data.attrs._skeleton_;
        const prerenderDom = _skeleton_index_
            ? document.querySelector(`[prerender="${_skeleton_index_}"]`)
            : document.querySelector(`[prerender]`);
        const { show } = context.props;
        if (prerenderDom && !show) {
            const html = prerenderDom.outerHTML;
            const component = Vue.compile(html);
            return h(component);
        }
        else {
            // return h('div',context.data, context.children)
            return context.children[0];
        }
    }
};
exports.default = skeletonLoader;
