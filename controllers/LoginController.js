const express = require('express');

const con = require('../config/db.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

//login Controller

const login = (req, res) => {
    const sql = 'SELECT * FROM mst_login  WHERE email = ? and password = ? '
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ status: false, Error: "Error During Login", err })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret-key", { expiresIn: '1d' });
            res.cookie('token', token);

            return res.json({ status: true, Error: "Login Successfull" })
        }
        else
            return res.json({ status: false, Error: "Invalid Email or Password" })
    })

}


module.exports = { login }