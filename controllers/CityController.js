const con = require("../config/db.js");

const insertCity = (req, res) => {
  const sql = ` INSERT INTO  city_master (CityCode,CityName,StateId,StatusCode,CreatedById,CreatedDate)VALUES (?,?,?,?,?,?)`;
  con.query(
    sql,
    [
      req.body.CityCode,
      req.body.CityName,
      req.body.StateId,
      req.body.StatusCode,
      req.body.CreatedById,
      req.body.CreatedDate,
    ],
    (err, result) => {
      if (err)
        return res.json({
          status: false,
          Error: "Query Error",
        });

      if (result.fieldCount === 0) {
        return res.json({ error: "Enter All Fields" });
      } else {
        return res.json({
          status: true,
        });
      }

      //   if (err) return console.log(err);
    }
  );
};

const getAllCity = (req, res) => {
  const sql = "SELECT * FROM city_master";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query Error" });
    return res.json({ status: true, data: result });
  });
};

const getCityById = (req, res) => {
  const sql = `SELECT * FROM city_master WHERE CityId = ?`;
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

const updateCity = (req, res) => {
  const sql = `UPDATE city_master SET CityCode =?,CityName =?,StateId =?,StatusCode=?,UpdatedById=?,UpdatedDate=? WHERE CityId = ?`;
  con.query(
    sql,
    [
      req.body.CityCode,
      req.body.CityName,
      req.body.StateId,
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

const deleteCity = (req, res) => {
  const sql = `DELETE FROM city_master WHERE CityId = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json({ status: false, Error: "Query Error" + err });
    return res.json({ status: true });
  });
};

module.exports = {
  insertCity,
  getAllCity,
  getCityById,
  updateCity,
  deleteCity,
};
