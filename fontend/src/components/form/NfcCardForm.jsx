import React from "react";
import { TextField, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Button from "../Button";

const NfcCardDetails = ({
  formData,
  handleChange,
  prevStep,
  nextStep,
  errors,
}) => {
  const handleNumberInput = (input) => (e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange(input)({ target: { value } });
  };

  const handleIncrement = (input) => () => {
    const currentValue = parseInt(formData[input], 10) || 0;
    handleChange(input)({ target: { value: (currentValue + 1).toString() } });
  };

  const handleDecrement = (input) => () => {
    const currentValue = parseInt(formData[input], 10) || 0;
    if (currentValue > 0) {
      handleChange(input)({ target: { value: (currentValue - 1).toString() } });
    }
  };

  const calculateTotalCost = () => {
    const cardPrice = 2000; // Price per NFC card per year
    const { nfcCardCount, nfcCardDuration } = formData;
    return nfcCardCount * nfcCardDuration * cardPrice;
  };

  const handleNext = () => {
    const totalCost = calculateTotalCost();
    handleChange("totalCost")({ target: { value: totalCost } });
    nextStep();
    console.log(formData);
    
  };

  return (
    <div className="flex w-2/3 flex-col gap-5">
      <div className="flex justify-center">
        <p className="text-xl font-medium text-gray-600">NFC Card Details</p>
      </div>
      <div className="flex items-center gap-3">
        <IconButton onClick={handleDecrement("nfcCardCount")}>
          <Remove />
        </IconButton>
        <TextField
          id="nfc-card-count"
          label="NFC Card Count"
          variant="standard"
          fullWidth
          value={formData.nfcCardCount}
          onChange={handleNumberInput("nfcCardCount")}
          error={!!errors.nfcCardCount}
          helperText={errors.nfcCardCount}
          inputProps={{
            pattern: "[0-9]*",
            onInput: (e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
            },
          }}
        />
        <IconButton onClick={handleIncrement("nfcCardCount")}>
          <Add />
        </IconButton>
      </div>
      <div className="flex items-center gap-3">
        <IconButton onClick={handleDecrement("nfcCardDuration")}>
          <Remove />
        </IconButton>
        <TextField
          id="nfc-card-duration"
          label="NFC Card Duration (years)"
          variant="standard"
          fullWidth
          value={formData.nfcCardDuration}
          onChange={handleNumberInput("nfcCardDuration")}
          error={!!errors.nfcCardDuration}
          helperText={errors.nfcCardDuration}
          inputProps={{
            pattern: "[0-9]*",
            onInput: (e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
            },
          }}
        />
        <IconButton onClick={handleIncrement("nfcCardDuration")}>
          <Add />
        </IconButton>
      </div>
      <div className="flex justify-center">
        <p className="text-xl font-medium text-gray-600">
          Total Cost: ₹{calculateTotalCost().toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <Button className="w-1/2" text="Back" handleClick={prevStep} />
        <Button className="w-1/2" text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default NfcCardDetails;