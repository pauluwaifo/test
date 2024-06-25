import React, { useId } from "react";
import { StringCaser } from "Utils/utils";
import Toggle from "react-toggle";
import "./MkdInput.css";
import { SkeletonLoader } from "Components/Skeleton";

const MkdInput = ({
  type = "text",
  page,
  cols = "30",
  rows = "50",
  name,
  label,
  errors = null,
  register = () => ({}),
  className,
  placeholder,
  options = [],
  mapping = null,
  disabled = false,
  value = null,
  onChange,
  loading = false,
  required = false,
}) => {
  const uniqueId = useId();
  return (
    <>
      <div
        className={`relative grow ${
          page === "list" ? "w-full pl-2 pr-2 md:w-1/2" : ""
        }`}
      >
        {["radio", "checkbox", "color", "toggle"].includes(type) ? null : (
          <>
            {label && (
              <label
                className="mb-2 block cursor-pointer text-sm "
                htmlFor={uniqueId}
              >
                {label}
                {required && (
                  <sup className="text-[.825rem] text-red-600">*</sup>
                )}
                {/* {StringCaser(label, { casetype: "capitalize", separator: "space" })} */}
              </label>
            )}
          </>
        )}
        {loading ? (
          <SkeletonLoader
            count={1}
            counts={[2]}
            className={`!h-[3rem] !gap-0 rounded-[.625rem] !bg-[#ebebeb] !p-0 `}
          />
        ) : type === "textarea" ? (
          <>
            <textarea
              className={`focus:shadow-outline w-full appearance-none rounded border border-soft-200 px-3 py-2 font-inter leading-tight text-black shadow focus:outline-none ${className} ${
                errors && errors[name] && errors[name]?.message
                  ? "border-red-500"
                  : ""
              }`}
              disabled={disabled}
              id={uniqueId}
              cols={cols}
              name={name}
              placeholder={placeholder}
              rows={rows}
              {...register(name)}
            ></textarea>
          </>
        ) : ["radio", "checkbox", "color", "toggle"].includes(type) ? (
          <div className="flex h-[1.875rem] items-center gap-2 pb-1 pt-3">
            {["toggle"].includes(type) ? (
              <Toggle
                className={`toggle_class  ${className}`}
                // defaultChecked={}
                //  checked={selectRoles}
                icons={false}
                {...(onChange ? { onChange: onChange } : null)}
                {...(value ? { checked: value } : null)}
                // placeholder={placeholder}
                // {...register(name)}
              />
            ) : (
              // <input
              //   disabled={disabled}
              //   type={type}
              //   id={name}
              //   name={name}
              //   {...(value ? { value: value } : null)}
              //   placeholder={placeholder}
              //   {...register(name)}
              //   className={`focus:shadow-outline !h-4 !w-4 cursor-pointer appearance-none rounded border border-soft-200 font-inter leading-tight text-primary shadow focus:outline-none focus:ring-0 ${className} ${
              //     errors && errors[name] && errors[name]?.message
              //       ? "border-red-500"
              //       : ""
              //   } ${
              //     type === "color" ? "min-h-[3.125rem] min-w-[6.25rem]" : ""
              //   }`}
              // />
              <input
                disabled={disabled}
                type={type}
                id={uniqueId}
                name={name}
                {...(value ? { value: value } : null)}
                // {...(value ? { checked: value } : null)}
                placeholder={placeholder}
                {...register(name)}
                className={`focus:shadow-outline !h-4 !w-4 cursor-pointer appearance-none rounded border border-soft-200 font-inter leading-tight text-primary shadow focus:outline-none focus:ring-0 ${className} ${
                  errors && errors[name] && errors[name]?.message
                    ? "border-red-500"
                    : ""
                } ${
                  type === "color" ? "min-h-[3.125rem] min-w-[6.25rem]" : ""
                }`}
              />
            )}
            <label
              className="mb-2 block h-full cursor-pointer font-inter text-sm font-[500] capitalize text-black"
              htmlFor={uniqueId}
            >
              {label}
              {/* {StringCaser(label, {
                casetype: "capitalize",
                separator: "space",
              })} */}
            </label>
          </div>
        ) : type === "dropdown" || type === "select" ? (
          <select
            type={type}
            id={uniqueId}
            disabled={disabled}
            placeholder={placeholder}
            {...register(name)}
            className={`focus:shadow-outline h-[3rem] w-full appearance-none rounded-[.625rem] border border-soft-200 p-[.625rem] px-3 py-2 font-inter leading-tight text-black shadow focus:outline-none focus:ring-0  ${className} ${
              errors && errors[name] && errors[name]?.message
                ? "border-red-500"
                : ""
            }`}
          >
            <option></option>
            {options.map((option, key) => (
              <option value={option} key={key + 1}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "mapping" ? (
          <>
            {mapping ? (
              <select
                type={"number"}
                id={uniqueId}
                disabled={disabled}
                {...(value ? { value: value } : null)}
                placeholder={placeholder}
                {...register(name)}
                className={`focus:shadow-outline h-[3rem] w-full appearance-none rounded-[.625rem] border border-soft-200 p-[.625rem] px-3 py-2 font-inter leading-tight text-black shadow focus:outline-none focus:ring-0  ${className} ${
                  errors && errors[name] && errors[name]?.message
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option></option>
                {options.map((option, key) => (
                  <option value={option} key={key + 1}>
                    {mapping[option]}
                  </option>
                ))}
              </select>
            ) : (
              `Please Pass the mapping e.g {key:value}`
            )}
          </>
        ) : (
          <input
            type={type}
            id={uniqueId}
            disabled={disabled}
            placeholder={placeholder}
            {...register(name)}
            {...(type === "number" ? { step: "0.01" } : null)}
            min={type === "number" ? "0.00" : undefined} //
            className={`focus:shadow-outline h-[3rem] w-full appearance-none rounded-[.625rem] border border-soft-200 p-[.625rem] px-3 py-2 font-inter leading-tight text-black shadow focus:outline-none focus:ring-0 ${className} ${
              errors && errors[name] && errors[name]?.message
                ? "border-red-500"
                : ""
            }`}
          />
        )}

        {errors && errors[name] && (
          <p className="text-field-error absolute inset-x-0 top-full m-auto mt-2 text-[.8rem] italic text-red-500">
            {StringCaser(errors[name]?.message, {
              casetype: "capitalize",
              separator: " ",
            })}
          </p>
        )}
      </div>
    </>
  );
};

export default MkdInput;
