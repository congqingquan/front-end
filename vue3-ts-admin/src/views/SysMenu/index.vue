<template>

    <!-- Table search -->
    <a-form layout="inline" :model="searchFormState" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_MENU_PAGE]">
        <a-form-item>
            <a-input v-model:value="searchFormState.keyword" placeholder="请输入搜索关键字">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
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

    <!-- Table add btn -->
    <a-space style="margin: 15px 0 5px 0;">
        <a-button type="primary" html-type="submit" @click="showAddUpdateModal('ADD')"
            v-if="menuButtonsMap[MenuButtonIdentifier.BTN_MENU_ADD]">新增</a-button>
    </a-space>

    <!-- Table page -->
    <a-table style="margin: 5px 0;" rowKey="menuId"
        :columns="columns" :data-source="tableDataRef" :scroll="{ x: 700 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'icon'">
                <Icon v-if="Constants.ALL_ICONS[record.icon]" style="margin: 0" :component='h(Constants.ALL_ICONS[record.icon])' />
            </template>
            <template v-if="column.key === 'type'">
                {{ Constants.MENU_TYPE_MAPPING[record.type] ?? '' }}
            </template>
            <template v-else-if="column.key === 'status'">
                {{ Constants.STATUS_MAPPING[record.status] ?? '' }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a-button type="link" @click="showAddUpdateModal('ADD', { menuId: record.menuId } as SysMenuTreeVO)"
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_MENU_ADD]">新增</a-button>
                    <a-button type="link" @click="showAddUpdateModal('UPDATE', record as SysMenuTreeVO)"
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_MENU_EDIT]">修改</a-button>
                    <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
                        @confirm="handelTableRecordRowDelete(record as SysMenuTreeVO)" @cancel=""
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_MENU_DELETE]">
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
            <a-form-item label="业务主键" name="menuId" hidden>
                <a-input v-model:value="addUpdateModalFormState.menuId" />
            </a-form-item>
            <a-form-item label="父级节点" name="parentId" v-bind="addUpdateModalValidateInfos.parentId">
                <a-tree-select
                    v-model:value="addUpdateModalFormState.parentId"
                    show-search
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择父级节点"
                    allow-clear
                    :tree-data="modalTreeData"
                    tree-node-filter-prop="label"
                    style="width: 500px"
                >
                    <template #title="{ value: val, label, type }">
                        <div v-if="val">
                            {{ label }} 
                            <b style="color: #a6a6a6">
                                {{ '  <  ' }} 
                                {{ 
                                    type === 'MENU_DIC' ? '目录' : 
                                        type === 'MENU' ? '菜单' : 
                                            type === 'MENU_BUTTON' ? '按钮' : '未知'
                                }}
                            </b>
                        </div>
                    </template>
                </a-tree-select>
            </a-form-item>
            <a-form-item label="名称" name="name" v-bind="addUpdateModalValidateInfos.name">
                <a-input v-model:value="addUpdateModalFormState.name" placeholder="请输入名称"/>
            </a-form-item>
            <a-form-item label="标识符" name="identifier" v-bind="addUpdateModalValidateInfos.identifier">
                <a-input v-model:value="addUpdateModalFormState.identifier" />
            </a-form-item>
            <a-form-item label="页面组件" name="password" v-bind="addUpdateModalValidateInfos.component">
                <a-input v-model:value="addUpdateModalFormState.component" placeholder="请输入页面组件"/>
            </a-form-item>
            <a-form-item label="icon" name="icon">
                <a-select
                    style="width: 100%"
                    placeholder="请选择 icon"
                    :value="addUpdateModalFormState.icon"
                    :options="iconOptions"
                    @change="(value: any) => addUpdateModalFormState.icon = value"
                ></a-select>
            </a-form-item>
            <a-form-item label="路径" name="url">
                <a-input v-model:value="addUpdateModalFormState.url" placeholder="请输入路径" />
            </a-form-item>
            <a-form-item label="排序" name="sort">
                <a-input v-model:value="addUpdateModalFormState.sort" placeholder="请输入排序" />
            </a-form-item>
            <a-form-item label="类型" name="type">
                <a-select
                    v-model:value="addUpdateModalFormState.type"
                    style="width: 120px"
                    allowClear
                    placeholder="请选择类型"
                    :options="menuTypeOptions"
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
import SysMenuTreeVO from '@/api/vo/SysMenuTreeVO';
import Constants from '@/common/Constants';
import { matchViewComponent } from '@/components/ViewPageManager';
import router from '@/router';
import { clearStores, initStores } from '@/store';
import { MenuButtonIdentifier, useSysUserResourcesStore } from '@/store/modules/SysUserResources';
import TreeUtils from '@/util/TreeUtils';
import Icon, { DeleteOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Form, FormProps, message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { ColumnType } from 'ant-design-vue/es/table';
import { SelectProps } from 'ant-design-vue/es/vc-select';
import { h, onMounted, reactive, ref, } from 'vue';

const useForm = Form.useForm;
const { menuButtonsMap } = useSysUserResourcesStore()

// Table Search
interface SearchFormState {
    keyword: string
}
const searchFormState = ref<SearchFormState>({
    keyword: ''
})
const { resetFields: searchFormStateResetFields } = useForm(
    searchFormState
)

const handleSearchFormFinish: FormProps['onFinish'] = values => {
    loadTableData(searchFormState.value)
}
const handleSearchFormFinishFailed: FormProps['onFinishFailed'] = errors => {
    message.error(errors.values)
}

// Table - column
const columns: ColumnType[] = [
    {
        title: '业务主键',
        dataIndex: 'menuId',
        key: 'menuId',
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
        title: '页面组件',
        key: 'component',
        dataIndex: 'component',
        width: 70,
        align: 'center',
    },
    {
        title: 'icon',
        key: 'icon',
        dataIndex: 'icon',
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
        title: '排序',
        key: 'sort',
        dataIndex: 'sort',
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

// Table - data
const tableDataRef = ref<SysMenuTreeVO[]>([])
const loadTableData = async (formState: SearchFormState) => {
    const response = await Api.sysMenuTree({
        ...formState,
        type: 'ALL',
        menuTypes: ['MENU_DIC', 'MENU', 'MENU_BUTTON']
    })
    const responseData = response.data.data
    tableDataRef.value = responseData
}

// Table - delete
const handelTableRecordRowDelete = async (record: SysMenuTreeVO) => {
    if (!record) {
        return
    }
    await Api.deleteSysMenu(record.menuId)
    loadTableData(searchFormState.value)
    loadModalTreeData()

    // remove route
    router.removeRoute(record.name)

    // refresh stores
    await clearStores([ 'SysMenuTree', 'SysUserMenuTree', 'SysUserResources' ])
    await initStores([ 'SysMenuTree', 'SysUserMenuTree', 'SysUserResources' ])
}

// Table add / update modal
type ModalType = 'ADD' | 'UPDATE'
const modalTypeRef = ref<ModalType>()
const addUpdateModalLoadingRef = ref<boolean>(false)
const addUpdateModalOpenRef = ref<boolean>(false)
const iconOptions: SelectProps['options'] = Object.keys(Constants.ALL_ICONS).map(key => {
    return {
        label: h(
            'span', 
            { style: {   } },
            [
                h(
                    Icon, 
                    { 
                        style: { position: 'relative', top: '-2px' },
                        component: h(Constants.ALL_ICONS[key]),
                    }
                ),
                h('span', { style: {margin: '15px 0 0 5px'} }, key)
            ]
        ),
        value: key
    }
})

const menuTypeOptions: SelectProps['options'] = Object.keys(Constants.MENU_TYPE_MAPPING).map(key => {
    return {
        label: Constants.MENU_TYPE_MAPPING[key],
        value: key
    }
})

const modalTreeData = ref<any[]>([])
const loadModalTreeData = async () => {
    const response = await Api.sysMenuTree({
        type: 'ALL',
        menuTypes: ['MENU_DIC', 'MENU']
    })
    const responseData = response.data.data
    modalTreeData.value = TreeUtils.convertNode(
        responseData, 
        node => {
            return {
                key: node.menuId,
                label: node.name,
                value: node.menuId,
                type: node.type,
                children: node.children,
                // 避免循环引用，禁止设置父节点为自己以及自己的子集
                disabled: node.parentPath?.split(',').find(id => id === addUpdateModalFormState.menuId) ? true : false
            }
        },
        node => node.children,
        node => node.children = []
    )
}

const showAddUpdateModal = async (type: ModalType, record?: SysMenuTreeVO) => {
    modalTypeRef.value = type
    addUpdateModalOpenRef.value = true
    if (record) {
        // 行内新增时父主键默认为自身
        if (type === 'ADD') {
            addUpdateModalFormState.parentId = record.menuId
        } else {
            Object.assign(addUpdateModalFormState, { ...record })
        }
    }
    loadModalTreeData()
}
const hideAddUpdateModal = () => {
    addUpdateModalOpenRef.value = false
    addUpdateModalResetFields()
}


// Table add / update modal form
const addUpdateModalFormState = reactive<Partial<Omit<SysMenuTreeVO, 'updateUser' | 'updateTime'>>>({
    name: undefined,
    type: undefined,
    sort: undefined,
    resourceId: undefined,
    identifier: undefined,
    status: undefined,
    createUser: undefined,
    createTime: undefined as unknown as Date,
    key: undefined,
    menuId: undefined,
    parentId: undefined,
    parentPath: undefined,
    level: undefined,
    component: undefined,
    icon: undefined,
    url: undefined,
    targetType: undefined,
    children: [],
    lable: undefined
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
    type: [
        {
            required: true,
            message: '请选择类型！',
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
                // save data
                await Api.addSysMenu({ ...addUpdateModalFormState })
                // save route record (新增应该在分配完权限后重置路由表，删除可以在 菜单页更新路由)
                console.log({
                    name: addUpdateModalFormState.name,
                    path: addUpdateModalFormState.url ?? '',
                    component: () => matchViewComponent(addUpdateModalFormState.component ?? '')
                });
                const component = await matchViewComponent(addUpdateModalFormState.component ?? '')
                router.addRoute({
                    name: addUpdateModalFormState.name,
                    path: addUpdateModalFormState.url ?? '',
                    component: () => import("@/views/Test/index.vue")
                })
                console.log(router.getRoutes())
                break

            case 'UPDATE': {
                await Api.eidtSysMenu({ ...addUpdateModalFormState })
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

    // refresh table data
    addUpdateModalLoadingRef.value = false
    addUpdateModalOpenRef.value = false
    await loadTableData(searchFormState.value)
    await loadModalTreeData()

    // refresh store
    await clearStores([ 'SysMenuTree', 'SysUserMenuTree', 'SysUserResources' ])
    await initStores([ 'SysMenuTree', 'SysUserMenuTree', 'SysUserResources' ])
}
const onAddUpdateModalFormFinishFailed = (errorInfo: any) => {
    message.error(errorInfo)
}

// Load data
onMounted(async () => {
    loadTableData(searchFormState.value)
})
</script>