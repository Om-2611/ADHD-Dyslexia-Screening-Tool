import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getAllUsersWithTestHistory } from '../../services/firebase';
import Card from '../ui/Card';
import { Search, Calendar, Clock, Download, FileText, Trophy, User } from 'lucide-react';
import { generateUserTestHistoryPDF, generateTestResultPDF } from '../../utils/pdfGenerator';
const UserManager = () => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const data = await getAllUsersWithTestHistory();
            setUsersData(data);
            setLoading(false);
        }
        catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load user data');
            setLoading(false);
        }
    };
    const filteredUsers = usersData.filter(({ user }) => 
        (user?.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user?.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase())));
    const handleExportUserData = (userId) => {
        const userData = usersData.find(data => data?.user?.uid === userId);
        if (!userData)
            return;
        const { user, tests } = userData;
        
        // Generate PDF instead of CSV
        if (user && tests && tests.length > 0) {
            generateUserTestHistoryPDF(user, tests);
        }
    };

    const handleExportTestResult = (test, user) => {
        if (test && user) {
            generateTestResultPDF(test, user, {
                includeAnswers: true,
                includeQuestions: true,
                includeUserInfo: true
            });
        }
    };

    const getResultStatus = (test) => {
        if (!test.answers) return 'N/A';
        
        let totalScore = 0;
        Object.values(test.answers).forEach(answer => {
            totalScore += answer.value || 0;
        });

        if (test.testType === 'adhd') {
            return totalScore >= 6 ? 'Positive' : 'Negative';
        } else if (test.testType === 'dyslexia') {
            return totalScore >= 10 ? 'Positive' : 'Negative';
        }
        return 'N/A';
    };

    const getTotalScore = (test) => {
        if (!test.answers) return 0;
        
        let totalScore = 0;
        Object.values(test.answers).forEach(answer => {
            totalScore += answer.value || 0;
        });
        return totalScore;
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" }) }));
    }
    return (
        _jsxs("div", { 
            className: "space-y-6", 
            children: [
                error && (_jsx("div", { 
                    className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md", 
                    children: error 
                })), 
                _jsx(Card, { 
                    children: _jsx("div", { 
                        className: "p-4", 
                        children: _jsxs("div", { 
                            className: "relative rounded-md shadow-sm", 
                            children: [
                                _jsx("div", { 
                                    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", 
                                    children: _jsx(Search, { className: "h-5 w-5 text-gray-400" }) 
                                }), 
                                _jsx("input", { 
                                    type: "text", 
                                    className: "block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500", 
                                    placeholder: "Search users by email or name...", 
                                    value: searchTerm, 
                                    onChange: (e) => setSearchTerm(e.target.value) 
                                })
                            ] 
                        }) 
                    }) 
                }), 
                _jsx("div", { 
                    className: "space-y-4", 
                    children: filteredUsers.map(({ user, tests }) => (
                        _jsx(Card, { 
                            children: _jsxs("div", { 
                                className: "p-6", 
                                children: [
                                    _jsxs("div", { 
                                        className: "flex justify-between items-start", 
                                        children: [
                                            _jsxs("div", { 
                                                children: [
                                                    _jsx("h3", { 
                                                        className: "text-lg font-medium text-gray-900", 
                                                        children: user?.displayName || user?.email || 'Unknown User' 
                                                    }), 
                                                    user?.displayName && user?.email && (_jsx("p", { 
                                                        className: "text-sm text-gray-500", 
                                                        children: user.email 
                                                    })), 
                                                    _jsxs("div", { 
                                                        className: "mt-2 flex items-center text-sm text-gray-500", 
                                                        children: [
                                                            _jsx(Calendar, { className: "h-4 w-4 mr-1" }), 
                                                            "Joined: ", 
                                                            user?.createdAt ? user.createdAt.toLocaleDateString() : 'N/A'
                                                        ] 
                                                    })
                                                ] 
                                            }), 
                                            _jsx("button", { 
                                                onClick: () => handleExportUserData(user?.uid || ''), 
                                                className: "text-blue-600 hover:text-blue-800", 
                                                children: _jsx(Download, { className: "h-5 w-5" }) 
                                            })
                                        ] 
                                    }), 
                                    _jsx("div", { 
                                        className: "mt-4", 
                                        children: _jsx("button", { 
                                            onClick: () => setSelectedUser(selectedUser === user?.uid ? null : user?.uid), 
                                            className: "text-sm text-blue-600 hover:text-blue-800", 
                                            children: selectedUser === user?.uid ? 'Hide Test History' : 'Show Test History' 
                                        }) 
                                    }), 
                                    selectedUser === user?.uid && (_jsxs("div", { 
                                        className: "mt-4 border-t border-gray-200 pt-4", 
                                        children: [
                                            _jsx("h4", { 
                                                className: "text-sm font-medium text-gray-900 mb-3", 
                                                children: "Test History" 
                                            }), 
                                            (tests || []).length === 0 ? (
                                                _jsx("p", { 
                                                    className: "text-sm text-gray-500", 
                                                    children: "No tests taken yet" 
                                                })
                                            ) : (
                                                _jsx("div", { 
                                                    className: "space-y-3", 
                                                    children: (tests || []).map((test) => (
                                                        _jsx("div", { 
                                                            className: "bg-gray-50 rounded-lg p-3 text-sm", 
                                                            children: _jsxs("div", { 
                                                                className: "flex justify-between items-start", 
                                                                children: [
                                                                    _jsxs("div", { 
                                                                        children: [
                                                                            _jsx("span", { 
                                                                                className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + 
                                                                                    ((test.testType || test.category) === 'adhd'
                                                                                        ? 'bg-purple-100 text-purple-800'
                                                                                        : 'bg-blue-100 text-blue-800'), 
                                                                                children: (test.testType || test.category || 'unknown').toUpperCase() 
                                                                            }), 
                                                                            _jsxs("div", { 
                                                                                className: "mt-1 text-gray-900", 
                                                                                children: ["Score: ", test.score || 0] 
                                                                            })
                                                                        ] 
                                                                    }), 
                                                                    _jsxs("div", { 
                                                                        className: "text-right text-gray-500", 
                                                                        children: [
                                                                            _jsxs("div", { 
                                                                                className: "flex items-center", 
                                                                                children: [
                                                                                    _jsx(Calendar, { className: "h-4 w-4 mr-1" }), 
                                                                                    test.completedAt ? test.completedAt.toLocaleDateString() : 'N/A'
                                                                                ] 
                                                                            }), 
                                                                            _jsxs("div", { 
                                                                                className: "flex items-center mt-1", 
                                                                                children: [
                                                                                    _jsx(Clock, { className: "h-4 w-4 mr-1" }), 
                                                                                    test.duration ? (test.duration / 60).toFixed(2) : 'N/A', 
                                                                                    " minutes"
                                                                                ] 
                                                                            })
                                                                        ] 
                                                                    })
                                                                ] 
                                                            }) 
                                                        }, test?.id || ('test-' + Date.now() + '-' + Math.random()))
                                                    )) 
                                                })
                                            )
                                        ] 
                                    }))
                                ] 
                            }) 
                        }, user?.uid || ('user-' + Date.now()))
                    )) 
                })
            ] 
        })
    );
};
export default UserManager;
