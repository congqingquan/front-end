<template>

    <!-- Table search -->
    <a-form layout="inline" :model="searchFormState" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_API_PAGE]">
        <a-form-item>
            <a-input v-model:value="searchFormState.name" placeholder="请输入搜索名称">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-select
                placeholder="请选择类型"
                v-model:value="searchFormState.type"
                style="width: 120px"
                allowClear
                :options="apiTypeOptions"
            >
            </a-select>
        </a-form-item>
        <a-form-item>
            <a-space>
                <a-tooltip title="搜索">
                    <a-button type="primary" html-type="submit" shape="circle" :icon="h(SearchOutlined)"
                        @click.prevent="handleSearchFormFinish" />
                </a-tooltip>
                <a-tooltip title="清除搜索内容">
                    <a-button shape="circle" :icon="h(DeleteOutlined)" @click="searchFormStateResetFields"></a-button>
                </a-tooltip>
            </a-space>
        </a-form-item>
    </a-form>

    <!-- Table add btn / batch delete btn -->
    <a-space style="margin: 15px 0 5px 0;">
        <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
            @confirm="handelTableRecordRowDelete(selectedTableRecordRowKeys)" @cancel=""
            v-if="menuButtonsMap[MenuButtonIdentifier.BTN_API_DELETE]">
            <a-button type="primary" html-type="submit" danger>批量删除</a-button>
        </a-popconfirm>

        <a-button type="primary" html-type="submit" @click="showAddUpdateModal('ADD')"
            v-if="menuButtonsMap[MenuButtonIdentifier.BTN_API_ADD]">新增</a-button>
    </a-space>

    <!-- Table page -->
    <a-table style="margin: 5px 0;" rowKey="apiId"
        :row-selection="{ selectedRowKeys: selectedTableRecordRowKeys, onChange: onSelectTableRecordRowChange }"
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
            <template v-if="column.key === 'type'">
                {{ Constants.API_TYPE_MAPPING[record.type] ?? '' }}
            </template>
            <template v-else-if="column.key === 'status'">
                {{ Constants.STATUS_MAPPING[record.status] ?? '' }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a-button type="link" @click="showAddUpdateModal('UPDATE', record as SysApiPageVO)"
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_API_EDIT]">修改</a-button>
                    <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
                        @confirm="handelTableRecordRowDelete([record.userId])" @cancel=""
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_API_DELETE]">
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
        <a-form name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish-failed="onAddUpdateModalFormFinishFailed">
            <a-form-item label="业务主键" name="apiId" hidden>
                <a-input v-model:value="addUpdateModalFormState.apiId" />
            </a-form-item>
            <a-form-item label="名称" name="name" v-bind="addUpdateModalValidateInfos.name">
                <a-input v-model:value="addUpdateModalFormState.name" />
            </a-form-item>
            <a-form-item label="标识符" name="identifier" v-bind="addUpdateModalValidateInfos.identifier">
                <a-input v-model:value="addUpdateModalFormState.identifier" />
            </a-form-item>
            <a-form-item label="路径" name="url" v-bind="addUpdateModalValidateInfos.url">
                <a-input v-model:value="addUpdateModalFormState.url" />
            </a-form-item>
            <a-form-item label="请求方式" name="method" v-bind="addUpdateModalValidateInfos.method">
                <a-select
                    placeholder="请选择类型"
                    v-model:value="addUpdateModalFormState.method"
                    style="width: 120px"
                    allowClear
                    :options="apiMethodOptions"
                >
                </a-select>
            </a-form-item>
            <a-form-item label="类型" name="type" v-bind="addUpdateModalValidateInfos.type">
                <a-select
                    placeholder="请选择类型"
                    v-model:value="addUpdateModalFormState.type"
                    style="width: 120px"
                    allowClear
                    :options="apiTypeOptions"
                >
                </a-select>
            </a-form-item>
            <a-form-item label="状态" name="status">
                <a-switch v-model:checked="addUpdateModalFormState.status" checkedValue="NORMAL"
                    unCheckedValue="DISABLED" />
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button @click="hideAddUpdateModal">取消</a-button>
            <a-button type="primary" :loading="addUpdateModalLoadingRef" @click.prevent="onAddUpdateModalFormFinish">
                提交
            </a-button>
        </template>
    </a-modal>
