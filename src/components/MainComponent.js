import React, { useState } from "react";
import styles from "./MainComponent.module.css";
import cash from "../cash";

const getKey = function (key) {
  const find = cash.find((item) => Object.keys(item)[0] === key);
  return find ? Object.values(find)[0] : "Not found";
};

const setKey = function (key, value) {
  const find = cash.find((item) => Object.keys(item)[0] === key);
  if (find) {
    find[key] = value;
    return;
  }
  if (cash.length < 2) {
    cash.push({ [key]: value });
  } else {
    cash.splice(0, cash.length - 1);
    cash.push({ [key]: value });
  }
};

const MainComponent = function () {
  const [formData, setFormData] = useState({ key: "", value: "" });

  if (cash.length > 2) {
    cash.splice(0, cash.length - 2);
  }

  const tableClickHandler = function (e) {
    setFormData({ key: Object.keys(e)[0], value: Object.values(e)[0] });
  };

  const formChangeHandler = function (e) {
    setFormData(
      Object.assign(
        { ...formData },
        e.target.name === "key"
          ? { key: e.target.value }
          : { value: e.target.value }
      )
    );
  };

  const formSubmitHandler = function (e) {
    e.preventDefault();
    setKey(formData.key, formData.value);
    setFormData({ key: "", value: "" });
  };

  return (
    <div className={styles.container}>
      Cash Storage
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <label>
          <input
            type="text"
            name="key"
            placeholder="Key:"
            value={formData.key}
            onChange={formChangeHandler}
          />
        </label>
        <label>
          <input
            type="text"
            name="value"
            placeholder="Value:"
            value={formData.value}
            onChange={formChangeHandler}
          />
        </label>
        <input
          className={
            formData.key && formData.value
              ? styles.button__active
              : styles.button__hidden
          }
          type="submit"
          value="Save"
        />
      </form>
      {cash.length !== 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {cash.map((item) => (
              <tr
                key={Object.keys(item)}
                onClick={tableClickHandler.bind(null, item)}
              >
                <td name="key">{Object.keys(item)}</td>
                <td name="value">{Object.values(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default MainComponent;
