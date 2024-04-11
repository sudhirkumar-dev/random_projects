import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

const App2 = () => {
  let familyData = {
    self: true,
    spouse: true,
    son: false,
    daughter: false,
    father: false,
    mother: false,
    fatherInLaw: false,
    motherInLaw: false,
    sonCount: 0,
    daughterCount: 0,
  };
  const [postBody, setPostBody] = useState({
    firstname: "",
    lastname: "",
    pincode: "",
    policyType: "",
    noOfPeople: "",
    noOfChildren: "",
    noOfParents: "",
    highestElderAge: "",
    selectedCoverage: "",
    tenure: "",
    number: "",
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useFormPersist("storageKey", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  let tenure = ["1 Year", "2 Year", "3 Year"];
  let individualSumInsured = ["5", "7", "10", "15", "25", "50", "100"];

  const renderChildAgeFields = (count, type) => {
    let ageInputs = [];
    for (let i = 0; i < count; i++) {
      const fieldName = `${type}Age${i + 1}`;
      console.log(fieldName, "fieldName");
      ageInputs.push(
        <label key={`${type}${i + 1}`}>
          {type} {i + 1}
          <input
            type="number"
            {...register(fieldName, {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (val < 1 || val > 24) {
                  return "Age should be in the range of 1-24";
                }
              },
            })}
          />
        </label>
      );
    }
    return ageInputs;
  };

  const onSubmit = handleSubmit((data) => {
    let policyType = familyData.self ? "Individual" : "Floater";
    if (policyType === "Individual") {
      const selectedCount = Object.values(familyData).filter(
        (value) => value === true
      ).length;
      if (selectedCount !== 1 || !familyData.self) {
        policyType = "Floater";
      }
    }
    let agesArray = [];
    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().includes("age")) {
        agesArray.push(data[key]);
      }
    });
    let maxAge = Math.max(...agesArray);
    agesArray = agesArray.filter((age) => age != maxAge);
    console.log(data, agesArray, maxAge);
    let noOfChildren = 0;
    if (familyData.son) {
      noOfChildren += familyData.sonCount;
    }
    if (familyData.daughter) {
      noOfChildren += familyData.daughterCount;
    }
    let noOfPeople = 0;
    if (familyData.self) {
      noOfPeople++;
    }
    if (familyData.spouse) {
      noOfPeople++;
    }
    if (familyData.father) {
      noOfPeople++;
    }
    if (familyData.mother) {
      noOfPeople++;
    }
    if (familyData.fatherInLaw) {
      noOfPeople++;
    }
    if (familyData.motherInLaw) {
      noOfPeople++;
    }
    if (familyData.son) {
      noOfPeople += familyData.sonCount;
    }
    if (familyData.daughter) {
      noOfPeople += familyData.daughterCount;
    }

    let noOfParents = 0;
    if (familyData.father) {
      noOfParents++;
    }
    if (familyData.mother) {
      noOfParents++;
    }
    if (familyData.fatherInLaw) {
      noOfParents++;
    }
    if (familyData.motherInLaw) {
      noOfParents++;
    }
    console.log(data, maxAge, agesArray, policyType, noOfChildren, noOfPeople,noOfParents);
    setPostBody((prev) => ({
      ...prev,
      familyAges: agesArray,
      firstname: data.firstname,
      highestElderAge: maxAge.toString(),
      lastname: data.lastname,
      noOfChildren: noOfChildren,
      noOfPeople: noOfPeople,
      noOfParents:noOfParents,
      number: data.number,
      pincode: data.pincode,
      policyType: policyType,
      selectedCoverage: data.selectedCoverage,
      tenure: data.tenure,
    }));
  });
  console.log(postBody, "postBody created");

  return (
    <form onSubmit={onSubmit}>
      <label>
        {errors.firstname ? <p>{errors.firstname.message}</p> : "First Name"}
        <input
          {...register("firstname", { required: "This field is required" })}
        />
      </label>
      <label>
        {errors.lastname ? <p>{errors.lastname.message}</p>:"Last Name"}
        <input
          {...register("lastname", { required: "This field is required" })}
        />
      </label>
      <label>
        {errors.number ? <p>{errors.number.message}</p>:"Number"}
        <input
          type="number"
          {...register("number", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "number should be of 10 numbers",
            },
            maxLength: {
              value: 10,
              message: "Number should be of 10 digits",
            },
          })}
        />
      </label>
      <label>
        {errors.pincode ? <p>{errors.pincode.message}</p> : "Number"}
        <input
          type="number"
          {...register("pincode", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "number should be of 6 digits",
            },
            maxLength: {
              value: 6,
              message: "Number should be of 6 digits",
            },
          })}
        />
      </label>
      {familyData.self && (
        <label>
          {errors.selfage ? <p>{errors.selfage.message}</p>: "Self Age"}
          <input
            type="number"
            {...register("selfage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}
      {familyData.spouse && (
        <label>
          {errors.spouseage ? <p>{errors.spouseage.message}</p> : "Spouse Age"}
          <input
            type="number"
            {...register("spouseage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}
      {familyData.son &&
        familyData.sonCount > 0 &&
        renderChildAgeFields(familyData.sonCount, "Son", "son")}
      {familyData.daughter &&
        familyData.daughterCount > 0 &&
        renderChildAgeFields(familyData.daughterCount, "Daughter", "daughter")}
      {familyData.mother && (
        <label>
          {errors.motherage ? <p>{errors.motherage.message}</p>:"Mother age"}
          <input
            type="number"
            {...register("motherage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}{" "}
      {familyData.father && (
        <label>
          {errors.fatherage ? <p>{errors.fatherage.message}</p> : 'Father Age'}
          <input
            type="number"
            {...register("fatherage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}{" "}
      {familyData.motherInLaw && (
        <label>
        {errors.motherinlawage ? <p>{errors.motherinlawage.message}</p> : "Mother-In-Law Age" }
          <input
            type="number"
            {...register("motherinlawage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}{" "}
      {familyData.fatherInLaw && (
        <label>
       {errors.fatherinlawage ? <p>{errors.fatherinlawage.message}</p>:" Father-In-Law Age"}  
          <input
            type="number"
            {...register("fatherinlawage", {
              validate: (val) => {
                if (val < 18) {
                  return "Age must be greater than 18";
                } else if (val > 99) {
                  return "Age shouldn't be greater than 99";
                }
              },
            })}
          />
        </label>
      )}
      <label>
        {errors.tenure ? <p>{errors.tenure.message}</p>:"Tenure"}
        <select {...register("tenure", { required: "This field is required" })}>
          <option value="" selected>
            Select Tenure
          </option>
          {tenure.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
       {errors.selectedCoverage ? <p>{errors.selectedCoverage.message}</p>:"Individual Sum Insured"}
        <select
          {...register("selectedCoverage", {
            required: "This field is required",
          })}
        >
          <option value="" selected>
            Select Coverage Amount
          </option>
          {individualSumInsured.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default App2;
