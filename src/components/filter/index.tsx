import { Button, Dropdown, Form, Row } from "antd";
import React, { useCallback, useState } from "react";
import FilterIcon from "@/../public/icon/icon_filter.svg";
import styles from "./filter.module.scss";

const FilterComponent = (props: any) => {
  const {
    contentFilter,
    onOk,
    form,
    resetFunc,
    hidden,
    onlyIcon,
    maxHeight = "500px",
    ...restProps
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const reset = useCallback(() => {
    if (resetFunc) {
      resetFunc();
    }
  }, []);

  return (
    <Dropdown
      {...restProps}
      placement="bottomRight"
      trigger={["click"]}
      open={open}
      onOpenChange={(e) => setOpen(e)}
      dropdownRender={() => (
        <Form form={form} layout="vertical" onFinish={onOk}>
          <div className={styles.container} style={{ maxHeight: maxHeight }}>
            <div className={styles.title}>Filter</div>
            <div className={styles.content}>{contentFilter}</div>
            <div className={styles.btn_container}>
              <Button onClick={reset} size="large">
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setOpen(false)}
                size="large"
              >
                Apply
              </Button>
            </div>
          </div>
        </Form>
      )}
    >
      <Button className={styles.filter} hidden={hidden}>
        {!onlyIcon && <span>Filter</span>}
        <FilterIcon />
      </Button>
    </Dropdown>
  );
};

export default FilterComponent;
