const express = require("express");
const con = require("../config/db.js");

const insertIndustry = (req, res) => {
    const { name } = req.body;
    const checkDuplicate = "select * from industry_master_tbl where name=?";
    con.query(checkDuplicate, [name], (err, result) => {
        if (result.length > 0) {
            return res.status(401).json({ error: "Industry already exists." });
        }
        const sql = "insert into industry_master_tbl(name) values(?)";
        con.query(sql, [name], (err, result) => {
            if (err) return res.json({ status: false, Error: "Query Error" });
            return res.json({ status: true, message: "Industry Added Successfully" });
        })
    })

}

const getAllIndustry = (req, res) => {
    const sql = "select * from industry_master_tbl";
    con.query(sql, (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, data: result });
    })
}

const getIndustryById = (req, res) => {
    const sql = "select * from industry_master_tbl where id=?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, data: result });
    })
}

const updateIndustryById = (req, res) => {
    const sql = "update industry_master_tbl set name=? where id=?";
    con.query(sql, [req.body.name, req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, data: result, message: "Industry Updated Successfully" });
    })
}
const deleteIndustry = (req, res) => {
    const sql = "delete from industry_master_tbl where id=?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" });
        return res.json({ status: true, data: result, message: "Industry Deleted Successfully" });
    })
}
module.exports = { insertIndustry, getAllIndustry, getIndustryById, updateIndustryById, deleteIndustry }