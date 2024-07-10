type ValueValidator = {
  name: string;
};

type FeatureValueTypeDto = {
  name: string;
  validator: ValueValidator;
};

export type FeatureDto = {
  depth: number;
  description: string;
  displayName: string;
  name: string;
  parentName?: string;
  value: string;
  valueType: FeatureValueTypeDto;
};

export type FeatureGroupDto = {
  name: string;
  displayName: string;
  features: FeatureDto[];
};

export type FeatureListResultDto = {
  groups: FeatureGroupDto[];
};
