export enum TargetOSEnum {
    Windows = 1,
    MacOS = 2,
    Linux = 3,
    IOS = 4,
    Android = 5,
}

export const TargetOS_REVERSE: Record<TargetOSEnum, string> = {
    [TargetOSEnum.Windows]: "Windows",
    [TargetOSEnum.MacOS]: "MacOS",
    [TargetOSEnum.Linux]: "Linux",
    [TargetOSEnum.IOS]: "IOS",
    [TargetOSEnum.Android]: "Android",
};

export enum DownloadSourceEnum {
     GooglePlay=1,
   AppStore = 2,
   MicrosoftStore = 3,
   Website = 4
}

export const DownloadSource_REVERSE: Record<DownloadSourceEnum, string> = {
    [DownloadSourceEnum.GooglePlay]: "GooglePlay",
    [DownloadSourceEnum.AppStore]: "AppStore",
    [DownloadSourceEnum.MicrosoftStore]: "MicrosoftStore",
    [DownloadSourceEnum.Website]: "Website",
};



export interface ReleaseType{
    id:number;
    version:string;
    targetOS:TargetOSEnum;
    downloadSource:DownloadSourceEnum;
    changeLog:string;
    changeLogAr:string;
    productId:number;
    downloadUrl:string;
}