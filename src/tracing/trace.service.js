"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TraceService = void 0;
var api_1 = require("@opentelemetry/api");
var common_1 = require("@nestjs/common");
var TraceService = /** @class */ (function () {
    function TraceService() {
    }
    TraceService.prototype.getSpan = function () {
        return api_1.trace.getSpan(api_1.context.active());
    };
    TraceService.prototype.startSpan = function (name) {
        var tracer = api_1.trace.getTracer('default');
        return tracer.startSpan(name);
    };
    TraceService = __decorate([
        common_1.Injectable()
    ], TraceService);
    return TraceService;
}());
exports.TraceService = TraceService;
