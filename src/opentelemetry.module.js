"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpenTelemetryModule = void 0;
var common_1 = require("@nestjs/common");
var opentelemetry_core_module_1 = require("./opentelemetry-core.module");
/**
 * The NestJS module for OpenTelemetry
 */
var OpenTelemetryModule = /** @class */ (function () {
    function OpenTelemetryModule() {
    }
    OpenTelemetryModule_1 = OpenTelemetryModule;
    /**
     * Bootstraps the OpenTelemetry Module synchronously
     * @param options The options for the OpenTelemetry Module
     */
    OpenTelemetryModule.forRoot = function (options) {
        return {
            module: OpenTelemetryModule_1,
            imports: [opentelemetry_core_module_1.OpenTelemetryCoreModule.forRoot(options)]
        };
    };
    /**
     * Bootstrap the OpenTelemetry Module asynchronously
     * @see https://dev.to/nestjs/advanced-nestjs-how-to-build-completely-dynamic-nestjs-modules-1370
     * @param options The options for the OpenTelemetry module
     */
    OpenTelemetryModule.forRootAsync = function (options) {
        return {
            module: OpenTelemetryModule_1,
            imports: [opentelemetry_core_module_1.OpenTelemetryCoreModule.forRootAsync(options)]
        };
    };
    var OpenTelemetryModule_1;
    OpenTelemetryModule = OpenTelemetryModule_1 = __decorate([
        common_1.Module({})
    ], OpenTelemetryModule);
    return OpenTelemetryModule;
}());
exports.OpenTelemetryModule = OpenTelemetryModule;
