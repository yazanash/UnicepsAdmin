export enum PlatformEnum {
  Mobile = 1,
  Desktop = 2,
  Web = 3,
}

export const PLATFORM_MAP_REVERSE: Record<PlatformEnum, string> = {
  [PlatformEnum.Mobile]: "Mobile",
  [PlatformEnum.Desktop]: "Desktop",
  [PlatformEnum.Web]: "Web",
};


export interface ProductType{
    id: number,
    name: string,
    platform: PlatformEnum,
    description: string,
    heroImage: string,
    appId: number
}

