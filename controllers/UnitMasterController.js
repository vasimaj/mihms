const express = require("express");

const con = require('../config/db.js')


const InsertUnitMaster = (req, res) => {
    const { UnitName, ClientCode } = req.body;

    if (!UnitName || !ClientCode) {
        return res.status(400).json({ error: "UnitName and ClientCode are required" });
    }

    // Check for duplicates
    const checkQuery = "SELECT * FROM UnitMaster WHERE UnitName = ? AND ClientCode = ?";
    con.query(checkQuery, [UnitName, ClientCode], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length > 0) {
            return res.status(400).json({ error: "Unit already exists" });
        }

        // Insert data if no duplicates found
        const sql = "INSERT INTO UnitMaster (UnitName, ClientCode) VALUES (?, ?)";
        con.query(sql, [UnitName, ClientCode], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Unit added successfully", UnitID: result.insertId });
        });
    });
}

const getAllUnitMaster = (req, res) => {
    con.query("SELECT * FROM UnitMaster", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}

const getSingleRecord = (req, res) => {
    const { id } = req.params;
    con.query("SELECT * FROM UnitMaster WHERE UnitID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "Unit not found" });
        res.status(200).json(result[0]);
    });
}

const UpdateUnitMasterById = (req, res) => {
    const { id } = req.params;
    const { UnitName, ClientCode } = req.body;

    if (!UnitName || !ClientCode) {
        return res.status(400).json({ error: "UnitName and ClientCode are required" });
    }

    const updateQuery = "UPDATE UnitMaster SET UnitName = ?, ClientCode = ? WHERE UnitID = ?";
    con.query(updateQuery, [UnitName, ClientCode, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Unit not found" });
        res.status(200).json({ message: "Unit updated successfully" });
    });
}

const deleteUnitMaster = (req, res) => {
    const { id } = req.params;

    con.query("DELETE FROM UnitMaster WHERE UnitID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Unit not found" });
        res.status(200).json({ message: "Unit deleted successfully" });
    });
}




module.exports = {
    InsertUnitMaster,
    getAllUnitMaster,
    getSingleRecord,
    UpdateUnitMasterById,
    deleteUnitMaster
}