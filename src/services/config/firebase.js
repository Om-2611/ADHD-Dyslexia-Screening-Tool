"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAy32Hxrdsa3sWHQzdM_SjpKGx_NIDngZw",
    authDomain: "adhd-5e1f2.firebaseapp.com",
    projectId: "adhd-5e1f2",
    storageBucket: "adhd-5e1f2.firebasestorage.app",
    messagingSenderId: "752217867231",
    appId: "1:752217867231:web:5b4609c381b5f675617a6a"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
exports.default = app;
