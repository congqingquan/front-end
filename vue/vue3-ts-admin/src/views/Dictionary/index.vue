<template>

    <!-- Table search -->
    <a-form layout="inline" :model="searchFormState" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_DICTIONARY_PAGE]" >
        <a-form-item>
            <a-input v-model:value="searchFormState.name" placeholder="请输入搜索目录名称">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-model:value="searchFormState.dictType" placeholder="请输入搜索类型">
                <template #prefix>
                    <OrderedListOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-space>
                <a-tooltip title="搜索">
                    <a-button type="primary" html-type="submit" shape="circle" :icon="h(SearchOutlined)" @click.prevent="handleSearchFormFinish"/>
                </a-tooltip>
                <a-tooltip title="清除搜索内容">
                    <a-button shape="circle" :icon="h(DeleteOutlined)" @click="searchFormStateResetFields" ></a-button>
                </a-tooltip>
            </a-space>
        </a-form-item>
    </a-form>

    <!-- Table add btn / batch delete btn -->
    <a-space style="margin: 15px 0 5px 0;">
        <a-button type="primary" html-type="submit" @click="showAddUpdateModal('ADD', { nodeType: 'DIRECTORY' } as DictionaryPageByDictTypeVO)" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_DICTIONARY_ADD]">新增</a-button>
    </a-space>

    <!-- Table page -->
    <a-table style="margin: 5px 0;" rowKey="dictId"
        :columns="columns" :data-source="tableDataRef" :scroll="{ x: 700 }" :pagination="{
            current: currentRef,
            pageSize: pageSizeRef,
            total: totalRef,
            pageSizeOptions: pageSizeOptionsRef,
            showSizeChanger: true,
            buildOptionText: (opt) => `${opt.value} 条 / 页`,
            'onUpdate:current': (current) => loadTableData(searchFormState, current, pageSizeRef),
            'onUpdate:pageSize': (pageSize) => loadTableData(searchFormState, currentRef, pageSize),
        }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'nodeType'">
                {{ Constants.DICTIONARY_NODE_TYPE_MAPPING[record.nodeType] ?? '' }}
            </template>
            <template v-if="column.key === 'status'">
                {{ Constants.STATUS_MAPPING[record.status] ?? '' }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a-button type="link" 
                        @click="showAddUpdateModal('ADD', { parentId: record.dictId, nodeType: 'DICTIONARY', dictType: record.dictType } as DictionaryPageByDictTypeVO)" 
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_DICTIONARY_ADD] && record.nodeType === 'DIRECTORY'">
                        新增
                    </a-button>
                    <a-button type="link" @click="showAddUpdateModal('UPDATE', record as DictionaryPageByDictTypeVO)" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_DICTIONARY_EDIT]">修改</a-button>
                    <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
                        @confirm="handelTableRecordRowDelete({nodeType: record.nodeType, dictIds: [record.dictId]})" @cancel="" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_DICTIONARY_DELETE]">
                        <a-button type="link" danger>删除</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>  

    <!-- Table add / update modal -->
    <a-modal v-model:open="addUpdateModalOpenRef"
        :title="modalTypeRef === 'ADD' ? '新增' : modalTypeRef === 'UPDATE' ? '修改' : '未知类型'"
        :afterClose="hideAddUpdateModal"
        style="min-width: 700px;"
        >
        <a-form name="basic" :model="addUpdateModalFormState"
            :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
            autocomplete="off" @finish-failed="onAddUpdateModalFormFinishFailed">
            <a-form-item label="业务主键" name="dictId" hidden>
                <a-input v-model:value="addUpdateModalFormState.dictId" />
            </a-form-item>
            <a-form-item label="父节点主键" name="parentId" hidden>
                <a-input v-model:value="addUpdateModalFormState.parentId" />
            </a-form-item>
            <a-form-item label="名称" name="name" v-bind="addUpdateModalValidateInfos.name">
                <a-input v-model:value="addUpdateModalFormState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="值" name="value" v-bind="addUpdateModalValidateInfos.value">
                <a-input v-model:value="addUpdateModalFormState.value" placeholder="请输入值" />
            </a-form-item>
            <a-form-item label="类型" name="dictType">
                <a-input v-model:value="addUpdateModalFormState.dictType" placeholder="请输入类型" :disabled="addUpdateModalFormState.nodeType === 'DICTIONARY'"/>
            </a-form-item>
            <a-form-item label="状态" name="status">
                <a-switch v-model:checked="addUpdateModalFormState.status" checkedValue="NORMAL" unCheckedValue="DISABLED"/>
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button @click="hideAddUpdateModal">取消</a-button>
            <a-button key="submit" type="primary" :loading="addUpdateModalLoadingRef"
                @click.prevent="onAddUpdateModalFormFinish">
                提交
            </a-button>
        </template>
    </a-modal>
