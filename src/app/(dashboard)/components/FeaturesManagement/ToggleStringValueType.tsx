import { Checkbox } from "antd";
import { FeatureDto } from "@/types/feature";

type Props = {
  feature: FeatureDto;
  getFeatureValue: (key: string) => string;
  updateFeatureValue: (key: string, value: string) => void;
};

const ToggleStringValueType = ({
  feature,
  getFeatureValue,
  updateFeatureValue,
}: Props) => {
  const value = getFeatureValue(feature.name);

  const handleChange = (checked: boolean) => {
    const value = checked ? "true" : "false";
    updateFeatureValue(feature.name, value);
  };

  return (
    <div>
      <Checkbox
        defaultChecked={value == "true"}
        onChange={(e) => handleChange(e.target.checked)}
      >
        {feature.displayName}
      </Checkbox>
      {feature.description && (
        <div className="text-xs ps-6">{feature.description}</div>
      )}
    </div>
  );
};

export { ToggleStringValueType };
