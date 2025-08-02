"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("reflect-metadata");
var ormconfig_1 = require("./ormconfig");
var userRoutes_1 = require("./routes/userRoutes");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
ormconfig_1.AppDataSource.initialize()
    .then(function () {
    console.log('✅ DB connected');
    app.listen(3000, function () {
        console.log('🚀 Server running at http://localhost:3000');
    });
})
    .catch(function (error) { return console.error('❌ DB connection failed:', error); });
