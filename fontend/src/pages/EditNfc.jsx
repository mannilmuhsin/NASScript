import React, { useState, useEffect } from "react";
import CompanyDetails from "../components/form/CompanyDetailsForm";
import SocialMediaUrls from "../components/form/SocialMediaForm";
import DomainSelection from "../components/form/DomainForm";
import NfcCardDetails from "../components/form/NfcCardForm";
import {  editNfc, getCompanyData } from "../services/apiMethods";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function EditNfc() {
  const [step, setStep] = useState(1);
  const { nfcCode } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
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
    nfcCardCount: "",
    nfcCardDuration: "",
    totalCost: 0,
  });
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

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyData(nfcCode);
        setCompany(data);
        const socialMedia = {
            whatsapp: "",
            instagram: "",
            facebook: "",
            linkedin: "",
            x: "",
          };
    
          data.socialMedia.forEach((item) => {
            if (socialMedia.hasOwnProperty(item.platform)) {
              socialMedia[item.platform] = item.link;
            }
          });
          
    
          setFormData({
            ...formData,
            ...data,
            ...socialMedia,
          });
      } catch (error) {
        console.error("Failed to fetch company details", error);
      }
    };

    fetchCompany();
  }, [nfcCode]);

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
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      await editNfc(nfcCode, formData);
      toast("Company details updated successfully!");
      navigate(`/${nfcCode}`);
    } catch (error) {
      console.error("Failed to update company details", error);
      toast.error("Failed to update company details. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen">
    <div  className="flex justify-start  gap-2 p-10 pl-16">
       <img onClick={()=>navigate('/')} src="https://nasscript.com/static/media/Nlogo_black_s.7e657e079d58d8b9380094c8b21ca57d.svg" className='h-10 cursor-pointer w-10' alt="" />
         <p onClick={()=>navigate('/')} className="text-3xl font-semibold cursor-pointer">NasscriptNFC</p>
     </div>
    <div className="pl-16 flex h-2/3 items-center gap-5 w-full">
      <div className="w-1/2 flex">
        <img
          src="https://printthatnow.com/wp-content/uploads/2023/06/NFC-Card.jpg"
          className=""
          alt=""
        />
      </div>
      <div className="w-1/2">
        {company ? (
          <>
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
                nextStep={handleSubmit}
                prevStep={prevStep}
              />
            )}
            {/* {step === 4 && (
              <NfcCardDetails
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={handleSubmit}
                errors={errors}
              />
            )} */}
          </>
        ) : (
          <p>Loading company details...</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default EditNfc;
