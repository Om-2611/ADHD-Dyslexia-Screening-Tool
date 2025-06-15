"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersWithTestHistory = exports.getUserWithTestHistory = exports.deleteAllQuestions = exports.deleteQuestion = exports.updateQuestion = exports.addQuestion = exports.getQuestionCount = exports.getAllQuestions = exports.updateUserTestCount = exports.getUsersByRole = exports.getAllUsers = exports.createUserDocument = exports.DEFAULT_PERFORMANCE_OPTIONS = exports.DEFAULT_BEHAVIORAL_OPTIONS = exports.ADHD_QUESTION_LIMITS = void 0;
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../config/firebase");
exports.ADHD_QUESTION_LIMITS = {
    predominantly_inattentive: {
        behavioral: 9,
        performance: 8
    },
    predominantly_hyperactive: {
        behavioral: 9,
        performance: 8
    },
    oppositional_defiant_disorder: {
        behavioral: 8,
        performance: 8
    },
    conduct_disorder: {
        behavioral: 14,
        performance: 8
    },
    anxiety_disorder: {
        behavioral: 7,
        performance: 8
    }
};
exports.DEFAULT_BEHAVIORAL_OPTIONS = {
    never: 0,
    occasionally: 1,
    often: 2,
    very_often: 3
};
exports.DEFAULT_PERFORMANCE_OPTIONS = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
};
var createUserDocument = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userRef, q, querySnapshot, userDoc, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                userRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                q = (0, firestore_1.query)(userRef, (0, firestore_1.where)('uid', '==', user.uid));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                querySnapshot = _a.sent();
                if (!querySnapshot.empty) return [3 /*break*/, 3];
                // Create new user document
                return [4 /*yield*/, (0, firestore_1.addDoc)(userRef, {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        role: user.email === 'admin@example.com' ? 'admin' : 'user',
                        createdAt: (0, firestore_1.serverTimestamp)(),
                        lastLoginAt: (0, firestore_1.serverTimestamp)(),
                        testsTaken: 0,
                        isActive: true
                    })];
            case 2:
                // Create new user document
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                userDoc = querySnapshot.docs[0];
                return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.db, 'users', userDoc.id), {
                        lastLoginAt: (0, firestore_1.serverTimestamp)()
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error creating/updating user document:', error_1);
                throw error_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createUserDocument = createUserDocument;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersRef, querySnapshot, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                usersRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersRef)];
            case 1:
                querySnapshot = _a.sent();
                return [2 /*return*/, querySnapshot.docs.map(function (doc) {
                        var _a, _b;
                        var data = doc.data();
                        return __assign(__assign({}, data), { createdAt: (_a = data.createdAt) === null || _a === void 0 ? void 0 : _a.toDate(), lastLoginAt: (_b = data.lastLoginAt) === null || _b === void 0 ? void 0 : _b.toDate() });
                    })];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching users:', error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUsersByRole = function (role) { return __awaiter(void 0, void 0, void 0, function () {
    var usersRef, q, querySnapshot, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                usersRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                q = (0, firestore_1.query)(usersRef, (0, firestore_1.where)('role', '==', role));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                querySnapshot = _a.sent();
                return [2 /*return*/, querySnapshot.docs.map(function (doc) {
                        var _a, _b;
                        var data = doc.data();
                        return __assign(__assign({}, data), { createdAt: (_a = data.createdAt) === null || _a === void 0 ? void 0 : _a.toDate(), lastLoginAt: (_b = data.lastLoginAt) === null || _b === void 0 ? void 0 : _b.toDate() });
                    })];
            case 2:
                error_3 = _a.sent();
                console.error('Error fetching users by role:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsersByRole = getUsersByRole;
var updateUserTestCount = function (uid) { return __awaiter(void 0, void 0, void 0, function () {
    var usersRef, q, querySnapshot, userDoc, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                usersRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                q = (0, firestore_1.query)(usersRef, (0, firestore_1.where)('uid', '==', uid));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                querySnapshot = _a.sent();
                if (!!querySnapshot.empty) return [3 /*break*/, 3];
                userDoc = querySnapshot.docs[0];
                return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.db, 'users', userDoc.id), {
                        testsTaken: (userDoc.data().testsTaken || 0) + 1,
                        lastUpdated: (0, firestore_1.serverTimestamp)()
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error('Error updating user test count:', error_4);
                throw error_4;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUserTestCount = updateUserTestCount;
var getAllQuestions = function (category, subcategory) { return __awaiter(void 0, void 0, void 0, function () {
    var questionsRef, q, querySnapshot, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionsRef = (0, firestore_1.collection)(firebase_1.db, 'questions');
                q = void 0;
                if (category && subcategory) {
                    q = (0, firestore_1.query)(questionsRef, (0, firestore_1.where)('category', '==', category), (0, firestore_1.where)('subcategory', '==', subcategory));
                }
                else if (category) {
                    q = (0, firestore_1.query)(questionsRef, (0, firestore_1.where)('category', '==', category));
                }
                else {
                    q = (0, firestore_1.query)(questionsRef);
                }
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                querySnapshot = _a.sent();
                return [2 /*return*/, querySnapshot.docs.map(function (doc) {
                        var _a, _b;
                        return (__assign(__assign({ id: doc.id }, doc.data()), { createdAt: (_a = doc.data().createdAt) === null || _a === void 0 ? void 0 : _a.toDate(), updatedAt: (_b = doc.data().updatedAt) === null || _b === void 0 ? void 0 : _b.toDate() }));
                    })];
            case 2:
                error_5 = _a.sent();
                console.error('Error fetching questions:', error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var getQuestionCount = function (category, subcategory, questionType) { return __awaiter(void 0, void 0, void 0, function () {
    var questionsRef, q, snapshot, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionsRef = (0, firestore_1.collection)(firebase_1.db, 'questions');
                q = (0, firestore_1.query)(questionsRef, (0, firestore_1.where)('category', '==', category), (0, firestore_1.where)('subcategory', '==', subcategory), (0, firestore_1.where)('questionType', '==', questionType));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                snapshot = _a.sent();
                return [2 /*return*/, snapshot.size];
            case 2:
                error_6 = _a.sent();
                console.error('Error getting question count:', error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestionCount = getQuestionCount;
var addQuestion = function (question) { return __awaiter(void 0, void 0, void 0, function () {
    var currentCount, limit, questionsRef, docRef, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(question.category === 'adhd')) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.getQuestionCount)('adhd', question.subcategory, question.questionType)];
            case 1:
                currentCount = _a.sent();
                limit = exports.ADHD_QUESTION_LIMITS[question.subcategory][question.questionType === 'behavioral' ? 'behavioral' : 'performance'];
                if (currentCount >= limit) {
                    throw new Error("Cannot add more ".concat(question.questionType, " questions to ").concat(question.subcategory, ". Limit is ").concat(limit, "."));
                }
                _a.label = 2;
            case 2:
                questionsRef = (0, firestore_1.collection)(firebase_1.db, 'questions');
                return [4 /*yield*/, (0, firestore_1.addDoc)(questionsRef, __assign(__assign({}, question), { createdAt: (0, firestore_1.serverTimestamp)(), updatedAt: (0, firestore_1.serverTimestamp)() }))];
            case 3:
                docRef = _a.sent();
                return [2 /*return*/, docRef.id];
            case 4:
                error_7 = _a.sent();
                console.error('Error adding question:', error_7);
                throw error_7;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addQuestion = addQuestion;
var updateQuestion = function (id, updates) { return __awaiter(void 0, void 0, void 0, function () {
    var questionRef, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionRef = (0, firestore_1.doc)(firebase_1.db, 'questions', id);
                return [4 /*yield*/, (0, firestore_1.updateDoc)(questionRef, __assign(__assign({}, updates), { updatedAt: (0, firestore_1.serverTimestamp)() }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Error updating question:', error_8);
                throw error_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateQuestion = updateQuestion;
var deleteQuestion = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var questionRef, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionRef = (0, firestore_1.doc)(firebase_1.db, 'questions', id);
                return [4 /*yield*/, (0, firestore_1.deleteDoc)(questionRef)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error('Error deleting question:', error_9);
                throw error_9;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteQuestion = deleteQuestion;
var deleteAllQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var questionsRef, querySnapshot, deletePromises, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                questionsRef = (0, firestore_1.collection)(firebase_1.db, 'questions');
                return [4 /*yield*/, (0, firestore_1.getDocs)(questionsRef)];
            case 1:
                querySnapshot = _a.sent();
                deletePromises = querySnapshot.docs.map(function (doc) {
                    return (0, firestore_1.deleteDoc)(doc.ref);
                });
                return [4 /*yield*/, Promise.all(deletePromises)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error('Error deleting all questions:', error_10);
                throw error_10;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllQuestions = deleteAllQuestions;
var getUserWithTestHistory = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var usersRef, q, userSnapshot, userData, testsRef, testsQuery, testsSnapshot, tests, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                usersRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                q = (0, firestore_1.query)(usersRef, (0, firestore_1.where)('uid', '==', userId));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                userSnapshot = _a.sent();
                if (userSnapshot.empty) {
                    return [2 /*return*/, null];
                }
                userData = userSnapshot.docs[0].data();
                testsRef = (0, firestore_1.collection)(firebase_1.db, 'testResults');
                testsQuery = (0, firestore_1.query)(testsRef, (0, firestore_1.where)('userId', '==', userId));
                return [4 /*yield*/, (0, firestore_1.getDocs)(testsQuery)];
            case 2:
                testsSnapshot = _a.sent();
                tests = testsSnapshot.docs.map(function (doc) {
                    var _a;
                    return (__assign(__assign({ id: doc.id }, doc.data()), { completedAt: (_a = doc.data().completedAt) === null || _a === void 0 ? void 0 : _a.toDate() }));
                });
                return [2 /*return*/, {
                        user: userData,
                        tests: tests
                    }];
            case 3:
                error_11 = _a.sent();
                console.error('Error fetching user with test history:', error_11);
                throw error_11;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserWithTestHistory = getUserWithTestHistory;
var getAllUsersWithTestHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersRef, usersSnapshot, testsRef, testsSnapshot, testsByUser_1, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                usersRef = (0, firestore_1.collection)(firebase_1.db, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersRef)];
            case 1:
                usersSnapshot = _a.sent();
                testsRef = (0, firestore_1.collection)(firebase_1.db, 'testResults');
                return [4 /*yield*/, (0, firestore_1.getDocs)(testsRef)];
            case 2:
                testsSnapshot = _a.sent();
                testsByUser_1 = testsSnapshot.docs.reduce(function (acc, doc) {
                    var _a;
                    var test = __assign(__assign({ id: doc.id }, doc.data()), { completedAt: (_a = doc.data().completedAt) === null || _a === void 0 ? void 0 : _a.toDate() });
                    if (!acc[test.userId]) {
                        acc[test.userId] = [];
                    }
                    acc[test.userId].push(test);
                    return acc;
                }, {});
                return [2 /*return*/, usersSnapshot.docs.map(function (doc) {
                        var _a, _b;
                        var userData = __assign(__assign({}, doc.data()), { createdAt: (_a = doc.data().createdAt) === null || _a === void 0 ? void 0 : _a.toDate(), lastLoginAt: (_b = doc.data().lastLoginAt) === null || _b === void 0 ? void 0 : _b.toDate() });
                        return {
                            user: userData,
                            tests: testsByUser_1[userData.uid] || []
                        };
                    })];
            case 3:
                error_12 = _a.sent();
                console.error('Error fetching all users with test history:', error_12);
                throw error_12;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsersWithTestHistory = getAllUsersWithTestHistory;
