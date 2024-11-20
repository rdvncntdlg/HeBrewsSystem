import React from 'react';
import Header from '../assets/components/Header';
import OverallRate from '../assets/components/OverallRate';
import FeedbackGrid from '../assets/components/FeedbackGrid';
import CustomerSatisfactionSurvey from '../assets/components/CustomerSatisfactionSurvey';

function Feedback() {
    return (
      <div className="overflow-hidden max-md:pr-5">
      <Header text="Feedback" />
      
        <div className="flex flex-col items-center gap-4">
        <OverallRate />
        <FeedbackGrid />
        </div>
    </div>
    )
  };
  
export default Feedback;