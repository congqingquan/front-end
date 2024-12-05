<template>

    <!-- Table search -->
    <a-form layout="inline" :model="searchFormState" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_ROLE_PAGE]" >
        <a-form-item>
            <a-input v-model:value="searchFormState.name" placeholder="请输入搜索名称">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
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
        <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
            @confirm="handelTableRecordRowDelete(selectedTableRecordRowKeys)" @cancel="" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_ROLE_DELETE]">
            <a-button type="primary" html-type="submit" danger>批量删除</a-button>
        </a-popconfirm>

        <a-button type="primary" html-type="submit" @click="showAddUpdateModal('ADD')" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_ROLE_ADD]">新增</a-button>
    </a-space>

    <!-- Table page -->
    <a-table style="margin: 5px 0;" rowKey="roleId"
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
            <template v-if="column.key === 'status'">
                {{ Constants.STATUS_MAPPING[record.status] ?? '' }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a-button type="link" @click="showAddUpdateModal('UPDATE', record as SysRolePageVO)" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_ROLE_EDIT]">修改</a-button>
                    <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
                        @confirm="handelTableRecordRowDelete([record.roleId])" @cancel="" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_ROLE_DELETE]">
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
            <a-form-item label="业务主键" name="roleId" hidden>
                <a-input v-model:value="addUpdateModalFormState.roleId" />
            </a-form-item>
            <a-form-item label="名称" name="name" v-bind="addUpdateModalValidateInfos.name">
                <a-input v-model:value="addUpdateModalFormState.name" />
            </a-form-item>
            <a-form-item label="描述" name="description">
                <a-textarea v-model:value="addUpdateModalFormState.description" show-count :maxlength="100" />
            </a-form-item>

            <a-form-item label="菜单资源" name="menuResources">
                <a-tree-select
                    v-model:value="addUpdateModalFormState.menuResources"
                    show-search
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择菜单资源"
                    allow-clear
                    multiple
                    tree-checkable
                    treeCheckStrictly
                    showCheckedStrategy="SHOW_ALL"
                    tree-default-expand-all
                    :tree-data="modalTreeData"
                    tree-node-filter-prop="label"
                    style="width: 500px"
                >
                    <template #title="{ value: val, label, type }">
                        {{ label }} 
                        <b style="color: #a6a6a6">
                            {{ '  <  ' }} 
                            {{ 
                                type === 'MENU_DIC' ? '目录' : 
                                    type === 'MENU' ? '菜单' : 
                                        type === 'MENU_BUTTON' ? '按钮' : '未知'
                            }}
                        </b>
                    </template>
                </a-tree-select>
            </a-form-item>

            <a-form-item label="接口资源" name="apiResources" >
                <a-select
                    v-model:value="addUpdateModalFormState.apiResources"
                    :options="modalApiOptionData"
                    mode="multiple"
                    style="width: 500px"
                ></a-select>
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
import SysApiGroupByTypeVO from '@/api/vo/SysApiGroupByTypeVO';
import SysRolePageVO from '@/api/vo/SysRolePageVO';
import Constants from '@/common/Constants';
import { clearStores, initStores } from '@/store';
import { useSysMenuTreeStore } from '@/store/modules/SysMenuTree';
import { MenuButtonIdentifier, useSysUserResourcesStore } from '@/store/modules/SysUserResources';
import ArrayUtils from '@/util/ArrayUtils';
import TreeUtils from '@/util/TreeUtils';
import Icon, { DeleteOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Form, FormProps, message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { ColumnType } from 'ant-design-vue/es/table';
import { h, onMounted, reactive, ref, watch } from 'vue';

const useForm = Form.useForm
// Table Search
interface SearchFormState {
    name: string
}
const searchFormState = ref<SearchFormState>({
    name: '',
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
const onSelectTableRecordRowChange = (keys: Key[], rows: SysRolePageVO[]) => {
    selectedTableRecordRowKeys.value = keys
}

// Table - column
const columns: ColumnType[] = [
    {
        title: '业务主键',
        dataIndex: 'roleId',
        key: 'roleId',
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
        title: '描述',
        key: 'description',
        dataIndex: 'description',
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
const tableDataRef = ref<SysRolePageVO[]>([])
const currentRef = ref(1)
const pageSizeRef = ref(10)
const totalRef = ref(0)
const pageSizeOptionsRef = ref<string[]>(['10', '20', '30', '40', '50'])
const loadTableData = async (formState: SearchFormState, current: number, pageSize: number) => {
    const response = await Api.sysRolePage({
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
const handelTableRecordRowDelete = async (ids: Key[]) => {
    if (ArrayUtils.isEmpty(ids)) {
        return
    }
    await Api.deleteSysRole(ids.map(id => id.toString()))
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)

    // refresh stores
    await clearStores([ 'SysUserMenuTree', 'SysUserResources' ])
    await initStores([ 'SysUserMenuTree', 'SysUserResources' ])
}

// Table add / update modal
type ModalType = 'ADD' | 'UPDATE'
const modalTypeRef = ref<ModalType>()
const addUpdateModalLoadingRef = ref<boolean>(false)
const addUpdateModalOpenRef = ref<boolean>(false)
const showAddUpdateModal = (type: ModalType, record?: SysRolePageVO) => {
    modalTypeRef.value = type
    addUpdateModalOpenRef.value = true
    if (record) {
        Object.assign(addUpdateModalFormState, {
            ...record,
            menuResources: record.menuResources?.map(menu => { 
                return {label: menu.name, value: menu.resourceId}
            }),
            apiResources: record.apiResources?.map(api => api.resourceId)
        })
    }
}
const hideAddUpdateModal = () => {
    addUpdateModalOpenRef.value = false
    addUpdateModalResetFields()
}

// option field: menu tree / apis
// menu tree
const { menuButtonsMap } = useSysUserResourcesStore()
const { allTree } = useSysMenuTreeStore()
const modalTreeData = TreeUtils.convertNode(
    allTree, 
    node => {
        return {
            key: node.resourceId,
            label: node.label,
            value: node.resourceId,
            type: node.type,
            children: node.children
        }
    },
    node => node.children,
    node => node.children = []
)

// apis
interface ModalApiResource {
    key: string,
    label: string
    value: string
    options?: ModalApiResource[]
}
const modalApiOptionData = ref<ModalApiResource[]>([])
const loadModalApiOptionData = async () => {
    const response = await Api.sysApiGroupByType()
    const responseData: SysApiGroupByTypeVO[]  = response.data.data
    
    if (ArrayUtils.isEmpty(responseData)) {
        return
    }

    modalApiOptionData.value = responseData.map(sysApiGroupByType => {
        return {
            key: sysApiGroupByType.type,
            label: sysApiGroupByType.type,
            value: '',
            options: sysApiGroupByType.items.map(item => {
                return {
                    key: item.resourceId,
                    label: item.name,
                    value: item.resourceId
                }
            })
        }
    })
}

// Table add / update modal form
interface SysRoleModalFormState {
    roleId: string,
    name: string,
    description: string,
    status: string,
    // treeCheckStrictly 为 true 时，要把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 {value: string, label: VNode, halfChecked(): string[] } 的格式
    menuResources: { label: string, value: string | number }[]
    apiResources: string[]
}
const addUpdateModalFormState = reactive<SysRoleModalFormState>({
    roleId: '',
    name: '',
    description: '',
    status: 'DISABLED',
    menuResources: [],
    apiResources: []
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
                await Api.addSysRole(
                    {
                        ...addUpdateModalFormState,
                        menuResources: addUpdateModalFormState.menuResources?.map(menuResource => menuResource.value.toString()),
                        apiResources: addUpdateModalFormState.apiResources?.map(apiResourceId => apiResourceId)
                    }
                )
                break

            case 'UPDATE': {
                await Api.eidtSysRole(
                    {
                        ...addUpdateModalFormState,
                        menuResources: addUpdateModalFormState.menuResources?.map(menuResource => menuResource.value.toString()),
                        apiResources: addUpdateModalFormState.apiResources
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

    // refresh stores
    await clearStores([ 'SysUserMenuTree', 'SysUserResources' ])
    await initStores([ 'SysUserMenuTree', 'SysUserResources' ])
}
const onAddUpdateModalFormFinishFailed = (errorInfo: any) => {
    message.error(errorInfo)
}

// Load data
onMounted(() => {
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
    loadModalApiOptionData()
})
</script>