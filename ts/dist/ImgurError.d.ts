import { Context } from './Context';
declare class ImgurError extends Error {
    isImgurError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ImgurError };
