export default interface RoutineTemplateType {
  apiId: number;
  title: string;
  description: string;
  targetGender: TargetGender;
  level: TargetLevel;
  targetLanguage: TargetLanguage;
}

export enum TargetGender {
  Both = 0,
  Male = 1,
  Female = 2,
}
export enum TargetLanguage {
  English = 1,
  Arabic = 2,
}
export const TargetGender_REVERSE: Record<TargetGender, string> = {
  [TargetGender.Both]: "Both",
  [TargetGender.Male]: "Male",
  [TargetGender.Female]: "Female",
};

export enum TargetLevel {
  None = 0,
  Beginner = 1,
  Novice = 2,
  Intermediate = 3,
  Advanced = 4,
  Elite = 5,
}

export const TargetLevel_REVERSE: Record<TargetLevel, string> = {
  [TargetLevel.None]: "None",
  [TargetLevel.Beginner]: "Beginner",
  [TargetLevel.Novice]: "Novice",
  [TargetLevel.Intermediate]: "Intermediate",
  [TargetLevel.Advanced]: "Advanced",
  [TargetLevel.Elite]: "Elite",
};
export const TargetLanguage_REVERSE: Record<TargetLanguage, string> = {
  [TargetLanguage.English]: "English",
  [TargetLanguage.Arabic]: "Arabic",
};
