import { AxiosResponse } from "axios"
import ApiAxios from "./axios/ApiAxios"
import { ApiPageResult, ApiResult } from "./Types"
import BDictionaryAddDTO from "./dto/BDictionaryAddDTO"
import BDictionaryPageDTO from "./dto/BDictionaryPageDTO"
import BDictionaryUpdateDTO from "./dto/BDictionaryUpdateDTO"
import BDictionaryPageVO from "./vo/BDictionaryPageVO"
import DictionaryPageByDictTypeDTO from "./dto/DictionaryPageByDictTypeDTO"
import DictionaryPageByDictTypeVO from "./vo/DictionaryPageByDictTypeVO"
import BDictionaryDeleteDTO from "./dto/BDictionaryDeleteDTO"


// 字典管理
// 1. 查询
// 1) 分页
export const dictionaryPage = (param: Partial<BDictionaryPageDTO>): Promise<AxiosResponse<ApiPageResult<BDictionaryPageVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<BDictionaryPageVO>>("/b/dictionary/page", param);
}
// 1.2) 根据字典类型分页
export const dictionaryPageByDictType = (param: Partial<DictionaryPageByDictTypeDTO>): Promise<AxiosResponse<ApiPageResult<DictionaryPageByDictTypeVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<DictionaryPageByDictTypeVO>>("/common/dictionary/page-by-dict-type", param);
}
// 2. 新增
export const addDictionary = (param: Partial<BDictionaryAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/dictionary/add", param);
}
// 3. 修改
export const eidtDictionary = (param: Partial<BDictionaryUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/dictionary/edit", param);
}
// 4. 删除
export const deleteDictionary = (param: BDictionaryDeleteDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/dictionary/delete", param);
}