const express = require("express");

const con = require("../config/db.js");

const insertCategory = async (req, res) => {
    const { CategoryName, ClientCode, StatusCode, AddUserId, LiveUpdate } = req.body;

    try {
        // Check if category already exists
        const checkDuplicate = "SELECT * FROM category_master_tbl WHERE CategoryName = ?";
        con.query(checkDuplicate, [CategoryName], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error while checking duplicate." });
            }

            if (result.length > 0) {
                return res.status(401).json({ error: "Category already exists." });
            }

            // Insert category if not duplicate
            const sql = "INSERT INTO category_master_tbl (CategoryName, ClientCode, StatusCode, AddUserId, AddUserDate, LiveUpdate) VALUES (?, ?, ?, ?, NOW(), ?)";
            con.query(sql, [CategoryName, ClientCode, StatusCode, AddUserId, LiveUpdate], (err, insertResult) => {
                if (err) {
                    return res.status(500).json({ status: false, message: "Error inserting category." });
                }
                return res.status(201).json({ status: true, message: "Category added successfully." });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
};

const getAllCategory = async (req, res) => {

    try {
        const sql = "select * from category_master_tbl"
        con.query(sql, (err, result) => {
            if (err) return res.json({ status: false, Error: "Error Fetching the Category data" })
            return res.json({ status: true, data: result })
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

const getCategorById = async (req, res) => {
    try {
        const sql = "select * from category_master_tbl where Categoryid =?"
        con.query(sql, [req.params.id], (err, result) => {
            if (err) return res.json({
                status: false,
                message: "Error fetching Category Id"
            })
            return res.json({
                status: true, data: result
            })
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });

    }
}

const updateCategory = async (req, res) => {
    const sql = `UPDATE category_master_tbl 
                 SET CategoryName = ?, ClientCode = ?, StatusCode = ?, 
                     ChangeUserId = ?, ChangeDate = NOW(), LiveUpdate = ? 
                 WHERE Categoryid = ?`;

    con.query(sql,
        [req.body.CategoryName, req.body.ClientCode, req.body.StatusCode,
        req.body.ChangeUserId, req.body.LiveUpdate, req.params.id],
        (err, result) => {
            if (err) {
                return res.json({ status: false, error: "Query Error: " + err });
            }
            return res.json({ status: true, message: "Category updated successfully", result });
        });
};

const deleteCategory = async (req, res) => {
    const sql = `DELETE FROM category_master_tbl WHERE Categoryid = ?`
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ status: false, Error: "Query Error" + err })
        return res.json({ status: true, message: 'Record Deleted Successfuly' })

    })
}

module.exports = { insertCategory, getAllCategory, getCategorById, updateCategory, deleteCategory };