</template>
<script lang="ts" setup>
import Api from '@/api/Api';
import Constants from '@/common/Constants';
import { MenuButtonIdentifier } from '@/di/SysUserResourcesProvider';
import ArrayUtils from '@/util/ArrayUtils';
import { DeleteOutlined, OrderedListOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Form, FormProps, message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { ColumnType } from 'ant-design-vue/es/table';
import { h, inject, onMounted, reactive, ref, watch } from 'vue';
import { ProviderKeys } from '@/di/ProviderKeys';
import { sysUserResourcesProvider as $sysUserResourcesProvider, SysUserResourcesProvider } from '@/di/SysUserResourcesProvider';
import DictionaryPageByDictTypeVO from '@/api/vo/DictionaryPageByDictTypeVO';
import BDictionaryDeleteDTO from '@/api/dto/BDictionaryDeleteDTO';

// ========================================= 注入全局资源 =========================================

const sysUserResourcesProvider = inject<SysUserResourcesProvider>(ProviderKeys.SYS_USER_RESOURCES, $sysUserResourcesProvider)

const useForm = Form.useForm
// Table Search
interface SearchFormState {
    name: string,
    dictType: string
}
const searchFormState = ref<SearchFormState>({
    name: '',
    dictType: ''
})
const { resetFields: searchFormStateResetFields } = useForm(
    searchFormState
)

const handleSearchFormFinish: FormProps['onFinish'] = values => {
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}
const handleSearchFormFinishFailed: FormProps['onFinishFailed'] = errors => {
    message.error(errors.values)
}

// Table - column
const columns: ColumnType[] = [
    // {
    //     title: '业务主键',
    //     dataIndex: 'dictId',
    //     key: 'dictId',
    //     width: 70,
    //     align: 'center',
    // },
    // {
    //     title: '父节点主键',
    //     dataIndex: 'parentId',
    //     key: 'parentId',
    //     width: 70,
    //     align: 'center',
    // },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 70,
        align: 'center',
    },
    {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: 70,
        align: 'center',
    },
    {
        title: '字典类型',
        key: 'dictType',
        dataIndex: 'dictType',
        width: 70,
        align: 'center',
    },
    {
        title: '节点类型',
        key: 'nodeType',
        dataIndex: 'nodeType',
        width: 70,
        align: 'center',
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 70,
        align: 'center',
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        width: 100,
        align: 'center',
    },
    {
        title: '操作',
        key: 'action',
        width: 50,
        align: 'center',
    },
]

// Table - pagination
const tableDataRef = ref<DictionaryPageByDictTypeVO[]>([])
const currentRef = ref(1)
const pageSizeRef = ref(10)
const totalRef = ref(0)
const pageSizeOptionsRef = ref<string[]>(['10', '20', '30', '40', '50'])
const loadTableData = async (formState: SearchFormState, current: number, pageSize: number) => {
    const response = await Api.dictionaryPageByDictType({
        pageNo: current,
        pageSize: pageSize,
        ...formState
    })
    const responseData = response.data.data
    currentRef.value = responseData.current
    pageSizeRef.value = responseData.size
    totalRef.value = responseData.total

    // 处理分页数据
    tableDataRef.value = responseData.records.map(record => {
        return {
            ...record
        }
    })
}

// Table - delete
const handelTableRecordRowDelete = async (deleteDictionary: BDictionaryDeleteDTO) => {

    await Api.deleteDictionary(deleteDictionary)

    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}

// Table add / update modal
type ModalType = 'ADD' | 'UPDATE'
const modalTypeRef = ref<ModalType>()
const addUpdateModalLoadingRef = ref<boolean>(false)
const addUpdateModalOpenRef = ref<boolean>(false)
const showAddUpdateModal = (type: ModalType, record?: DictionaryPageByDictTypeVO) => {
    modalTypeRef.value = type
    addUpdateModalOpenRef.value = true
    if (record) {
        Object.assign(addUpdateModalFormState, {
            ...record
        })
    }
}
const hideAddUpdateModal = () => {
    addUpdateModalOpenRef.value = false
    addUpdateModalResetFields()
}

// menu tree
const menuButtonsMap = sysUserResourcesProvider.data.menuButtonsMap.value

// Table add / update modal form
interface DictionaryModalFormState {
    dictId: string,
    parentId: string,
    name: string,
    value: string,
    dictType: string,
    nodeType: string,
    status: string
}
const addUpdateModalFormState = reactive<DictionaryModalFormState>({
    dictId: '',
    parentId: '',
    name: '',
    value: '',
    dictType: '',
    nodeType: '',
    status: 'DISABLED'
})

watch(addUpdateModalFormState, (n, o) => {
    // console.log(n);
})

const addUpdateModalFormRules = reactive({
    name: [
        {
            required: true,
            message: '请输入名称！',
        },
    ],
    dictType: [
        {
            required: true,
            message: '请输入类型！',
        },
    ]
})

const { resetFields: addUpdateModalResetFields, validate: addUpdateModalValidate, validateInfos: addUpdateModalValidateInfos } = useForm(
    addUpdateModalFormState,
    addUpdateModalFormRules,
)
const onAddUpdateModalFormFinish = async (values: any) => {
    
    addUpdateModalLoadingRef.value = true

    // rules chenck
    try {
        await addUpdateModalValidate()
    } catch (err: ValidateErrorEntity<any>) {
        // message.error(err.errorFields[0].errors[0]) 
        addUpdateModalLoadingRef.value = false
        return
    }

    // submit form
    try {
        switch (modalTypeRef.value) {
            case 'ADD': 
                await Api.addDictionary(
                    {
                        ...addUpdateModalFormState
                    }
                )
                break

            case 'UPDATE': {
                await Api.eidtDictionary(
                    {
                        ...addUpdateModalFormState
                    }
                )
                break
            }
            default: {
                message.error("无效的操作类型")
                return
            }
        }
    } catch(err: any) {
        addUpdateModalLoadingRef.value = false
        return
    }
    
    addUpdateModalLoadingRef.value = false
    addUpdateModalOpenRef.value = false

    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}
const onAddUpdateModalFormFinishFailed = (errorInfo: any) => {
    message.error(errorInfo)
}

// Load data
onMounted(() => {
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
})
</script>