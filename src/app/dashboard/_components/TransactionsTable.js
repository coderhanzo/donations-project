
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";


const PatientTransactionsTable = ({onEducationAddClick,onHealthCareAddClick, onAnimalCareAddClick, onSocialWelfareAddClick, onEmergencyReliefAddClick, 
  onEnvironmentalProtectionAddClick, onCommunityDevelopmentAddClick, onDisabilityAddClick, onPatientSupportAddClick
 }) => {
  const dispatch = useDispatch();

  const cardData = [
    {
      title: "Education",
      description: "Supporting education programs for all ages.",
      onClick: onEducationAddClick,
    },
    { title: "Healthcare", description: "Improving health and wellness access.", onClick: onHealthCareAddClick},
    {
      title: "Animal Care/Rights",
      description: "Protecting animal rights and welfare.", onClick: onAnimalCareAddClick
    },
    {
      title: "Social Welfare Program",
      description: "Enhancing social welfare and support systems.", onClick: onSocialWelfareAddClick
    },
    {
      title: "Emergency Relief",
      description: "Providing assistance during emergencies.", onClick: onEmergencyReliefAddClick
    },
    {
      title: "Environmental Protection",
      description: "Conserving and protecting the environment.", onClick: onEnvironmentalProtectionAddClick
    },
    {
      title: "Community Development",
      description: "Fostering growth and development in communities.", onClick: onCommunityDevelopmentAddClick
    },
    {
      title: "Persons with Disability",
      description: "Supporting individuals with disabilities.", onClick: onDisabilityAddClick
    },
    {
      title: "Single Patient Support",
      description: "Assisting patients in need of medical support.", onClick: onPatientSupportAddClick
    },
  ];


  return (
    <div className="relative overflow-x-auto shadow-xl rounded-2xl min-h-[30vh] lg:mt-10 flex-grow bg-white">
      <div className="z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white rounded-t-2xl">
        <div className="flex justify-center">
          <div className="text-gray-900 text-center text-2xl text-size ml-5 font-semibold">
            Create A Beneficiary
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-gray-600">{card.description}</p>
            <button
              onClick={card.onClick}
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientTransactionsTable;
