import { useState } from "react";
import { TOAST_TIMEOUT, TOAST_TYPE } from "../const/app";
import { ToastContext } from "../context/ToastContext";
import { Toast } from "../components/Toast/Toast";

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState([]);

  const showToast = ({
    title,
    message,
    type = TOAST_TYPE.SUCCESS,
    id = Math.random(),
  }) => {
    setToast((oldArray) => [...oldArray, { id, title, message, type }]);
    setTimeout(() => {
      setToast((oldArray) => [...oldArray.filter((d) => d.id !== id)]);
    }, TOAST_TIMEOUT);
  };

  const closeToast = (itemToDelete) => {
    setToast((oldArray) => [...oldArray.filter((d) => d.id !== itemToDelete)]);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && toast.length > 0 && (
        <div className="toast-parent">
          {toast.map((t) => {
            return <Toast toast={t} closeToast={closeToast} key={t.id} />;
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
};
