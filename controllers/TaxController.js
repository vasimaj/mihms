const express = require("express")

const con = require("../config/db.js");

function validateTaxMaster(data) {
    if (!data.Tax || isNaN(data.Tax)) return { valid: false, message: "Tax is required and must be a number" };
    if (!data.CGST || isNaN(data.CGST)) return { valid: false, message: "CGST is required and must be a number" };
    if (!data.SGST || isNaN(data.SGST)) return { valid: false, message: "SGST is required and must be a number" };
    if (!data.CESS || isNaN(data.CESS)) return { valid: false, message: "CESS is required and must be a number" };
    if (!data.ServiceCharge || isNaN(data.ServiceCharge)) return { valid: false, message: "ServiceCharge is required and must be a number" };
    if (!data.IGST || isNaN(data.IGST)) return { valid: false, message: "IGST is required and must be a number" };
    if (!data.MaxValue || isNaN(data.MaxValue)) return { valid: false, message: "MaxValue is required and must be a number" };
    if (!data.MinValue || isNaN(data.MinValue)) return { valid: false, message: "MinValue is required and must be a number" };
    if (!data.CreatedBy || data.CreatedBy.trim() === "") return { valid: false, message: "CreatedBy is required" };
    if (!data.Status || data.Status.trim() === "") return { valid: false, message: "Status is required" };
    if (!data.ClientCode || isNaN(data.ClientCode)) return { valid: false, message: "ClientCode is required and must be a number" };

    return { valid: true };
}

const InsertTax = (req, res) => {
    const validation = validateTaxMaster(req.body);
    if (!validation.valid) return res.status(400).json({ message: validation.message });

    const { Tax, CGST, SGST, CESS, ServiceCharge, IGST, MaxValue, MinValue, CreatedBy, Status, ClientCode } = req.body;

    // Check for duplicate Tax
    con.query("SELECT * FROM tax_master_tbl  WHERE Tax = ?", [Tax], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            return res.status(409).json({ message: "Tax value already exists, duplicate entry not allowed." });
        }

        // Insert new record if no duplicate found
        const sql = `INSERT INTO  tax_master_tbl (Tax, CGST, SGST, CESS, ServiceCharge, IGST, \`MaxValue\`, \`MinValue\`, CreatedBy, CreatedDate, Status, ClientCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`;
        con.query(sql, [Tax, CGST, SGST, CESS, ServiceCharge, IGST, MaxValue, MinValue, CreatedBy, Status, ClientCode], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "TaxMaster created successfully", id: result.insertId });
        });
    });
}

const getAllTaxMaster = (req, res) => {
    con.query("SELECT * FROM tax_master_tbl", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    })
}

const getSingleTaxRecord = (req, res) => {
    const { id } = req.params;
    con.query("SELECT * FROM tax_master_tbl WHERE TaxID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "TaxMaster not found" });
        res.json(result[0]);
    });
}

const updateTaxRecord = (req, res) => {
    const taxId = req.params.id;
    const { Tax, CGST, SGST, CESS, ServiceCharge, IGST, MaxValue, MinValue, CreatedBy, Status, ClientCode } = req.body;

    // Validate empty fields
    if (!Tax || !CGST || !SGST || !CESS || !ServiceCharge || !IGST || !MaxValue || !MinValue || !CreatedBy || !Status || !ClientCode) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // ✅ Fixed SQL Query (Added Backticks for MaxValue and MinValue)
    const sql = `
        UPDATE tax_master_tbl 
        SET Tax = ?, CGST = ?, SGST = ?, CESS = ?, ServiceCharge = ?, IGST = ?, 
            \`MaxValue\` = ?, \`MinValue\` = ?, CreatedBy = ?, Status = ?, ClientCode = ?, ModifiedDate = NOW() 
        WHERE TaxID = ?
    `;

    // Execute the query
    con.query(sql, [Tax, CGST, SGST, CESS, ServiceCharge, IGST, MaxValue, MinValue, CreatedBy, Status, ClientCode, taxId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "No record found with this TaxID" });
            }
            res.status(200).json({ message: "Tax details updated successfully" });
        });
}

const deleteTaxRecord = (req, res) => {
    const { id } = req.params;
    con.query("DELETE FROM tax_master_tbl WHERE TaxID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "TaxMaster not found" });
        res.json({ message: "TaxMaster deleted successfully" });
    });
}
module.exports = { InsertTax, getAllTaxMaster, getSingleTaxRecord, updateTaxRecord, deleteTaxRecord }