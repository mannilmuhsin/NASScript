import React, { useState, useEffect } from "react";
import CompanyDetails from "../components/form/CompanyDetailsForm";
import SocialMediaUrls from "../components/form/SocialMediaForm";
import DomainSelection from "../components/form/DomainForm";
import PaymentDetails from "../components/form/PaymentForm";
import NfcCardDetails from "../components/form/NfcCardForm";
import { addCompany } from "../services/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CompanyForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    email: "",
    phone: "",
    profileImg: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    x: "",
    domainType: "Default Design",
    domain: "",
    paymentMethod: "Online Payment",
    paymentStatus: "Pending",
    nfcCardCount: "",
    nfcCardDuration: "",
    totalCost: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    about: "",
    phone: "",
    profileImg: "",
    domain: "",
    nfcCardCount: "",
    nfcCardDuration: "",
  });

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateStep = (currentStep) => {
    let isValid = true;
    let tempErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.name) {
          tempErrors.name = "Name is required.";
          isValid = false;
        }
        if (!formData.email) {
          tempErrors.email = "Email is required.";
          isValid = false;
        }
        if (!formData.about) {
          tempErrors.about = "About is required.";
          isValid = false;
        }
        if (!formData.phone) {
          tempErrors.phone = "Phone is required.";
          isValid = false;
        }
        if (!formData.profileImg) {
          tempErrors.profileImg = "Profile Image URL is required.";
          isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        if (formData.nfcCardCount <= 0) {
          tempErrors.nfcCardCount = "NFC Card count must be greater than 0.";
          isValid = false;
        }
        if (formData.nfcCardDuration <= 0) {
          tempErrors.nfcCardDuration =
            "NFC Card duration must be greater than 0 years.";
          isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleChange = (input) => (e) => {
    const value = input === 'totalCost' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [input]: value });
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      setError("Please fill out all required fields.");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (formData.paymentMethod === "Online Payment") {
        const options = {
          key:process.env.RAZORPAY_KEY || "rzp_test_VbfZC21jeODXf7",
          amount: formData.totalCost * 100,
          currency: "INR",
          name: "NasscriptNFC",
          description: "Test Transaction",
          image: "https://nasscript.com/static/media/Nlogo_black_s.7e657e079d58d8b9380094c8b21ca57d.svg",
          handler: async (response) => {
            // Handle successful payment
            try {
              const response = await addCompany({ ...formData, paymentStatus: "Completed" });
              toast("Company added successfully!");
              setSuccess("Company added successfully!");
              navigate(`/congratulations/${response.company.nfcCode}`);
            } catch (error) {
              setError("Failed to add company. Please try again.");
              console.error(error);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: "Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        // Cash payment
        const response = await addCompany(formData);
        toast("Company added successfully!");
        setSuccess("Company added successfully!");
        navigate(`/congratulations/${response.company.nfcCode}`);
      }
    } catch (error) {
      setError("Failed to add company. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-16 flex h-2/3 items-center gap-5 w-full">
      <div className="w-1/2 flex">
        <img
          src="https://printthatnow.com/wp-content/uploads/2023/06/NFC-Card.jpg"
          className=""
          alt=""
        />
      </div>
      <div className="w-1/2">
        {success && <p className="text-green-500">{success}</p>}
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {step === 1 && (
          <CompanyDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            errors={errors}
          />
        )}
        {step === 2 && (
          <SocialMediaUrls
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <DomainSelection
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <NfcCardDetails
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
            errors={errors}
          />
        )}

        {step === 5 && (
          <>
            <PaymentDetails
              formData={formData}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CompanyForm;
