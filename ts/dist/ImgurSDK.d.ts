import { ImageEntity } from './entity/ImageEntity';
import { PostMetaEntity } from './entity/PostMetaEntity';
export type * from './ImgurTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ImgurEntityBase } from './ImgurEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ImgurSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Image(entopts?: Record<string, any>): ImageEntity;
    PostMeta(entopts?: Record<string, any>): PostMetaEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ImgurSDK;
    tester(testopts?: any, sdkopts?: any): ImgurSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ImgurSDK;
export { stdutil, config, BaseFeature, ImgurEntityBase, ImgurSDK, SDK, };
