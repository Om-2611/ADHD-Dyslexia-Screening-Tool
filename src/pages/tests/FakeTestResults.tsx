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
    console.log('=== SCORING DEBUG START ===');
    console.log(`Test Type: ${testType}`);
    console.log(`Test ID (Subcategory): ${testId}`);
    console.log('Test Title:', state.testTitle);
    
    let totalBehavioralScore = 0;
    let totalPerformanceScore = 0;

    // Define score mapping for different languages
    const scoreMap: { [key: string]: number } = {
      // English scores
      'Never': 0,
      'Occasionally': 0,
      'Often': 1,
      'Very Often': 1,
      // Hindi scores
      'कभी नहीं': 0,
      'कभी-कभार': 0,
      'अक्सर': 1,
      'बहुत अक्सर': 1,
      // Telugu scores
      'ఎప్పుడూ కాదు': 0,
      'అప్పుడప్పుడు': 0,
      'తరచుగా': 1,
      'చాలా తరచుగా': 1
    };

    // Log the score map for verification
    console.log('Score Map:', scoreMap);

    console.log('Raw answers received:', state.answers);
    
    // Debug: Show all unique subcategories in the data
    const allSubcategories = [...new Set(Object.values(state.answers).map(answer => answer.subcategory))];
    console.log('🔍 All subcategories found in answers:', allSubcategories);
    console.log('🎯 Expected subcategory (testId):', testId);
    console.log('🔍 All question types found:', [...new Set(Object.values(state.answers).map(answer => answer.questionType))]);
    
    // Create a mapping from testId to actual subcategory names
    const subcategoryMapping: { [key: string]: string } = {
      // ADHD Subcategories
      'predominantly_inattentive': 'Inattentive ADHD',
      'predominantly_hyperactive': 'Hyperactive ADHD', 
      'oppositional_defiant_disorder': 'Oppositional Defiant Disorder',
      'conduct_disorder': 'Conduct Disorder',
      'anxiety_disorder': 'Anxiety Disorder',
      'executive_function': 'Executive Function',
      'social_skills': 'Social Skills',
      'emotional_regulation': 'Emotional Regulation',
      // Dyslexia Subcategories
      'phonological_awareness': 'Phonological Awareness',
      'reading_fluency': 'Reading Fluency',
      'comprehension': 'Comprehension',
      'spelling': 'Spelling',
      'writing_skills': 'Writing Skills',
      'visual_processing': 'Visual Processing'
    };
    
    const actualSubcategory = subcategoryMapping[testId || ''] || testId || '';
    console.log('🔄 Mapped subcategory:', actualSubcategory);
    
    // Filter and type answers for the current subcategory
    const behavioralAnswers = Object.values(state.answers)
      .filter((answer): answer is Answer => {
        const isMatch = answer.questionType === 'behavioral' && answer.subcategory === actualSubcategory;
        console.log('Filtering answer:', {
          answer,
          isMatch,
          questionType: answer.questionType,
          subcategory: answer.subcategory,
          expectedSubcategory: actualSubcategory
        });
        return isMatch;
      });

    const performanceAnswers = Object.values(state.answers)
      .filter((answer): answer is Answer => 
        answer.questionType === 'performance' && answer.subcategory === actualSubcategory
      );
    
    console.log('Processing test:', {
      testType,
      testId,
      behavioralAnswersCount: behavioralAnswers.length,
      performanceAnswersCount: performanceAnswers.length
    });
    
    console.log('Behavioral answers:', behavioralAnswers.map(answer => ({
      text: answer.text,
      questionText: answer.questionText,
      subcategory: answer.subcategory
    })));
    
    console.log('Performance answers:', performanceAnswers.map(answer => ({
      text: answer.text,
      value: answer.value,
      subcategory: answer.subcategory
    })));

    // Process behavioral answers
    behavioralAnswers.forEach(answer => {
      // Behavioral questions: score based on frequency
      console.log('Processing answer text:', JSON.stringify(answer.text)); // Log exact text with quotes
      console.log('Score map keys:', Object.keys(scoreMap).map(k => JSON.stringify(k))); // Log all possible keys
      
      const score = scoreMap[answer.text] || 0;
      totalBehavioralScore += score;
      
      // Debug logging for behavioral questions
      console.log('Scoring behavioral answer:', {
        text: answer.text,
        textJSON: JSON.stringify(answer.text),
        score: score,
        questionText: answer.questionText,
        mappedScore: scoreMap[answer.text],
        isInScoreMap: answer.text in scoreMap,
        exactTextLength: answer.text?.length,
        possibleScores: Object.keys(scoreMap),
        scoreMapEntry: Object.entries(scoreMap).find(([key]) => key === answer.text),
        // Check for whitespace or hidden characters
        hasLeadingSpace: answer.text.startsWith(' '),
        hasTrailingSpace: answer.text.endsWith(' '),
        charCodes: Array.from(answer.text).map(c => c.charCodeAt(0))
      });
    });

    // Process performance answers
    performanceAnswers.forEach(answer => {
      // Performance questions: use the normalized score value
      totalPerformanceScore += answer.value;
      
      // Debug logging for performance questions
      console.log('Scoring performance answer:', {
        value: answer.value,
        questionText: answer.questionText
      });
    });

    console.log('Total Behavioral Score:', totalBehavioralScore);
    console.log('Total Performance Score:', totalPerformanceScore);

    let behavioralThreshold = 0;
    let subcategoryName = '';

    // Determine behavioral threshold based on subcategory
    switch (testId) {
      // ADHD Subcategories
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
      case 'executive_function':
        behavioralThreshold = 4;
        subcategoryName = 'Executive Function';
        break;
      case 'social_skills':
        behavioralThreshold = 3;
        subcategoryName = 'Social Skills';
        break;
      case 'emotional_regulation':
        behavioralThreshold = 4;
        subcategoryName = 'Emotional Regulation';
        break;
      // Dyslexia Subcategories
      case 'phonological_awareness':
        behavioralThreshold = 3;
        subcategoryName = 'Phonological Awareness';
        break;
      case 'reading_fluency':
        behavioralThreshold = 3;
        subcategoryName = 'Reading Fluency';
        break;
      case 'comprehension':
        behavioralThreshold = 3;
        subcategoryName = 'Comprehension';
        break;
      case 'spelling':
        behavioralThreshold = 3;
        subcategoryName = 'Spelling';
        break;
      case 'writing_skills':
        behavioralThreshold = 3;
        subcategoryName = 'Writing Skills';
        break;
      case 'visual_processing':
        behavioralThreshold = 3;
        subcategoryName = 'Visual Processing';
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
