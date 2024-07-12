import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Checkbox, Divider, Modal, Tabs } from "antd";
import type { CheckboxProps } from "antd";
import {
  getRolePermissions,
  updateRolePermissions,
} from "@/api/permission-management.api";
import useCheckedList from "@/hooks/useCheckedList";
import {
  GetPermissionListResultDto,
  PermissionGroupDto,
  RoleDto,
} from "@/types/role";

type Props = {
  onClose: (success?: boolean) => void;
  record?: RoleDto;
};

const PermissionsModal = ({ record, onClose }: Props) => {
  const { message } = App.useApp();
  const { checkedList, addItems, removeItems } = useCheckedList([]);

  const { data, isFetching } = useQuery({
    queryKey: ["role-permissions", record?.id],

    queryFn: () => {
      return getRolePermissions(record?.name!);
    },
  });

  const mutation = useMutation({
    mutationFn: (record: RoleDto) => {
      const permissionNames: string[] = [];

      data?.groups.forEach((group) => {
        group.permissions.forEach((permission) => {
          permissionNames.push(permission.name);
        });
      });

      const permissions = permissionNames.map((p) => {
        const isGranted = checkedList.includes(p);
        return {
          name: p,
          isGranted,
        };
      });
      return updateRolePermissions(record.name, permissions);
    },
    onSuccess: () => {
      message.success("Update successful!");
      onClose(true);
    },
  });

  const handleSubmit = () => {
    if (data && record) {
      mutation.mutate(record);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const getPermissionNames = (data: GetPermissionListResultDto): string[] => {
    const permissionNames: string[] = [];

    data.groups.forEach((group) => {
      group.permissions
        .filter((p) => p.isGranted)
        .forEach((permission) => {
          permissionNames.push(permission.name);
        });
    });

    return permissionNames;
  };

  useEffect(() => {
    if (data) {
      addItems(getPermissionNames(data));
    }
  }, [data, addItems]);

  return (
    <Modal
      open={true}
      title={"Permissions - " + record?.name}
      width={600}
      onOk={handleSubmit}
      okText={"Create"}
      onCancel={handleCancel}
      loading={isFetching}
      confirmLoading={mutation.isPending}
      centered
    >
      <div>
        {data && (
          <Tabs
            tabPosition="left"
            items={data.groups.map((g) => {
              return {
                label: g.displayName,
                key: g.name,
                children: (
                  <GroupPermissions
                    group={g}
                    addItems={addItems}
                    removeItems={removeItems}
                  />
                ),
              };
            })}
          />
        )}
      </div>
    </Modal>
  );
};

const GroupPermissions = ({
  group,
  addItems,
  removeItems,
}: {
  group: PermissionGroupDto;
  addItems: (values: string[]) => void;
  removeItems: (values: string[]) => void;
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>(
    group.permissions.filter((x) => x.isGranted).map((x) => x.name)
  );
  const checkAll = group.permissions.length === checkedValues.length;
  const indeterminate =
    checkedValues.length > 0 && checkedValues.length < group.permissions.length;

  const onChange = (values: string[]) => {
    setCheckedValues(values);

    const removedValues = checkedValues.filter(
      (item) => !values.includes(item)
    );
    if (removedValues.length > 0) {
      removeItems(removedValues);
    }

    if (values.length > 0) {
      addItems(values);
    }
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    const values = group.permissions.map((x) => x.name);
    if (e.target.checked) {
      setCheckedValues(values);
      addItems(values);
    } else {
      setCheckedValues([]);
      removeItems(values);
    }
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Select all
      </Checkbox>
      <Divider className="!my-2" />
      <div className="overflow-auto max-h-80">
        <Checkbox.Group
          options={group.permissions.map((p) => {
            return {
              label: p.displayName,
              value: p.name,
              style: { paddingLeft: p.parentName ? "15px" : "0px" },
            };
          })}
          value={checkedValues}
          onChange={onChange}
          className="flex flex-col gap-1"
        />
      </div>
    </div>
  );
};

export default PermissionsModal;
