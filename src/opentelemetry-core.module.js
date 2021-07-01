"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.OpenTelemetryCoreModule = void 0;
var common_1 = require("@nestjs/common");
var host_metrics_1 = require("@opentelemetry/host-metrics");
var metrics_1 = require("@opentelemetry/metrics");
var nodeMetrics = require("opentelemetry-node-metrics");
var api_metrics_1 = require("@opentelemetry/api-metrics");
var sdk_node_1 = require("@opentelemetry/sdk-node");
var metric_service_1 = require("./metrics/metric.service");
var middleware_1 = require("./middleware");
var opentelemetry_constants_1 = require("./opentelemetry.constants");
var trace_service_1 = require("./tracing/trace.service");
var opentelemetry_module_1 = require("./opentelemetry.module");
/**
 * The internal OpenTelemetry Module which handles the integration
 * with the third party OpenTelemetry library and Nest
 *
 * @internal
 */
var OpenTelemetryCoreModule = /** @class */ (function () {
    function OpenTelemetryCoreModule(options, moduleRef) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.moduleRef = moduleRef;
        this.logger = new common_1.Logger('OpenTelemetryModule');
    }
    OpenTelemetryCoreModule_1 = OpenTelemetryCoreModule;
    /**
     * Bootstraps the internal OpenTelemetry Module with the given options
     * synchronously and sets the correct providers
     * @param options The options to bootstrap the module synchronously
     */
    OpenTelemetryCoreModule.forRoot = function (options) {
        if (options === void 0) { options = { metrics: {} }; }
        var openTelemetryModuleOptions = {
            provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
            useValue: options
        };
        return {
            module: OpenTelemetryCoreModule_1,
            providers: [
                openTelemetryModuleOptions,
                this.createNodeSDKProvider(),
                this.createMeterProvider(),
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ],
            exports: [
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ]
        };
    };
    /**
     * Bootstraps the internal OpenTelemetry Module with the given
     * options asynchronously and sets the correct providers
     * @param options The options to bootstrap the module
     */
    OpenTelemetryCoreModule.forRootAsync = function (options) {
        var asyncProviders = this.createAsyncProviders(options);
        return {
            module: opentelemetry_module_1.OpenTelemetryModule,
            imports: __spreadArray([], (options.imports || [])),
            providers: __spreadArray(__spreadArray([], asyncProviders), [
                this.createNodeSDKProvider(),
                this.createMeterProvider(),
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ]),
            exports: [
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ]
        };
    };
    OpenTelemetryCoreModule.prototype.configure = function (consumer) {
        var _a;
        var _b = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.metrics).apiMetrics, apiMetrics = _b === void 0 ? { enable: false } : _b;
        if (apiMetrics.enable === true) {
            consumer.apply(middleware_1.ApiMetricsMiddleware).forRoutes('*');
        }
    };
    OpenTelemetryCoreModule.prototype.onApplicationBootstrap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeOtelSDK, meterProvider, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodeOtelSDK = this.moduleRef.get(opentelemetry_constants_1.OPENTELEMETRY_SDK);
                        meterProvider = this.moduleRef.get(opentelemetry_constants_1.OPENTELEMETRY_METER_PROVIDER);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.logger.log('NestJS OpenTelemetry starting');
                        return [4 /*yield*/, nodeOtelSDK.start()];
                    case 2:
                        _a.sent();
                        // Start method sets a custom meter provider
                        // when exporter is defined. Overwrites that here.
                        // Possible improvements can be found here: https://github.com/open-telemetry/opentelemetry-js/issues/2307
                        api_metrics_1.metrics.setGlobalMeterProvider(meterProvider);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.logger.error(e_1 === null || e_1 === void 0 ? void 0 : e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenTelemetryCoreModule.prototype.onApplicationShutdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeOtelSDK, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodeOtelSDK = this.moduleRef.get(opentelemetry_constants_1.OPENTELEMETRY_SDK);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, nodeOtelSDK.shutdown()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.logger.error(e_2 === null || e_2 === void 0 ? void 0 : e_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenTelemetryCoreModule.createNodeSDKProvider = function () {
        return {
            provide: opentelemetry_constants_1.OPENTELEMETRY_SDK,
            useFactory: function (options) {
                var sdk = new sdk_node_1.NodeSDK(__assign({}, options.nodeSDKConfiguration));
                return sdk;
            },
            inject: [opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS]
        };
    };
    OpenTelemetryCoreModule.createMeterProvider = function () {
        return {
            provide: opentelemetry_constants_1.OPENTELEMETRY_METER_PROVIDER,
            useFactory: function (options) {
                var _a;
                var _b = options === null || options === void 0 ? void 0 : options.metrics, _c = _b.defaultMetrics, defaultMetrics = _c === void 0 ? false : _c, _d = _b.hostMetrics, hostMetrics = _d === void 0 ? false : _d;
                var meterProvider = new metrics_1.MeterProvider({
                    interval: 1000,
                    exporter: (_a = options === null || options === void 0 ? void 0 : options.nodeSDKConfiguration) === null || _a === void 0 ? void 0 : _a.metricExporter
                });
                if (defaultMetrics) {
                    nodeMetrics(meterProvider);
                }
                if (hostMetrics) {
                    var host = new host_metrics_1.HostMetrics({ meterProvider: meterProvider, name: 'host-metrics' });
                    host.start();
                }
                return meterProvider;
            },
            inject: [opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS]
        };
    };
    /**
     * Returns the asynchrnous OpenTelemetry options providers depending on the
     * given module options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    OpenTelemetryCoreModule.createAsyncOptionsProvider = function (options) {
        var _this = this;
        if (options.useFactory) {
            return {
                provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        if (options.useClass || options.useExisting) {
            var inject = [
                (options.useClass || options.useExisting),
            ];
            return {
                provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
                // eslint-disable-next-line max-len
                useFactory: function (optionsFactory) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, optionsFactory.createOpenTelemetryOptions()];
                }); }); },
                inject: inject
            };
        }
        throw new Error();
    };
    /**
     * Returns the asynchrnous providers depending on the given module
     * options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    OpenTelemetryCoreModule.createAsyncProviders = function (options) {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }
        var useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass: useClass,
                inject: __spreadArray([], (options.inject || []))
            },
        ];
    };
    var OpenTelemetryCoreModule_1;
    OpenTelemetryCoreModule = OpenTelemetryCoreModule_1 = __decorate([
        common_1.Global(),
        common_1.Module({}),
        __param(0, common_1.Inject(opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS))
    ], OpenTelemetryCoreModule);
    return OpenTelemetryCoreModule;
}());
exports.OpenTelemetryCoreModule = OpenTelemetryCoreModule;
