declare module 'qs' {
    export interface ParsedQs {
        [key: string]: string | string[] | undefined;
    }
    export function parse(str: string, options?: any): ParsedQs;
    export function stringify(obj: any, options?: any): string;
}