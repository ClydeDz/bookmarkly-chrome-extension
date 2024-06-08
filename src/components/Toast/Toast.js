import { Notification } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { TOAST_TYPE } from "../../const/app";
import "./toast.css";

export const Toast = ({ toast, closeToast }) => {
  const xIcon = <IconX />;
  const checkIcon = <IconCheck />;
  const isSuccess = toast.type === TOAST_TYPE.SUCCESS;

  return (
    <Notification
      title={toast.title}
      color={isSuccess ? "green" : "red"}
      icon={isSuccess ? checkIcon : xIcon}
      onClose={() => closeToast(toast.id)}
      className="toast"
    >
      {toast.message}
    </Notification>
  );
};
