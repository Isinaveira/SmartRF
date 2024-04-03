const mongoose = require("mongoose");

const chartsMeasuresSchema = new mongoose.Schema({

    

});

const chartsMeasure = mongoose.model("chartsMeasure", chartsMeasuresSchema, "chartMeasures");

module.exports = chartsMeasure;