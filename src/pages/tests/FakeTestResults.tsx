import React, { useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button'; // Assuming Button component exists
import jsPDF from 'jspdf';

interface Answer {
  value: number;
  text: string;
  questionType: 'behavioral' | 'performance' | 'general';
  subcategory: string;
  questionText?: string;
}

interface LocationState {
  testType: string;
  testId: string;
  testTitle: string;
  duration: number;
  answers: Record<string, Answer>;
}

const TestResults: React.FC = () => {
  const { testType: paramsTestType, testId: paramsTestId } = useParams<{ testType: string; testId: string }>();
  const location = useLocation();
  const state = location.state as LocationState;
  const resultRef = useRef<HTMLDivElement>(null);

  // Use testType and testId from state, fallback to params if state is not available (though state should be available here)
  const testType = state?.testType || paramsTestType;
  const testId = state?.testId || paramsTestId;

  console.log('TestResults component rendered');
  console.log('Location state:', state);
  console.log('testType from state/params:', testType);
  console.log('testId from state/params:', testId);

  let resultMessage = 'Could not load test results.';
  let resultStatus = 'Error';
  let statusColorClass = 'text-red-600';

  if (state && state.answers && testType === 'adhd') {
    console.log(`Running ADHD scoring logic for subcategory: ${testId}`);
    const answers = state.answers;
    let totalBehavioralScore = 0;
    let totalPerformanceScore = 0;

    // Iterate through answers to calculate scores
    Object.values(answers).forEach(answer => {
      // Check if the answer belongs to the current subcategory
      if (answer.subcategory === testId) {
         if (answer.questionType === 'behavioral') {
            // Behavioral questions: score 1 for 'Often' or 'Very Often'
            if (answer.text === 'Often' || answer.text === 'Very Often') {
              totalBehavioralScore += 1;
            }
          } else if (answer.questionType === 'performance') {
            // Performance questions: sum the score values (1 for problematic, 0 for others)
            totalPerformanceScore += answer.value; // Summing the score value
          }
      }
    });

    console.log('Total Behavioral Score:', totalBehavioralScore);
    console.log('Total Performance Score:', totalPerformanceScore);

    let behavioralThreshold = 0;
    let subcategoryName = '';

    // Determine behavioral threshold based on subcategory
    switch (testId) {
      case 'predominantly_inattentive':
        behavioralThreshold = 6;
        subcategoryName = 'Inattentive ADHD';
        break;
      case 'predominantly_hyperactive':
        behavioralThreshold = 6;
        subcategoryName = 'Hyperactive ADHD';
        break;
      case 'oppositional_defiant_disorder':
        behavioralThreshold = 4;
        subcategoryName = 'Oppositional Defiant Disorder';
        break;
      case 'conduct_disorder':
        behavioralThreshold = 3;
        subcategoryName = 'Conduct Disorder';
        break;
      case 'anxiety_disorder':
        behavioralThreshold = 3;
        subcategoryName = 'Anxiety Disorder';
        break;
      default:
        // Handle unknown subcategory or display a generic message
        resultMessage = `Results for ${state?.testTitle || 'Unknown Test'}`;
        resultStatus = 'Result Available';
        statusColorClass = 'text-gray-800';
        return; // Exit if subcategory is unknown
    }

    // Apply scoring logic
    if (totalBehavioralScore >= behavioralThreshold || totalPerformanceScore >= 1) { // Updated condition
      resultMessage = `Based on your responses, you show signs consistent with ${subcategoryName}.`;
      resultStatus = `Positive for ${subcategoryName}`;
      statusColorClass = 'text-green-600';
    } else {
      resultMessage = `Based on your responses, you do not show signs consistent with ${subcategoryName}.`;
      resultStatus = `Negative for ${subcategoryName}`;
      statusColorClass = 'text-red-600';
    }

  } else if (testType === 'dyslexia' && testId === 'basic') {
     console.log('Running basic dyslexia scoring logic');
    // Keep existing basic dyslexia logic for now
    // Calculate total score for basic dyslexia
    let totalDyslexiaScore = 0;
    if (state && state.answers) {
      Object.values(state.answers).forEach(answer => {
        // Assuming all questions in basic dyslexia test contribute to the score
        // We use the score value directly from the answer
         totalDyslexiaScore += answer.value;
      });
    }
     console.log('Total Dyslexia Score:', totalDyslexiaScore);

    // Apply scoring logic for basic dyslexia
    if (totalDyslexiaScore >= 10) {
      resultMessage = 'Based on your responses, you show signs consistent with basic dyslexia.';
      resultStatus = 'Positive for Basic Dyslexia';
      statusColorClass = 'text-green-600';
    } else {
      resultMessage = 'Based on your responses, you do not show signs consistent with basic dyslexia.';
      resultStatus = 'Negative for Basic Dyslexia';
      statusColorClass = 'text-red-600';
    }

  } else if (testType === 'dyslexia' && testId === 'comprehensive') {
    console.log('Running comprehensive dyslexia scoring logic');
    let totalComprehensiveDyslexiaScore = 0;
    if (state && state.answers) {
      Object.values(state.answers).forEach(answer => {
        if (answer.subcategory === 'Comprehensive Dyslexia Assessment') {
          totalComprehensiveDyslexiaScore += answer.value;
        }
      });
    }
    console.log('Total Comprehensive Dyslexia Score:', totalComprehensiveDyslexiaScore);

    // Apply scoring logic for comprehensive dyslexia
    if (totalComprehensiveDyslexiaScore >= 10) {
      resultMessage = 'Based on your responses, you show signs consistent with comprehensive dyslexia.';
      resultStatus = 'Positive for Comprehensive Dyslexia';
      statusColorClass = 'text-green-600';
    } else {
      resultMessage = 'Based on your responses, you do not show signs consistent with comprehensive dyslexia.';
      resultStatus = 'Negative for Comprehensive Dyslexia';
      statusColorClass = 'text-red-600';
    }

  } else if (state && state.testTitle) {
     console.log('Displaying generic results');
     resultMessage = `Results for ${state.testTitle}`; // Generic message for other tests
     resultStatus = 'Result Available';
     statusColorClass = 'text-gray-800';
  } else {
      resultMessage = 'Could not load test results. Invalid test type or missing data.';
      resultStatus = 'Error';
      statusColorClass = 'text-red-600';
  }

  const handleDownloadResult = async () => {
    if (!resultRef.current) return;

    try {
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add test information
      pdf.setFontSize(20);
      pdf.text('Test Results', pdfWidth / 2, 20, { align: 'center' });
      
      // Add test details
      pdf.setFontSize(12);
      pdf.text(`Test Type: ${testType}`, 20, 40);
      pdf.text(`Test ID: ${testId}`, 20, 50);
      pdf.text(`Test Title: ${state?.testTitle || 'Unknown'}`, 20, 60);
      
      // Add result status
      pdf.setFontSize(16);
      if (statusColorClass === 'text-green-600') {
        pdf.setTextColor(0, 128, 0);
      } else if (statusColorClass === 'text-red-600') {
        pdf.setTextColor(255, 0, 0);
      } else {
        pdf.setTextColor(128, 128, 128);
      }
      pdf.text(resultStatus, pdfWidth / 2, 80, { align: 'center' });
      
      // Add result message
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const splitMessage = pdf.splitTextToSize(resultMessage, pdfWidth - 40);
      pdf.text(splitMessage, pdfWidth / 2, 90, { align: 'center' });

      // Add answers section
      if (state?.answers) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.text('Detailed Answers', pdfWidth / 2, 20, { align: 'center' });
        
        let yPosition = 40;
        Object.entries(state.answers).forEach(([questionId, answer]) => {
          if (yPosition > pdfHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.setFontSize(12);
          pdf.text(`Question ${questionId}:`, 20, yPosition);
          yPosition += 7;
          
          // Add question text if available
          if (answer.questionText) {
            const splitQuestion = pdf.splitTextToSize(answer.questionText, pdfWidth - 40);
            pdf.text(splitQuestion, 30, yPosition);
            yPosition += 7 * splitQuestion.length;
          }
          
          pdf.text(`Answer: ${answer.text}`, 30, yPosition);
          yPosition += 7;
          pdf.text(`Score: ${answer.value}`, 30, yPosition);
          yPosition += 10;
        });
      }

      // Save the PDF
      pdf.save(`test-result-${testType}-${testId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="p-8 w-full max-w-md text-center shadow-lg rounded-lg">
        <div ref={resultRef}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Test Results</h2>

          <div className={`text-2xl font-semibold mb-4 ${statusColorClass}`}>
            {resultStatus}
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">{resultMessage}</p>
        </div>

        <Button
          onClick={handleDownloadResult}
          variant="primary"
          className="w-full"
        >
          Download Result
        </Button>
      </Card>
    </div>
  );
};

export default TestResults;
