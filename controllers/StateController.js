const express = require("express");

const con = require("../config/db.js");

const insertState = (req, res) => {
  const sql = ` INSERT INTO  state_master (StateCode,StateName,CountryId,StatusCode,CreatedById,CreatedDate)VALUES (?,?,?,?,?,?)`;
  con.query(
    sql,
    [
      req.body.StateCode,
      req.body.StateName,
      req.body.CountryId,
      req.body.StatusCode,
      req.body.CreatedById,
      req.body.CreatedDate,
    ],
    (err, result) => {
      // if (err) return res.json({
      //     status: false, Error: "Query Error"
      // })
      if (err) return console.log(err);

      return res.json({
        status: true,
      });
    }
  );
};

const getAllState = (req, res) => {
  const sql = "SELECT sm.StateId, sm.StateCode, sm.StateName,cm.CountryName, sm.CountryId, sm.StatusCode, sm.CreatedById, sm.CreatedDate FROM state_master sm inner join  country_master cm on cm.CountryId=sm.CountryId ";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query Error" });
    return res.json({ status: true, data: result });
  });
};

const getStateById = (req, res) => {
  const sql = `SELECT sm.StateId, sm.StateCode, sm.StateName,cm.CountryName, sm.CountryId, sm.StatusCode, sm.CreatedById, sm.CreatedDate FROM state_master sm inner join  country_master cm on cm.CountryId=sm.CountryId  WHERE StateId = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err)
      return res.json({
        status: false,
        Error: "Query Error" + err,
      });
    return res.json({
      status: true,
      data: result,
    });
  });
};

const updateState = (req, res) => {
  const sql = `UPDATE state_master SET StateCode =?,StateName =?,CountryId =?,StatusCode=?,UpdatedById=?,UpdatedDate=? WHERE StateId = ?`;
  con.query(
    sql,
    [
      req.body.StateCode,
      req.body.StateName,
      req.body.CountryId,
      req.body.StatusCode,
      req.body.UpdatedById,
      req.body.UpdatedDate,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.json({ status: false, Error: "Query Error" + err });
      return res.json({ status: true });
    }
  );
};

const deleteState = (req, res) => {
  const sql = `DELETE FROM state_master WHERE StateId = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json({ status: false, Error: "Query Error" + err });
    return res.json({ status: true });
  });
};

module.exports = {
  insertState,
  getAllState,
  getStateById,
  updateState,
  deleteState,
};
