import React from "react";
import Combobox from "./index";

export default {
  title: "Forms/Combobox",
  component: Combobox,
};

const FRUITS_AND_VEGGIES = [
  "Apple",
  "Artichoke",
  "Asparagus",
  "Banana",
  "Beets",
  "Bell pepper",
  "Broccoli",
  "Brussels sprout",
  "Cabbage",
  "Carrot",
  "Cauliflower",
  "Celery",
  "Chard",
  "Chicory",
  "Corn",
  "Cucumber",
  "Daikon",
  "Date",
  "Edamame",
  "Eggplant",
  "Elderberry",
  "Fennel",
  "Fig",
  "Garlic",
  "Grape",
  "Honeydew melon",
  "Iceberg lettuce",
  "Jerusalem artichoke",
  "Kale",
  "Kiwi",
  "Leek",
  "Lemon",
  "Mango",
  "Mangosteen",
  "Melon",
  "Mushroom",
  "Nectarine",
  "Okra",
  "Olive",
  "Onion",
  "Orange",
  "Parship",
  "Pea",
  "Pear",
  "Pineapple",
  "Potato",
  "Pumpkin",
  "Quince",
  "Radish",
  "Rhubarb",
  "Shallot",
  "Spinach",
  "Squash",
  "Strawberry",
  "Sweet potato",
  "Tomato",
  "Turnip",
  "Ugli fruit",
  "Victoria plum",
  "Watercress",
  "Watermelon",
  "Yam",
  "Zucchini",
];

function asyncSearchVeggies(searchString) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = FRUITS_AND_VEGGIES.filter((x) =>
        x.toLowerCase().startsWith(searchString)
      );
      resolve(result);
    }, 500);
  });
}

export const basic = () => {
  return (
    <Combobox
      label="Start typing"
      onSearch={(searchString) => {
        return FRUITS_AND_VEGGIES.filter((x) =>
          x.toLowerCase().startsWith(searchString)
        );
      }}
    />
  );
};

export const withInitialValue = () => {
  return (
    <Combobox
      label="Prepopulate value"
      value="Apple"
      onSearch={(searchString) => {
        return FRUITS_AND_VEGGIES.filter((x) =>
          x.toLowerCase().startsWith(searchString)
        );
      }}
    />
  );
};

export const autoSelect = () => {
  return (
    <Combobox
      label="Auto Select last keyboard highlighted item"
      autoSelect
      onSearch={(searchString) => {
        return FRUITS_AND_VEGGIES.filter((x) =>
          x.toLowerCase().startsWith(searchString)
        );
      }}
    />
  );
};

export const clearOnBlur = () => {
  return (
    <Combobox
      label="Clears input when blurring even if an item was highlighted via keyboard navigation"
      clearOnBlur
      onSearch={(searchString) => {
        return FRUITS_AND_VEGGIES.filter((x) =>
          x.toLowerCase().startsWith(searchString)
        );
      }}
    />
  );
};

export const clearOnBlurWithAutoSelect = () => {
  return (
    <Combobox
      label="Only clears when no item was highlighted via keyboard navigation"
      clearOnBlur
      autoSelect
      onSearch={(searchString) => {
        return FRUITS_AND_VEGGIES.filter((x) =>
          x.toLowerCase().startsWith(searchString)
        );
      }}
    />
  );
};

export const asyncApiExample = () => {
  return (
    <Combobox
      label="Search produce api"
      onSearch={(searchString) => {
        // this function returns a promise so which the combobox can handle because
        // onSearch is run inside an async function and the result is always awaited
        return asyncSearchVeggies(searchString);
      }}
    />
  );
};