</template>
<script lang="ts" setup>
import Api from '@/api/Api';
import SysApiPageVO from '@/api/vo/SysApiPageVO';
import SysApiViewVO from '@/api/vo/SysApiViewVO';
import Constants from '@/common/Constants';
import ArrayUtils from '@/util/ArrayUtils';
import { DeleteOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Form, FormProps, message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { SelectProps } from 'ant-design-vue/es/select';
import { ColumnType } from 'ant-design-vue/es/table';
import { h, inject, onMounted, reactive, ref, } from 'vue';
import { ProviderKeys } from '@/di/ProviderKeys';
import { sysUserResourcesProvider as $sysUserResourcesProvider, MenuButtonIdentifier, SysUserResourcesProvider } from '@/di/SysUserResourcesProvider';

// ========================================= 注入全局资源 =========================================
const sysUserResourcesProvider = inject<SysUserResourcesProvider>(ProviderKeys.SYS_USER_RESOURCES, $sysUserResourcesProvider)
const menuButtonsMap = sysUserResourcesProvider.data.menuButtonsMap.value

// Table Search
const useForm = Form.useForm;

interface SearchFormState {
    name: string
    type: string
}
const searchFormState = ref<SearchFormState>({
    name: '',
    type: '',
})
const apiTypeOptions: SelectProps['options'] = Object.keys(Constants.API_TYPE_MAPPING).map(key => {
    return {
        label: Constants.API_TYPE_MAPPING[key],
        value: key
    }
})
const apiMethodOptions: SelectProps['options'] = Constants.HTTP_METHOD.map(method => {
    return {
        label: method,
        value: method
    }
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

// Table - selectedTableRecordRow
const selectedTableRecordRowKeys = ref<Key[]>([])
const onSelectTableRecordRowChange = (keys: Key[], rows: SysApiPageVO[]) => {
    selectedTableRecordRowKeys.value = keys
}

// Table - column
const columns: ColumnType[] = [
    {
        title: '业务主键',
        dataIndex: 'apiId',
        key: 'apiId',
        width: 70,
        align: 'center',
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 70,
        align: 'center',
    },
    {
        title: '标识符',
        dataIndex: 'identifier',
        key: 'name',
        width: 70,
        align: 'center',
    },
    {
        title: '路径',
        key: 'url',
        dataIndex: 'url',
        width: 70,
        align: 'center',
    },
    {
        title: '请求方式',
        key: 'method',
        dataIndex: 'method',
        width: 70,
        align: 'center',
    },
    {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
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
const tableDataRef = ref<SysApiPageVO[]>([])
const currentRef = ref(1)
const pageSizeRef = ref(10)
const totalRef = ref(0)
const pageSizeOptionsRef = ref<string[]>(['10', '20', '30', '40', '50'])
const loadTableData = async (formState: SearchFormState, current: number, pageSize: number) => {
    const response = await Api.sysApiPage({
        pageNo: current,
        pageSize: pageSize,
        ...formState
    })
    const pageData = response.data.data
    currentRef.value = pageData.current
    pageSizeRef.value = pageData.size
    totalRef.value = pageData.total
    tableDataRef.value = pageData.records
}

// Table - delete
const handelTableRecordRowDelete = async (ids: Key[]) => {
    if (ArrayUtils.isEmpty(ids)) {
        return
    }
    await Api.deleteSysApi(ids.map(id => id.toString()))
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}

// Table add / update modal
type ModalType = 'ADD' | 'UPDATE'
const modalTypeRef = ref<ModalType>()
const addUpdateModalLoadingRef = ref<boolean>(false)
const addUpdateModalOpenRef = ref<boolean>(false)
const showAddUpdateModal = (type: ModalType, record?: SysApiPageVO) => {
    modalTypeRef.value = type
    addUpdateModalOpenRef.value = true
    if (record) {
        Object.assign(addUpdateModalFormState, { ...record })
    }
}
const hideAddUpdateModal = () => {
    addUpdateModalOpenRef.value = false
    addUpdateModalResetFields()
}

// Table add / update modal form
const addUpdateModalFormState = reactive<Omit<SysApiViewVO, 'updateTime' | 'updateUser' | 'createUser'>>({
    apiId: '',
    resourceId: '',
    name: '',
    url: '',
    method: '',
    type: '',
    createTime: null as unknown as Date,
    status: '',
    identifier: ''
})
const addUpdateModalFormRules = reactive({
    name: [
        {
            required: true,
            message: '请输入名称！',
        },
    ],
    identifier: [
        {
            required: true,
            message: '请输入标识符！',
        },
    ],
    url: [
        {
            required: true,
            message: '请输入路径！',
        },
    ],
    method: [
        {
            required: true,
            message: '请选择请求方式！',
        },
    ],
})

const { 
    resetFields: addUpdateModalResetFields,
    validate: addUpdateModalValidate,
    validateInfos: addUpdateModalValidateInfos
} = useForm(
    addUpdateModalFormState,
    addUpdateModalFormRules,
    {
        onValidate: (...args) => { },
    }
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
                await Api.addSysApi(addUpdateModalFormState)
                break

            case 'UPDATE': {
                await Api.eidtSysApi(addUpdateModalFormState)
                break
            }
            default: {
                message.error("无效的操作类型")
                return
            }
        }
    } catch (err: any) {
        addUpdateModalLoadingRef.value = false
        return
    }

    addUpdateModalLoadingRef.value = false
    addUpdateModalOpenRef.value = false
    await loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}
const onAddUpdateModalFormFinishFailed = (errorInfo: any) => {
    message.error(errorInfo)
}

// Load data
onMounted(async () => {
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
})
</script>