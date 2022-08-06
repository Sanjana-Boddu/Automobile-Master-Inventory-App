import jwt from 'jsonwebtoken';
import {
        TOKEN_KEY
} from './constants.js';

export const checkAuthorization = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        res.locals.user = jwt.verify(token, TOKEN_KEY);
        next();
    } catch (error) {
        console.log(error);
        next();
    }
};
