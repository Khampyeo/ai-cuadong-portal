import { Col, Row } from "antd";
import { FeatureDto, FeatureGroupDto } from "@/types/feature";
import { ToggleStringValueType } from "./ToggleStringValueType";

type Props = {
  group: FeatureGroupDto;
  getFeatureValue: (key: string) => string;
  updateFeatureValue: (key: string, value: string) => void;
};

const FeaturesGroupTab = ({
  group,
  getFeatureValue,
  updateFeatureValue,
}: Props) => {
  const renderFeatureControl = (feature: FeatureDto) => {
    switch (feature.valueType.name) {
      case "ToggleStringValueType":
        return (
          <ToggleStringValueType
            feature={feature}
            getFeatureValue={getFeatureValue}
            updateFeatureValue={updateFeatureValue}
          />
        );
    }

    return feature.valueType.name;
  };

  return (
    <div>
      <div className="overflow-auto max-h-80">
        <Row>
          {group.features.map((f) => {
            return (
              <Col key={f.name} span={24} className="mb-3">
                {renderFeatureControl(f)}
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export { FeaturesGroupTab };
