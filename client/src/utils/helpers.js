export const resetInputs = () => {
  Array.from(document.querySelectorAll("input")).forEach(
    (input) => (input.value = "")
  );
};

export const validateInput = (
  inputValue,
  inputType,
  setAlert,
  setAlertText,
  alertType
) => {
  if (!inputValue) {
    setAlert(true);
    setAlertText(alertType[inputType]);
    return false;
  }
  return true;
};
