const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const CountryRoutes = require("./Routes/CountryRoutes.js");
const StateRoutes = require("./Routes/StateRoutes.js");
const CityRoutes = require("./Routes/CityRoutes.js");
const LoginRoutes = require("./Routes/LoginRoute.js");
const IndutryMasterRoute = require("./Routes/IndutryMasterRoute.js");
const CategoryMasterRoute = require("./Routes/CategoryMasterRoute.js")
const TaxMasterRoute = require("./Routes/TaxMasterRoute.js")
const InsertUnitMaster = require("./Routes/UnitMasterRoute.js")
const app = express();

app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Change this to match your frontend (e.g., React, Angular)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/mihms", LoginRoutes);
app.use("/api/mihms", CountryRoutes);
app.use("/api/mihms", StateRoutes);
app.use("/api/mihms", CityRoutes);
app.use("/api/mihms", IndutryMasterRoute);
app.use("/api/mihms", CategoryMasterRoute)
app.use("/api/mihms", TaxMasterRoute);
app.use("/api/mihms", InsertUnitMaster)

app.listen(8080, (req, res) => {
  console.log("Server is running on port 8080");
});
