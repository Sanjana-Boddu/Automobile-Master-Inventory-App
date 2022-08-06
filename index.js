import express from 'express';
import cors from 'cors';
import mysql from 'mysql'; // https://expressjs.com/en/guide/database-integration.html
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    PORT,
    HOST,
    USER,
    PASSWORD,
    DATABASE,
    TOKEN_KEY
} from './constants.js';
import { checkAuthorization } from './middlware.js';
import { routes } from './routes.js';

const app = new express();
app.use(cors());
app.use(express.json()); // Required to handle JSON POST requests.

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
});
db.connect();

const getToken = (user_id, email) => jwt.sign(
        { user_id, email },
        TOKEN_KEY,
        {
            expiresIn: '24h',
        }
    );

// TODO: Add rate limiter and invisible Captcha.
app.post(routes.login, async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        let totalErrors = 0;
        db.query('SELECT id, password FROM users WHERE email = ?', [lowerCaseEmail], async (error, results) => {
            if (error) {
                console.log(error);
                totalErrors++;
                return;
            }
            if (results.length === 0) {
                // Register new user.
                const encryptedPassword = await bcrypt.hash(password, 10);
                db.query('INSERT INTO users SET ?', {
                    email: lowerCaseEmail,
                    password: encryptedPassword,
                    registered: Date.now()
                }, (error, results) => {
                    if (error) {
                        console.log(error);
                        totalErrors++;
                        return;
                    }
                    res.status(200).send({ token: getToken(results.insertId, lowerCaseEmail) });
                });
            } else {
                // Verify password and authenticate.
                const actualPassword = results[0].password;
                if (!(await bcrypt.compare(password, actualPassword))) {
                    console.log(error);
                    totalErrors++;
                    return;
                }
                res.status(200).send({ token: getToken(results[0].id, lowerCaseEmail) });
            }
        });
        if (totalErrors > 0) {
            res.status(401).send('Authentication Failed!');
        }
    } catch (error) {
        console.log(error);
        res.status(401).send('Authentication Failed!');
    }
});

// https://github.com/mysqljs/mysql#escaping-query-values
app.get(routes.getCarsById, checkAuthorization, (req, res) => {
    try {
        if (!res.locals.user?.user_id) {
            throw 'Error! Not authorized.';
        }
        const { headers, body, params: { id } } = req;
        db.query('SELECT * FROM cars WHERE id = ?', [id], (error, results, fields) => {
            if (error) {
                throw error;
            }
            if (results.length) {
                res.status(200).send(results[0]);
            } else {
                res.status(404).send('Not found!');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

app.get(routes.getAllCars, checkAuthorization, (req, res) => {
    try {
        if (!res.locals.user?.user_id) {
            throw 'Error! Not authorized.';
        }
        const { headers, body, params: { id } } = req;
        db.query('SELECT * FROM cars', (error, results, fields) => {
            if (error) {
                throw error;
            }
            res.status(200).send(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

app.post(routes.addCar, checkAuthorization, (req, res) => {
    try {
        if (!res.locals.user?.user_id) {
            throw 'Error! Not authorized.';
        }
        const { headers, body } = req;
        db.query('INSERT INTO cars SET ?', body, function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.status(200).send('ok');
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
});
