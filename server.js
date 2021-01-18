const express = require("express");
const apiRoutes = require("./routes/api-routes")
const htmlRoutes = require("./routes/html-routes")

// set up express app
const app = express();
const PORT = process.env.PORT || 3000;

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log("aplication is running"));