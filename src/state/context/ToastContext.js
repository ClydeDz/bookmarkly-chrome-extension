import { createContext, useState } from "react";

import { TOAST_TYPE } from "../../const/app";
import { Toast } from "../../components/Toast/Toast";

export const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, message, type = TOAST_TYPE.SUCCESS }) => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast toast={toast} showToast={setToast} />}
    </ToastContext.Provider>
  );
};
