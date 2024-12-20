"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var axios_1 = require("axios");
;
var OpenApiDomainGenerator = /** @class */ (function () {
    function OpenApiDomainGenerator(options) {
        this.axios = new axios_1.Axios({});
        this.options = options;
    }
    OpenApiDomainGenerator.prototype.generate = function () {
        var _this = this;
        var response = this.axios.get(this.options.openApiUrl);
        // 1. 递归创建输出目录
        (0, fs_1.mkdir)(this.options.outputPath, { recursive: true }, function (err) {
            if (err)
                throw err;
        });
        // 2. 解析并生成 ts 文件
        response.then(function (response) {
            var schmeasObj = JSON.parse(response.data).components.schemas;
            var _loop_1 = function (schmeaKey) {
                var propsObj = schmeasObj[schmeaKey]['properties'];
                var tsFileName = schmeaKey.startsWith(_this.options.removePrefix) ? schmeaKey.slice(_this.options.removePrefix.length) : schmeaKey;
                var tsFileContent = "export default interface ".concat(tsFileName, " {")
                    +
                        "\n\t".concat(Object.keys(propsObj).map(function (key) { return "//".concat(propsObj[key].description, "\n\t").concat(key, ": ").concat(_this.getPropType(propsObj[key])); }).join(",\n\t"), "\n")
                    +
                        "}";
                var finalTsFileName = "".concat(_this.options.outputPath + path_1.sep + tsFileName, ".ts");
                (0, fs_1.writeFile)(finalTsFileName, tsFileContent, function (err) {
                    console.log(err);
                    if (err)
                        throw err;
                });
            };
            for (var schmeaKey in schmeasObj) {
                _loop_1(schmeaKey);
            }
        });
    };
    OpenApiDomainGenerator.prototype.getPropType = function (prop) {
        if (prop.type === 'integer') {
            if (prop.format === 'int64') {
                return 'string';
            }
            return 'number';
        }
        else if (prop.type === 'boolean') {
            return 'boolean';
        }
        else if (prop.type === 'string') {
            if (prop.format === 'date-time') {
                return 'Date';
            }
            return 'string';
        }
        else if (prop.type === 'array') {
            var items = prop.items;
            if (!items) {
                return '';
            }
            if (items.$ref) {
                //  "roles": {
                //     "type": "array",
                //     "description": "角色列表",
                //     "items": {
                //       "$ref": "#/components/schemas/BSysRoleAddDTO"
                //     }
                //   }
                return items.$ref.split("/").pop() + "[]";
            }
            else {
                //  "menuResources": {
                //     "type": "array",
                //     "description": "菜单资源主键",
                //     "items": {
                //       "type": "integer",
                //       "description": "菜单资源主键",
                //       "format": "int64"
                //   }
                items = items;
                if (items.type === 'integer') {
                    if (prop.format === 'int64') {
                        return 'string';
                    }
                    return 'number';
                }
            }
        }
        // console.log(`Unsupported type [${prop.type}]`);
    };
    return OpenApiDomainGenerator;
}());
var generator = new OpenApiDomainGenerator({
    openApiUrl: 'http://localhost:7070/api/v3/api-docs',
    outputPath: (0, path_1.join)(__dirname, './services'),
    removePrefix: ""
});
generator.generate();
exports.default = OpenApiDomainGenerator;
