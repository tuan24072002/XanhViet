// const isFormFieldInvalid = (name: string, formik: any) => {
//   return !!(formik.touched[name] && formik.errors[name])
// }

// const getFormErrorMessage = (name: string, formik: any) => {
//   return isFormFieldInvalid(name, formik) ? <span className="text-red-600 text-xs">{formik.errors[name]}</span> : <></>;
// };

const isFormFieldInvalid = (name: string, formik: any) => {
  const accessNestedField = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  };

  const error = accessNestedField(formik.errors, name);
  const touched = accessNestedField(formik.touched, name);
  return !!(touched && error);
};
const getFormErrorMessage = (name: string, formik: any) => {
  const accessNestedField = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  };

  const error = accessNestedField(formik.errors, name);
  return isFormFieldInvalid(name, formik) ? (
    <span className="text-red-600 text-sm font-semibold">{error}</span>
  ) : null;
};


const getFormErrorMessageString = (name: string, formik: any) => {
  return isFormFieldInvalid(name, formik) ? formik.errors[name] : "";
};
export { isFormFieldInvalid, getFormErrorMessage, getFormErrorMessageString };
