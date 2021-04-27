import { Compiler } from 'webpack';
declare class PrerenderPlugin {
    /**
     * @internal
     */
    option: Options | undefined;
    /**
     * @internal
     */
    constructor(option?: Options);
    /**
     * @internal
     */
    apply(compiler: Compiler): void;
    /**
     * @internal
     */
    private init;
    /**
     * @internal
     */
    private injectJs;
    /**
     * @internal
     */
    private outputSkeletonScreen;
}
export default PrerenderPlugin;
