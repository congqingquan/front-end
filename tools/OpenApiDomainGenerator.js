import { join, sep, resolve } from 'path';
import { writeFile, mkdir } from 'fs';
import yargs from 'yargs';
import Axios from 'axios';
;
class OpenApiDomainGenerator {
    options;
    axios;
    constructor(options, axios) {
        this.options = options;
        this.axios = axios;
    }
    generate(domains) {
        const response = this.axios.get(this.options.openApiUrl);
        // 1. 递归创建输出目录
        mkdir(this.options.outputPath, { recursive: true }, (err) => {
            if (err)
                throw err;
        });
        // 2. 解析并生成 ts 文件
        response.then((response) => {
            const schmeasObj = response.data.components.schemas;
            for (const schmeaKey in schmeasObj) {
                const propsObj = schmeasObj[schmeaKey]['properties'];
                // schmeaKey
                // BSysMenuUpdateStatusDTO
                // BSysMenuTreeDTO
                // BCategoriesEditDTO
                // 如果设置了过滤的 domain，则进行判断。未设置则忽略。
                if (domains && domains.length > 0 && !domains.find(d => schmeaKey.startsWith(d))) {
                    continue;
                }
                const tsFileName = schmeaKey.startsWith(this.options.removePrefix) ? schmeaKey.slice(this.options.removePrefix.length) : schmeaKey;
                const tsFileContent = `export default interface ${tsFileName} {`
                    +
                        `\n\t${Object.keys(propsObj).map(key => `//${propsObj[key].description}\n\t${key}: ${this.getPropType(propsObj[key])}`).join(",\n\t")}\n`
                    +
                        `}`;
                const finalTsFileName = `${this.options.outputPath + sep + tsFileName}.ts`;
                writeFile(finalTsFileName, tsFileContent, (err) => {
                    // console.log(err);
                    if (err)
                        throw err;
                });
            }
        });
    }
    getPropType(prop) {
        if (prop.type === 'integer') {
            if (prop.format === 'int64') {
                return 'string';
            }
            return 'number';
        }
        else if (prop.type === 'number') {
            return 'number';
        }
        else if (prop.type === 'boolean') {
            return 'boolean';
        }
        else if (prop.type === 'string') {
            if (prop.format === 'date-time') {
                // 默认时间返回 Date
                return 'string';
            }
            return 'string';
        }
        else if (prop.type === 'array') {
            let items = prop.items;
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
        return;
    }
}
// 包装为异步函数执行，避免顶级 await
const exec = async () => {
    // 命令行参数
    const args = await yargs([])
        .option('domain', {
        alias: 'd',
        describe: 'Domain names, seperate by comma',
        type: 'string',
        // 是否必选
        // demandOption: true,
    })
        .argv;
    console.log(args);
    let domainArgv = args.domain ? args.domain.split(',') : [];
    console.log(domainArgv);
    const generator = new OpenApiDomainGenerator({
        openApiUrl: 'http://localhost:7070/api/v3/api-docs',
        outputPath: join(resolve(), './services'),
        removePrefix: ""
    }, Axios);
    generator.generate(domainArgv);
};
exec();
export default OpenApiDomainGenerator;
