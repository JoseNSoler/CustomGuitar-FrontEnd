import React from "react";
import { Form } from "react-bootstrap";

const ComboBoxFilter = ({
  name,
  state,
  setState,
  type,
  onChangeFunction = () => {},
}) => {
  const toKebabCase = (str) => {
    return str
      .toLowerCase()
      .replaceAll(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <Form.Select
      aria-label={toKebabCase(name)}
      onChange={(event) => {
        setState({ value: event.target.value, options: state.options });
        onChangeFunction();
      }}>
      <option value="">{name.toUpperCase()}</option>
      {state.options[type].map((optionName) => {
        return (
          <option
            key={type + optionName}
            value={type === "options" ? toKebabCase(optionName) : optionName}>
            {optionName}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default ComboBoxFilter;
