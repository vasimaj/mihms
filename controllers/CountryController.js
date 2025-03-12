const express = require('express');

const con = require('../config/db.js');

const insertCountry = (req, res) => {
    const { CountryCode, CountryName } = req.body
    // if (!CountryCode || !CountryName || !StatusCode) { return res.status(400).json({ error: "Country Code & Country Name & Status Code Required." }) }

    const checkDuplicateQuery = "SELECT * FROM country_master WHERE CountryCode = ? AND CountryName = ? ";
    con.query(checkDuplicateQuery, [CountryCode, CountryName], (err, result) => {
        // if (err) return res.status(500).json({ error: "Database query failed." });


        if (result.length > 0) {
            return res.status(401).json({ error: "Country already exists." });
        }
        const sql = ` INSERT INTO  country_master (CountryCode,CountryName,StatusCode,CreatedById,CreatedDate)VALUES (?,?,?,?,?)`
        con.query(sql, [req.body.CountryCode, req.body.CountryName, req.body.StatusCode, req.body.CreatedById, req.body.CreatedDate], (err, result) => {
            if (err) return res.json({
                status: false, Error: "Query Error"
            })
            //if (err) return console.log(err);

            return res.json({ status: true })

        })
    })
    // const sql = ` INSERT INTO  country_master (CountryCode,CountryName,StatusCode,CreatedById,CreatedDate)VALUES (?,?,?,?,?)`
    // con.query(sql, [req.body.CountryCode, req.body.CountryName, req.body.StatusCode, req.body.CreatedById, req.body.CreatedDate], (err, result) => {
    //     if (err) return res.json({
    //         status: false, Error: "Query Error"
    //     })
    //     //if (err) return console.log(err);

    //     return res.json({ status: true })

    // })
}
const getAllCountries = (req, res) => {
    const sql = "SELECT * FROM country_master"
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" })
        return res.json({ status: true, data: result })
    })
}

const getCountryById = (req, res) => {
    const sql = `SELECT * FROM country_master WHERE CountryId = ?`
    con.query(sql, [req.params.id], (err, result) => {

        if
            (err) return res.json({
                status: false, Error: "Query Error" + err
            })
        return res.json({
            status: true, data: result
        })

    })
}

// const getCountryById = (req, res) => {
//     const id = req.params.id;
//     const sql = `SELECT * FROM country_master WHERE CountryId = ?`
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ status: false, Error: "Query Error" });
//         return res.json({ status: true, Result: result })
//     })
// }

const updateCountry = (req, res) => {
    const sql = `UPDATE country_master SET CountryCode =?,CountryName =?,StatusCode=?,UpdatedById=?,UpdatedDate=? WHERE CountryId = ?`
    con.query(sql, [req.body.CountryCode, req.body.CountryName, req.body.StatusCode, req.body.UpdatedById, req.body.UpdatedDate, req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err })
        return res.json({ status: true, Result: result })

    })




}

// const updateCountry = (req, res) => {
//     const CountryId = req.params.CountryId
//     const sql = `UPDATE country_master  
//     set CountryCode=?,CountryName=? 
//     where CountryId=?`
//     const values = [
//         req.body.CountryCode,
//         req.body.CountryName,


//     ]
//     con.query(sql, [...values, CountryId], (err, result) => {
//         if (err) return res.json({ status: false, Error: "Query Error" + err });
//         return res.json({ status: true, Result: result })
//     })
// }

const deleteCountry = (req, res) => {
    const sql = `DELETE FROM country_master WHERE CountryId = ?`
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err })
        return res.json({ status: true })

    })
}

module.exports = {
    insertCountry,
    getAllCountries,
    getCountryById,
    updateCountry,
    deleteCountry
}


