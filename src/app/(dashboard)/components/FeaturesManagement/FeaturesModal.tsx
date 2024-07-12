import { useEffect, useRef, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Modal, Tabs } from "antd";
import {
  getTenantFeatures,
  updateTenantFeatures,
} from "@/api/feature-management.api";
import { TenantDto } from "@/types/tenant";
import { FeaturesGroupTab } from "./FeaturesGroupTab";

type Props = {
  onClose: (success?: boolean) => void;
  record?: TenantDto;
};

const FeaturesModal = ({ record, onClose }: Props) => {
  const { message } = App.useApp();

  const [isReady, setIsReady] = useState(false);

  const featureValues = useRef<Record<string, string>>({});

  const getFeatureValue = (key: string) => {
    return featureValues.current[key] || "";
  };

  const updateFeatureValue = (key: string, value: string) => {
    featureValues.current[key] = value;
  };

  const { data, isFetching } = useQuery({
    queryKey: ["tenant-features", record?.id],

    queryFn: () => {
      return getTenantFeatures(record?.id!);
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      // Validate feature values

      const values = Object.entries(featureValues.current).map(
        ([key, value]) => ({
          name: key,
          value: value,
        })
      );
      return updateTenantFeatures(record?.id || "", values);
    },
    onSuccess: () => {
      message.success("Update successful!");
      onClose(true);
    },
  });

  const handleSubmit = () => {
    if (data) {
      mutation.mutate();
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  useEffect(() => {
    if (data) {
      const values: Record<string, string> = {};

      data.groups.forEach((group) => {
        group.features.forEach((feature) => {
          values[feature.name] = feature.value;
        });
      });

      featureValues.current = values;
      setIsReady(true);
    }
  }, [data]);

  return (
    <Modal
      open={true}
      title={"Features - " + (record?.name || "Host")}
      width={700}
      onOk={handleSubmit}
      okText={"Save"}
      okButtonProps={{
        icon: <SaveOutlined />,
        disabled: data?.groups.length == 0,
      }}
      onCancel={handleCancel}
      loading={isFetching}
      confirmLoading={mutation.isPending}
      centered
    >
      <div>
        {isReady && data && data.groups.length > 0 && (
          <Tabs
            tabPosition="left"
            items={data.groups.map((g) => {
              return {
                label: g.displayName,
                key: g.name,
                children: (
                  <FeaturesGroupTab
                    group={g}
                    getFeatureValue={getFeatureValue}
                    updateFeatureValue={updateFeatureValue}
                  />
                ),
              };
            })}
          />
        )}
        {isReady && data?.groups.length == 0 && (
          <div>There isn&apos;t any available feature.</div>
        )}
      </div>
    </Modal>
  );
};

export default FeaturesModal;
