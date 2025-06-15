import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getAllQuestions, addQuestion, deleteQuestion, deleteAllQuestions, ADHD_QUESTION_LIMITS, DEFAULT_BEHAVIORAL_OPTIONS, DEFAULT_PERFORMANCE_OPTIONS } from '../../services/firebase';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Trash2, Filter } from 'lucide-react';
const subcategoryLabels = {
    // ADHD subcategories
    predominantly_inattentive: 'Predominantly Inattentive',
    predominantly_hyperactive: 'Predominantly Hyperactive',
    oppositional_defiant_disorder: 'Oppositional Defiant Disorder (ODD)',
    conduct_disorder: 'Conduct Disorder (CD)',
    anxiety_disorder: 'Anxiety Disorder',
    // Dyslexia subcategories
    phonological_awareness: 'Phonological Awareness',
    reading_fluency: 'Reading Fluency',
    comprehension: 'Reading Comprehension',
    spelling: 'Spelling',
    writing_skills: 'Writing Skills',
    visual_processing: 'Visual Processing'
};
const QuestionManager = ({ category }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [selectedQuestionType, setSelectedQuestionType] = useState('behavioral');
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        category: category,
        subcategory: category === 'adhd' ? 'predominantly_inattentive' : 'phonological_awareness',
        questionType: 'behavioral',
        options: DEFAULT_BEHAVIORAL_OPTIONS
    });
    const handleQuestionTypeChange = (type) => {
        setSelectedQuestionType(type);
        setNewQuestion({
            ...newQuestion,
            questionType: type,
            options: type === 'behavioral' ? DEFAULT_BEHAVIORAL_OPTIONS : DEFAULT_PERFORMANCE_OPTIONS
        });
    };
    const subcategories = category === 'adhd'
        ? ['predominantly_inattentive', 'predominantly_hyperactive', 'oppositional_defiant_disorder', 'conduct_disorder', 'anxiety_disorder']
        : ['phonological_awareness', 'reading_fluency', 'comprehension', 'spelling', 'writing_skills', 'visual_processing'];
    useEffect(() => {
        loadQuestions();
    }, [category]);
    useEffect(() => {
        setNewQuestion(prev => ({
            ...prev,
            category: category,
            subcategory: category === 'adhd' ? 'predominantly_inattentive' : 'phonological_awareness'
        }));
    }, [category]);
    const loadQuestions = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedQuestions = await getAllQuestions(category);
            setQuestions(fetchedQuestions);
        }
        catch (err) {
            setError('Error loading questions. Please try again.');
            console.error('Error loading questions:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            await deleteQuestion(id);
            await loadQuestions();
        }
        catch (err) {
            setError('Error deleting question. Please try again.');
            console.error('Error deleting question:', err);
        }
    };
    const handleSubcategoryChange = (value) => {
        setNewQuestion({
            ...newQuestion,
            subcategory: value
        });
    };
    const handleAddQuestion = async () => {
        try {
            setError(null);
            if (!newQuestion.text) {
                setError('Please fill in the question text');
                return;
            }
            if (category === 'adhd') {
                const subcategoryQuestions = questions.filter(q => q.subcategory === newQuestion.subcategory &&
                    q.questionType === newQuestion.questionType);
                const limit = ADHD_QUESTION_LIMITS[newQuestion.subcategory][newQuestion.questionType];
                if (subcategoryQuestions.length >= limit) {
                    setError(`Cannot add more ${newQuestion.questionType} questions to this subcategory. Limit is ${limit}.`);
                    return;
                }
            }
            await addQuestion(newQuestion);
            setNewQuestion({
                ...newQuestion,
                text: ''
            });
            await loadQuestions();
        }
        catch (err) {
            setError('Failed to add question. Please try again.');
            console.error('Error adding question:', err);
        }
    };
    const handleDeleteAll = async () => {
        if (window.confirm('Are you sure you want to delete all questions? This action cannot be undone.')) {
            try {
                setError(null);
                await deleteAllQuestions();
                await loadQuestions();
            }
            catch (err) {
                setError('Error deleting all questions. Please try again.');
                console.error('Error deleting all questions:', err);
            }
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md", children: error })), _jsx(Card, { children: _jsx("div", { className: "p-4", children: _jsx("button", { onClick: handleDeleteAll, className: "w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors", children: "Delete All Questions" }) }) }), _jsx(Card, { children: _jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { onClick: () => handleQuestionTypeChange('behavioral'), className: `px-4 py-2 rounded-md ${selectedQuestionType === 'behavioral'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'}`, children: "Behavioral Questions" }), _jsx("button", { onClick: () => handleQuestionTypeChange('performance'), className: `px-4 py-2 rounded-md ${selectedQuestionType === 'performance'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'}`, children: "Performance Questions" })] }) }) }), _jsx(Card, { children: _jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Filter, { className: "h-5 w-5 text-gray-400" }), _jsxs("select", { className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: selectedSubcategory, onChange: (e) => setSelectedSubcategory(e.target.value), children: [_jsx("option", { value: "all", children: "All Subcategories" }), subcategories.map((subcat) => (_jsx("option", { value: subcat, children: subcat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }, subcat)))] })] }) }) }), _jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: ["Add New ", selectedQuestionType === 'behavioral' ? 'Behavioral' : 'Performance', " Question"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Subcategory" }), _jsx("select", { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: newQuestion.subcategory, onChange: (e) => handleSubcategoryChange(e.target.value), children: subcategories.map((subcat) => (_jsx("option", { value: subcat, children: subcat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }, subcat))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Question Text" }), _jsx("input", { type: "text", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: newQuestion.text, onChange: (e) => setNewQuestion({ ...newQuestion, text: e.target.value }) })] }), _jsxs(Button, { onClick: handleAddQuestion, className: "flex items-center", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Question"] })] })] }) }), _jsx("div", { className: "space-y-4", children: questions
                    .filter(q => {
                    const matchesSubcategory = selectedSubcategory === 'all' || q.subcategory === selectedSubcategory;
                    const matchesType = q.questionType === selectedQuestionType;
                    return matchesSubcategory && matchesType;
                })
                    .sort((a, b) => {
                    // Sort behavioral questions first, then performance
                    if (a.questionType === 'behavioral' && b.questionType === 'performance')
                        return -1;
                    if (a.questionType === 'performance' && b.questionType === 'behavioral')
                        return 1;
                    return 0;
                })
                    .map((question) => (_jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium text-gray-500", children: question.subcategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }), _jsx("h4", { className: "text-lg font-medium text-gray-900", children: question.text })] }), _jsx("div", { className: "flex space-x-2", children: _jsx("button", { onClick: () => handleDelete(question.id), className: "text-red-600 hover:text-red-800", children: _jsx(Trash2, { className: "h-5 w-5" }) }) })] }), _jsx("div", { className: "mt-4 grid grid-cols-2 gap-4", children: question.questionType === 'behavioral' ? (
                                // Render behavioral options with their specific format
                                Object.entries(question.options).map(([key, value]) => (_jsxs("div", { className: "flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded", children: [_jsx("span", { className: "font-medium", children: key === 'never' ? 'Never' :
                                                key === 'rarely' ? 'Rarely' :
                                                    key === 'sometimes' ? 'Sometimes' :
                                                        key === 'often' ? 'Often' :
                                                            'Always' }), _jsxs("span", { children: ["Weight: ", value] })] }, key)))) : (
                                // Render performance options with their specific format
                                Object.entries(question.options).map(([key, value]) => (_jsxs("div", { className: "flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: typeof value === 'object' ? value.label :
                                                        key === '1' ? 'Very Problematic' :
                                                            key === '2' ? 'Problematic' :
                                                                key === '3' ? 'Below Average' :
                                                                    key === '4' ? 'Average' :
                                                                        'Above Average' }), typeof value === 'object' && value.description && (_jsx("span", { className: "text-xs text-gray-500", children: value.description }))] }), _jsxs("span", { children: ["Score: ", typeof value === 'object' ? value.value : value] })] }, key)))) })] }) }, question.id))) })] }));
};
export default QuestionManager;
