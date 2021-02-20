import React from "react";
import MultiSelect from "./index";

export default {
  component: MultiSelect,
  title: "Forms/MultiSelect",
};

const NonprofitCategories = [
  "Education",
  "Housing",
  "Health",
  "Animals",
  "Environment",
  "Women’s Empowerment",
  "Food",
  "Civil Rights & Social Justice",
  "Mental Health",
  "Immigrant & Refugee Support",
  "Community Development",
  "Human Rights",
  "Voter Access",
  "Arts & Culture",
  "International Aid",
  "Youth Development",
  "LGBTQ+ Support",
  "STEM",
  "Employment",
  "Criminal Justice",
  "Emergency Relief",
  "Sports & Athletics",
  "Research",
  "Veterans Support",
  "Gun Safety",
  "Religious",
].map((name, i) => {
  return {
    id: i + 1,
    name,
  };
});

export const Modal = (args) => {
  return (
    <MultiSelect
      {...args}
      options={NonprofitCategories}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
    />
  );
};

Modal.args = {
  defaultValue: [NonprofitCategories[1], NonprofitCategories[3]],
};
