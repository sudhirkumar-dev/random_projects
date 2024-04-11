import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { Box, Container, Grid, Tooltip, Typography } from "@mui/material";
import "./App.css"
const App2 = () => {
  let familyData = {
    self: true,
    spouse: true,
    son: true,
    daughter: false,
    father: false,
    mother: false,
    fatherInLaw: false,
    motherInLaw: false,
    sonCount: 1,
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
        <Grid key={i} item xs={6} sm={4}>
                <div key={i} className="inputGroup">
        <label key={`${type}${i + 1}`}>
          {type} {i + 1}
        </label>
        <input
            type="number"
            {...register(fieldName, {
              required: "This field is required",
              min: { value: 1, message: "Age should be at least 1" },
              max: { value: 24, message: "Age should be at most 24" },
            })}
          />
          {errors[fieldName] && (
            <span className="text-red-500">{errors[fieldName].message}</span>
          )}
        </div>
        </Grid>
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
    console.log(data, maxAge, agesArray, policyType, noOfChildren, noOfPeople, noOfParents);
    setPostBody((prev) => ({
      ...prev,
      familyAges: agesArray,
      firstname: data.firstname,
      highestElderAge: maxAge.toString(),
      lastname: data.lastname,
      noOfChildren: noOfChildren,
      noOfPeople: noOfPeople,
      noOfParents: noOfParents,
      number: data.number,
      pincode: data.pincode,
      policyType: policyType,
      selectedCoverage: data.selectedCoverage,
      tenure: data.tenure,
    }));
  });
  console.log(postBody, "postBody created");

  return (
    <>
      <Container>
        <Grid container spacing={1}>
          {/* Left Column - Banner */}
          <Grid item sm={6} display={{ xs: "none", md: "block" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              borderRadius="8px"
              padding="20px"
            >
              <img
                src=""
                alt="Banner"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>
          {/* Right Column - Form */}
          <Grid item xs={12} sm={12} md={6}>
            <form onSubmit={onSubmit} className="user_details_form" >
              <Box
                borderRadius="8px"
                padding="20px"
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    color: "#0d398f ",
                    marginBottom: "10px",
                    fontWeight: "600",
                    textAlign:"center"
                  }}
                >
                  shivam the god of universe.
                </Typography>
                <Grid container spacing={2} justifyContent="start">
                  {/* Two Columns of Inputs */}
                  <Grid item xs={12} sm={6}>
                    <div className="inputGroup">
                      <input
                        placeholder="first name"
                        {...register("firstname", { required: "First Name is required" })}
                      />
                      <label>
                        {errors.firstname ? <p>{errors.firstname.message}</p> : "First Name"}
                      </label>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="inputGroup">
                      <input
                      placeholder="last name"
                        {...register("lastname", { required: "Last Name is required" })}
                      />
                      <label>
                        {errors.lastname ? <p>{errors.lastname.message}</p> : "Last Name"}
                      </label>
                    </div>

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="inputGroup">
                      <input
                      placeholder="number"
                        type="number"
                        {...register("number", {
                          required: "Phone no. is required",
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
                      <label>
                        {errors.number ? <p>{errors.number.message}</p> : "Number"}

                      </label>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="inputGroup">
                      <input
                      placeholder="number"
                        type="number"
                        {...register("pincode", {
                          required: "Pincode is required",
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
                      <label>
                        {errors.pincode ? <p>{errors.pincode.message}</p> : "Pincode"}

                      </label>
                    </div>
                  </Grid>
                  {familyData.self && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("selfage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.selfage ? <p>{errors.selfage.message}</p> : "Self Age"}
                        </label>
                      </div>
                    </Grid>
                  )}
                  {familyData.spouse && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("spouseage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.spouseage ? <p>{errors.spouseage.message}</p> : "Spouse Age"}

                        </label>
                      </div>
                    </Grid>
                  )}
                  {familyData.son &&
                    familyData.sonCount > 0 &&
                    renderChildAgeFields(familyData.sonCount, "Son", "son")}
                  {familyData.daughter &&
                    familyData.daughterCount > 0 &&
                    renderChildAgeFields(familyData.daughterCount, "Daughter", "daughter")}

                  {familyData.mother && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("motherage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.motherage ? <p>{errors.motherage.message}</p> : "Mother age"}

                        </label>
                      </div>
                    </Grid>
                  )}
                  {familyData.father && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("fatherage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.fatherage ? <p>{errors.fatherage.message}</p> : 'Father Age'}

                        </label>
                      </div>
                    </Grid>
                  )}

                  {familyData.motherInLaw && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("motherinlawage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.motherinlawage ? <p>{errors.motherinlawage.message}</p> : "Mother-In-Law Age"}

                        </label>
                      </div>
                    </Grid>
                  )}

                  {familyData.fatherInLaw && (
                    <Grid item xs={12} sm={4}>
                      <div className="inputGroup">
                        <input
                          type="number"
                          {...register("fatherinlawage", {
                            validate: (val) => {
                              if (val < 18) {
                                return "Age > 18!";
                              } else if (val > 99) {
                                return "Age > 99!";
                              }
                            },
                          })}
                        />
                        <label>
                          {errors.fatherinlawage ? <p>{errors.fatherinlawage.message}</p> : " Father-In-Law Age"}

                        </label>
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <div className="inputGroup">
                      <label>
                        {errors.tenure ? <p>{errors.tenure.message}</p> : "Tenure"}
                      </label>
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
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div
                      className='inputGroup'
                    >
                      <label>
                        {errors.selectedCoverage ? <p>{errors.selectedCoverage.message}</p> : "Individual Sum Insured"}
                      </label>
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
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="space-between"
                    display="flex"
                  >
                    <button
                      className="btnNextHealth health_btn back_btn"
                      type="button"
                      id="btnNext1"
                    >
                      Back
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill="currentColor"
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                    <button className="btnNextHealth health_btn" type="submit">
                      Next
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill="currentColor"
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </Grid>
                </Grid>
                {/* <Grid
                  container
                  spacing={2}
                  rowSpacing={3}
                >
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <input type="text" />
                    </Grid>
                </Grid> */}
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container >
    </>
  );
};

export default App2;
