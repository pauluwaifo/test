import {
  CircleCheckMarkIcon,
  CircleDollarIcon,
  ExCircleIcon,
  PendingIcon,
  SubmittedIcon,
  VoidedIcon,
} from "Assets/svgs";

export const optionTypes = {
  STATIC: "static",
  DROPDOWN: "dropdown",
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value) => {
  if (value != "") {
    return value;
  } else {
    return undefined;
  }
};

export function empty(value) {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    value === "undefined"
  );
}

/**
 * @typedef {Object} StringCaserOptions
 * @property {"space" | String} separator - define what separates each word, undefined returns no separation - passing "space" separates the words by a space
 * @property {"uppercase" | "lowercase" | "capitalize" | "camelCase" | "PascalCase"} casetype - text case type, uppercase, lowercase of capitalized | default is lowercase
 */
/**
 *
 * @param {String} string - text to convert
 * @param {StringCaserOptions} options - options
 * @param {Array} exclude - special characters to retain
 * @returns String
 */
export const StringCaser = (string, options, exclude = []) => {
  if (!string) return null;
  if (typeof string !== "string") return null;
  const removedSpecialCharacters = exclude.length
    ? string.replace(new RegExp(`[^a-zA-Z0-9${exclude.join("")}]`, "g"), " ")
    : string.replace(/[^a-zA-Z0-9]/g, " ");
  let casedText = [];
  const splitWords = removedSpecialCharacters.split(" ").filter(Boolean);

  if (options?.casetype === "capitalize") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) =>
        `${dt[0].toUpperCase()}${dt.substring(1).toLowerCase()} `
    );
  }
  if (options?.casetype === "uppercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toUpperCase());
  }
  if (options?.casetype === "lowercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toLowerCase());
  }
  if (options?.casetype === "camelCase") {
    casedText = splitWords.map((/** @type {string} */ dt, index) =>
      index === 0
        ? dt.toLowerCase()
        : `${dt[0].toUpperCase()}${dt.substring(1)} `
    );
  }
  if (options?.casetype === "PascalCase") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) => `${dt[0].toUpperCase()}${dt.substring(1)}`
    );
  }

  if (options?.separator) {
    if (options?.separator === "space") {
      return casedText.join(" ");
    } else {
      return casedText.join(options?.separator);
    }
  } else {
    return casedText.join("");
  }
};

export const mappingValues = {
  submitted: (
    <>
      <SubmittedIcon /> submitted
    </>
  ),
  pending: (
    <>
      <PendingIcon /> pending
    </>
  ),
  completed: (
    <>
      <CircleCheckMarkIcon /> completed
    </>
  ),
  cancelled: (
    <>
      <ExCircleIcon fill="red" stroke="white" /> cancelled
    </>
  ),
  Voided: (
    <>
      <VoidedIcon /> Voided
    </>
  ),
  deleted: (
    <>
      <ExCircleIcon fill="red" stroke="white" /> Deleted
    </>
  ),
  false: (
    <>
      <CircleCheckMarkIcon fill="#A1A1A9" /> false
    </>
  ),
  active: (
    <>
      <CircleCheckMarkIcon /> Active
    </>
  ),
  inactive: (
    <>
      <CircleCheckMarkIcon fill="#A1A1A9" /> Inactive
    </>
  ),
  closed: (
    <>
      <CircleCheckMarkIcon /> Closed
    </>
  ),
  open: (
    <>
      <CircleCheckMarkIcon fill="#A1A1A9" /> Open
    </>
  ),
  true: (
    <>
      <CircleCheckMarkIcon /> true
    </>
  ),
  "not held": (
    <>
      <CircleCheckMarkIcon /> Not Held
    </>
  ),
  held: (
    <>
      <CircleCheckMarkIcon fill="#A1A1A9" /> Held
    </>
  ),
  approved: (
    <>
      <CircleCheckMarkIcon /> approved
    </>
  ),
  charged: (
    <>
      <CircleDollarIcon /> Charge Added
    </>
  ),
};

export function truncate(text, length = null) {}

export function processList(value, options, globalDispatch, authDispatch) {
  // TO DOl
  // updated
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (error) {
    console.error("Failed to parse JSON", error);
    return value;
  }

  // Ensure parsedValue is an array
  if (!Array.isArray(parsedValue)) {
    console.error("Parsed value is not an array");
    return value;
  }

  // Check the listType from options
  const { listType, action } = options;
  let processedValue;

  switch (listType) {
    case "json|object_array":
      processedValue = parsedValue.map((item, index) => {
        if (typeof item === "object" && item !== null) {
          // Optionally dispatch actions based on the item and action
          if (globalDispatch) {
            globalDispatch({ type: "PROCESS_ITEM", payload: item });
          }
          if (authDispatch) {
            authDispatch({ type: "PROCESS_ITEM", payload: item });
          }

          return (
            <div key={index}>
              {action ? item[action] : JSON.stringify(item)}
            </div>
          );
        } else {
          return <div key={index}>{JSON.stringify(item)}</div>;
        }
      });
      break;

    case "json|number_array":
      processedValue = parsedValue.map((item, index) => (
        <div key={index}>{item}</div>
      ));
      break;

    case "json|string_array":
      processedValue = parsedValue.map((item, index) => (
        <div key={index}>{item}</div>
      ));
      break;

    default:
      processedValue = value;
      break;
  }

  return <div>{processedValue}</div>;
}
