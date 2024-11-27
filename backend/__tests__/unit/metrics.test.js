"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prom_client_1 = __importDefault(require("prom-client"));
const supertest_1 = __importDefault(require("supertest"));
const metrics_1 = __importDefault(require("../../src/routes/metrics"));
describe('/metrics Route', () => {
    const app = (0, express_1.Router)();
    app.use('/metrics', metrics_1.default);
    beforeEach(() => {
        // Clear all Prometheus metrics before each test
        prom_client_1.default.register.clear();
    });
    it('should return Prometheus metrics', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toContain('# HELP');
        expect(res.text).toContain('# TYPE');
    }));
    it('should increment the custom HTTP requests counter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).get('/metrics');
        const metrics = yield prom_client_1.default.register.metrics();
        expect(metrics).toContain('custom_http_requests_total');
    }));
});
