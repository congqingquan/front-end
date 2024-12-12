import { join, sep } from 'path';
import { writeFile, mkdir } from 'fs';
import { Axios } from 'axios';

export interface Options {
    openApiUrl: string,
    outputPath: string,
    removePrefix: string
};

export interface Prop {
    // Integer > { type: "integer", format: "int32"}
    // Long > { type: "integer", format: "int64"}
    // LocalDateTime > { type: "string", format: "date-time"}
    // List > { type: 'array', items: { '$ref': '#/components/schemas/BSysMenuPageVO' }
    type: "integer" | "string" | "boolean" | "array",
    description?: string,
    format?: "int32" | "int64" | "date-time",
    items?: {
        $ref: string
    } | {
        type: "integer",
        format: "int32" | "int64"
    }
}

class OpenApiDomainGenerator {

    private options: Options;

    private axios: Axios = new Axios({});

    public constructor(options: Options) {
        this.options = options;
    }

    public generate() {
        const response = this.axios.get(this.options.openApiUrl);
        
        // 1. 递归创建输出目录
        mkdir(this.options.outputPath, { recursive: true }, (err) => {
            if (err) throw err;
        });
    
        // 2. 解析并生成 ts 文件
        response.then(response => {
            const schmeasObj = JSON.parse(response.data).components.schemas;
            for (const schmeaKey in schmeasObj) {
                const propsObj: { [props: string]: Prop } = schmeasObj[schmeaKey]['properties'];
                const tsFileName = schmeaKey.startsWith(this.options.removePrefix) ? schmeaKey.slice(this.options.removePrefix.length) : schmeaKey;
                const tsFileContent = 
                `export default interface ${tsFileName} {` 
                +
                `\n\t${Object.keys(propsObj).map(key => `//${propsObj[key].description}\n\t${key}: ${this.getPropType(propsObj[key])}`).join(",\n\t")}\n`
                +
                `}`;
                
                const finalTsFileName: string = `${this.options.outputPath + sep + tsFileName}.ts`;
                writeFile(finalTsFileName, tsFileContent, (err) => {
                    console.log(err);
                    if (err) throw err;
                });
            }
        });
    }

    public getPropType(prop: Prop): string | undefined {
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
            let items = prop.items
            if (!items) {
                return ''
            }
            if ((items as { $ref: string}).$ref) {
                //  "roles": {
                //     "type": "array",
                //     "description": "角色列表",
                //     "items": {
                //       "$ref": "#/components/schemas/BSysRoleAddDTO"
                //     }
                //   }
                return (items as { $ref: string}).$ref.split("/").pop() + "[]";
            } else {
                //  "menuResources": {
                //     "type": "array",
                //     "description": "菜单资源主键",
                //     "items": {
                //       "type": "integer",
                //       "description": "菜单资源主键",
                //       "format": "int64"
                //   }
                items = items as {
                    type: "integer";
                    format: "int32" | "int64";
                }
                if (items.type === 'integer') {
                    if (prop.format === 'int64') {
                        return 'string';
                    }
                    return 'number'; 
                } 
            }

        }
        // console.log(`Unsupported type [${prop.type}]`);
    }
}

const generator = new OpenApiDomainGenerator({
    openApiUrl: 'http://localhost:7070/api/v3/api-docs',
    outputPath: join(__dirname, './services'),
    removePrefix: ""
});

generator.generate();

export default OpenApiDomainGenerator;