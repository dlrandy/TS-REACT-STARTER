/* eslint-disable import/prefer-default-export */

declare let window: any;
export const b64EncodeUnicode = (str: string) => window.btoa(
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (
    match,
    p1,
  ) => String.fromCharCode(((`0x${p1}`) as any) as number)),
);
