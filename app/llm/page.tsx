'use client'

import React, { useState, useEffect } from 'react';
import { llm_inference } from './services/api';

const Llm = () => {

  const [text, setText] = useState('');
  const questionsDetails = `
  As a professor at a prestigious university renowned for its rigorous examination standards, you've been tasked with creating a set of challenging yet fair questions for the upcoming university exams. Your goal is to design questions that thoroughly test the students' understanding of the subject matter while also encouraging critical thinking and application of concepts. Utilize the provided text or data to generate a diverse range of questions spanning different topics and difficulty levels, ensuring that the exam adequately assesses the students' mastery of the course material. Your questions should be clear, concise, and structured in a way that facilitates effective evaluation of the students' knowledge and skills.
  
  Questions Details: 
  
  Feedback:
  1. **Format**: Ensure the questions follows a standard format with clear sec (e.g., Contact Information, Summary/Objective, Work Experience, Education).
  2. **Content**: Evaluate the content of the resume. Ensure it includes relevant skills, experiences, achievements, and qualifications tailored to the job position.
  3. **Grammar and Spelling**: Check for any grammatical errors or spelling mistakes and suggest corrections.
  4. **Keywords**: Ensure the resume contains relevant keywords related to the job position to pass through ATS systems.
  5. **Overall Impression**: Provide an overall impression of the resume and any additional suggestions for improvement.
  
  ATS Score Calculation:
  - Assess the resume based on its compatibility with Applicant Tracking Systems (ATS). Assign a score out of 100 based on factors such as formatting, keywords, and overall suitability for ATS screening.
  
  Output Format (JSON):
  {
    "suggestions": ["Provide specific suggestions for improvement."],
    "ATS_score": 75
  }
`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedback = await llm_inference(questionsDetails);
        setText(feedback);
      } catch (error) {
        console.error('Error fetching resume feedback:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Resume Feedback</h1>
        <div>
          <h2>Suggestions:</h2>
          <ul>
            {text?.feedback.map((suggestion: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          {/* <p>ATS Score: {resumeFeedback.ATS_score}</p> */}
          <p>{JSON.stringify(feedback)}</p>
        </div>
    </div>
  );
};

export default Llm;