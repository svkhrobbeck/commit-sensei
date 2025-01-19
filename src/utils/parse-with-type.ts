const parseWithType = (type: string = "", value: any, defaultValue: string | number = "") => {
  const matchTypes = ["string", "number", "boolean"];

  type = type.toLowerCase();

  if (!matchTypes.includes(type)) {
    throw new Error("invalid data-type from read googlesheet");
  }

  if (type === "string") {
    return String(value || defaultValue).trim();
  } else if (type === "number") {
    return +(value || defaultValue);
  } else if (type === "boolean") {
    return value === "TRUE" ? true : false;
  } else {
    return String(value).trim();
  }
};

export default parseWithType;
