type TrackInfo = Record<string, any>;
type anyMap = Record<string, any>;
type Fn<V> = (...args: any[]) => V;
export type FnMap = Record<string, Fn<any>>;
export interface DirectiveBinding {
    name: string;
    value?: any;
    arg?: string;
    oldArg?: string;
    modifiers?: Record<string, boolean>;
}
export declare class BuryPoint {
    defaultKey: string;
    eventMap: anyMap;
    getTrackConfig: Fn<Record<string, any>>;
    constructor(options?: anyMap);
    getanyMay(): Promise<void>;
    getTrackInfo(el: HTMLElement, binding: DirectiveBinding): any;
    handleBindEvent(el: HTMLElement, binding: DirectiveBinding): Promise<void>;
    addClickTrigger(el: HTMLElement, trackInfo: TrackInfo, action: string): void;
}
export {};
