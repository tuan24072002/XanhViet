export const isMobile = () => {
  const width = window.innerWidth;
  return width <= 1366;
};
export const isPhone = () => {
  const width = window.innerWidth;
  return width < 768;
};
export const errorMessage = (error: any) => {
  //console.log(error)
  let message = "Lỗi kết nối. Vui lòng thử lại!";
  if (error.message !== undefined) {
    if (error.message.content !== undefined) {
      message = error.message.content;
    } else {
      message = error.message;
      if (error.error && error.error.message) {
        message += ". " + error.error.message;
      }
    }
  } else {
    if (error.code !== undefined) {
      message = error.code;
    } else {
      message = error.code;
    }
  }
  return message;
};
export const formatPhoneNumber = (value: string): string => {
  const digits = value?.replace(/\D+/g, "");
  const formatted = digits?.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1  $2  $3");
  return formatted;
};
export const deepCloneObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
export const onlyUnique = (value: any, index: number, array: any[]) => {
  return array.indexOf(value) === index;
};
// export const isDisabledSubmit = (status: 'ACTIVE' | 'INACTIVE', action: actions): boolean =>{
//   if(status === 'INACTIVE'){
//     return true;
//   }
//   return false;
// }
export const encodeToBase64 = (input: any): string => {
  if (typeof input === "object") {
    return btoa(JSON.stringify(input));
  } else if (typeof input === "string") {
    return btoa(input);
  }
  return "";
};
export const createBase64Filter = (
  appState: any,
  group: string,
  type?: string
): string => {
  const payloadFilter = {
    group: group,
    type: type,
    storeCode: appState?.storeCode,
  };
  return btoa(JSON.stringify(payloadFilter));
};
export const isFieldDisabled = (
  action: string,
  fieldName: string,
  typeAccess: string,
  fields?: { select: string[]; update: string[] }
): boolean => {
  if (!["INS", "UPD"].includes(action)) {
    return true;
  }
  if (fieldName === "username" && !["INS"].includes(action)) {
    return true;
  }
  if (typeAccess === "SUPERADMIN") {
    return false;
  } else if (fieldName.includes("attributes.")) {
    return false;
  } else if (
    !fields?.select.includes(fieldName) ||
    !fields?.update.includes(fieldName)
  ) {
    return true;
  } else {
    return false;
  }
};
export const isSubmitDisabled = (
  actions: string[] | undefined,
  currentAction: string,
  typeAccess: string,
  status?: string
): boolean => {
  if (status === "INACTIVE") return true;
  if (typeAccess === "SUPERADMIN") return false;
  const actionMap: Record<string, string> = {
    INS: "create",
    UPD: "update",
    DEL: "delete",
  };

  const mappedAction = actionMap[currentAction] || "";
  return !actions?.includes(mappedAction);
};
export const renderActionButtons = (
  row: any,
  actions?: string[],
  reset: boolean = false
) => {
  const buttons: string[] = [];
  const buttonConfig = [
    {
      action: "reset_password",
      button: `<button class="reset-btn bg-blue-500 py-1 px-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                <i title="Reset password" class='bx bxs-lock-alt'></i>
              </button>`,
    },
    {
      action: "update",
      button: `<button class="update-btn bg-blue-500 py-1 px-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                <i title="Edit user" class='bx bxs-edit'></i>
              </button>`,
    },
    {
      action: "delete",
      button: `<button class="delete-btn bg-red-500 py-1 px-2 text-white flex items-center justify-center rounded-md" data-row="${row}">
                <i title="Delete user" class='bx bx-trash'></i>
              </button>`,
    },
  ];
  buttonConfig.forEach(({ action, button }) => {
    if (action === "reset_password" && !reset) return;
    if (actions?.includes(action)) {
      buttons.push(button);
    }
  });
  if (!actions) {
    buttonConfig.forEach(({ action, button }) => {
      if (action === "reset_password" && !reset) return;
      buttons.push(button);
    });
  }
  return `
    <div style="display: flex; justify-content: center; align-items: center; gap: 5px; height: 100%;">
      ${buttons.join("")}
    </div>
  `;
};
export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const parseCurrencyToNumber = (currency: string): number => {
  //input: 123,000 đ => output: 123000
  return parseInt(currency?.replace(/[^\d]/g, ""), 10) || 0;
};
export const formatNumberToCurrency = (
  amount: number,
  unit: string = "đ"
): string => {
  //input: 123000 => output: 123,000 đ
  return amount?.toLocaleString("vi-VN") + ` ${unit}`;
};
export const formatVietnamesePhoneNumber = (phone: string) => {
  phone = phone?.trim();
  if (phone?.startsWith("+84")) {
    const digits = phone?.slice(3);
    const group1 = digits.slice(0, 3);
    const group2 = digits.slice(3, 6);
    const group3 = digits.slice(6);
    return `+84 ${group1} ${group2} ${group3}`;
  } else if (phone?.startsWith("0")) {
    const group1 = phone?.slice(1, 4);
    const group2 = phone?.slice(4, 7);
    const group3 = phone?.slice(7);
    return `0${group1} ${group2} ${group3}`;
  }
  return phone;
};
