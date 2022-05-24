"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_OPTIONS = void 0;
const { RAPIDAPI_KEY = '', RAPIDAPI_HOST = '' } = process.env;
exports.FETCH_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': RAPIDAPI_HOST,
        'X-RapidAPI-Key': RAPIDAPI_KEY
    }
};
