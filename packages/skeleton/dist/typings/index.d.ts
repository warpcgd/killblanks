import { DEFAULTMOD } from './config';
declare function genSkeleton(options?: ModType): Promise<void>;
declare function outputSkeleton(element: HTMLElement, options?: ModType | string): Promise<{
    html: HTMLElement;
    style: HTMLStyleElement;
    rootHashClass: string;
}>;
export { genSkeleton, outputSkeleton, DEFAULTMOD };
