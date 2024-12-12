<template>

    <!-- Table search -->
    <a-form layout="inline" :model="searchFormState" v-if="menuButtonsMap[MenuButtonIdentifier.BTN_USER_PAGE]">
        <a-form-item>
            <a-input v-model:value="searchFormState.name" placeholder="请输入搜索名称">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-model:value="searchFormState.email" placeholder="请输入搜索邮箱">
                <template #prefix>
                    <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
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

    <!-- Table add btn / batch delete btn -->
    <a-space style="margin: 15px 0 5px 0;">
        <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
            @confirm="handelTableRecordRowDelete(selectedTableRecordRowKeys)" @cancel=""
            v-if="menuButtonsMap[MenuButtonIdentifier.BTN_USER_DELETE]">
            <a-button type="primary" html-type="submit" danger>批量删除</a-button>
        </a-popconfirm>

        <a-button type="primary" html-type="submit" @click="showAddUpdateModal('ADD')"
            v-if="menuButtonsMap[MenuButtonIdentifier.BTN_USER_ADD]">新增</a-button>
    </a-space>

    <!-- Table page -->
    <a-table style="margin: 5px 0;" rowKey="userId"
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
            <template v-if="column.key === 'gender'">
                {{ Constants.GENDER_MAPPING[record.gender] ?? '' }}
            </template>
            <template v-else-if="column.key === 'roles'">
                {{ record.roles.map((role: SysRoleViewVO) => role.name).join(", ") }}
            </template>
            <template v-else-if="column.key === 'status'">
                {{ Constants.STATUS_MAPPING[record.status] ?? '' }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a-button type="link" @click="showAddUpdateModal('UPDATE', record as SysUserPageVO)"
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_USER_EDIT]">修改</a-button>
                    <a-popconfirm title="是否要删除?" ok-text="确定" ok-type="danger" cancel-text="取消"
                        @confirm="handelTableRecordRowDelete([record.userId])" @cancel=""
                        v-if="menuButtonsMap[MenuButtonIdentifier.BTN_USER_DELETE]">
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
            <a-form-item label="业务主键" name="userId" hidden>
                <a-input v-model:value="addUpdateModalFormState.userId" />
            </a-form-item>
            <a-form-item label="用户名" name="username" v-bind="addUpdateModalValidateInfos.username">
                <a-input v-model:value="addUpdateModalFormState.username" />
            </a-form-item>
            <a-form-item label="密码" name="password" v-bind="addUpdateModalValidateInfos.password">
                <a-input-password v-model:value="addUpdateModalFormState.password"></a-input-password>
            </a-form-item>
            <a-form-item label="名称" name="name" v-bind="addUpdateModalValidateInfos.name">
                <a-input v-model:value="addUpdateModalFormState.name" />
            </a-form-item>
            <a-form-item label="性别" name="gender" v-bind="addUpdateModalValidateInfos.gender">
                <a-radio-group v-model:value="addUpdateModalFormState.gender">
                    <a-radio value="MAN">{{ Constants.GENDER_MAPPING['MAN'] }}</a-radio>
                    <a-radio value="WOMAN">{{ Constants.GENDER_MAPPING['WOMAN'] }}</a-radio>
                    <a-radio value="UNKNOWN">{{ Constants.GENDER_MAPPING['UNKNOWN'] }}</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="addUpdateModalFormState.email" />
            </a-form-item>
            <a-form-item label="头像" name="avatar">
                <!-- 
                <a-upload
                    v-model:file-list="addUpdateModalFormState.avatar"
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload> 
                -->
                <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                    <div>
                        <LoadingOutlined v-if="false"></LoadingOutlined>
                        <PlusOutlined v-else></PlusOutlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-form-item>
            <a-form-item label="角色" name="roles">
                <a-select v-model:value="addUpdateModalFormState.roleIds" :options="roleOptions" mode="tags"
                    placeholder="请选择角色" style="width: 200px">
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
import SysRoleAddDTO from '@/api/dto/SysRoleAddDTO';
import SysRoleViewVO from '@/api/vo/SysRoleViewVO';
import SysUserPageVO from '@/api/vo/SysUserPageVO';
import SysUserViewVO from '@/api/vo/SysUserViewVO';
import Constants from '@/common/Constants';
import ArrayUtils from '@/util/ArrayUtils';
import { DeleteOutlined, LoadingOutlined, MailOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Form, FormProps, message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { DefaultOptionType } from 'ant-design-vue/es/select';
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
    email: string
}
const searchFormState = ref<SearchFormState>({
    name: '',
    email: '',
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
const onSelectTableRecordRowChange = (keys: Key[], rows: SysUserPageVO[]) => {
    selectedTableRecordRowKeys.value = keys
}

// Table - column
const columns: ColumnType[] = [
    {
        title: '业务主键',
        dataIndex: 'userId',
        key: 'userId',
        width: 70,
        align: 'center',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
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
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
        width: 70,
        align: 'center',
    },
    {
        title: '角色',
        key: 'roles',
        dataIndex: 'roles',
        width: 70,
        align: 'center',
    },
    {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
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
const tableDataRef = ref<SysUserPageVO[]>([])
const currentRef = ref(1)
const pageSizeRef = ref(10)
const totalRef = ref(0)
const pageSizeOptionsRef = ref<string[]>(['10', '20', '30', '40', '50'])
const loadTableData = async (formState: SearchFormState, current: number, pageSize: number) => {
    const response = await Api.sysUserPage({
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
    await Api.deleteSysUser(ids.map(id => id.toString()))
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
}

// Table add / update modal
type ModalType = 'ADD' | 'UPDATE'
const modalTypeRef = ref<ModalType>()
const addUpdateModalLoadingRef = ref<boolean>(false)
const addUpdateModalOpenRef = ref<boolean>(false)
const showAddUpdateModal = (type: ModalType, record?: SysUserPageVO) => {
    modalTypeRef.value = type
    addUpdateModalOpenRef.value = true
    if (record) {
        Object.assign(addUpdateModalFormState, { ...record, roleIds: record.roles?.map(role => role.roleId) })
    }
}
const hideAddUpdateModal = () => {
    addUpdateModalOpenRef.value = false
    addUpdateModalResetFields()
}

// Table add / update modal form
const addUpdateModalFormState = reactive<SysUserViewVO & { roleIds?: string[] }>({
    userId: '',
    username: '',
    password: '',
    name: '',
    gender: '',
    email: '',
    avatar: '',
    status: 'DISABLED',
    roles: [],
    roleIds: []
})
const addUpdateModalFormRules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名！',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码！',
        },
    ],
    name: [
        {
            required: true,
            message: '请输入名称！',
        },
    ],
    gender: [
        {
            required: true,
            message: '请选择性别！',
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
                await Api.addSysUser(
                    {
                        ...addUpdateModalFormState,
                        roles: addUpdateModalFormState.roleIds?.map(roleId => { return { roleId } as unknown as SysRoleAddDTO })
                    }
                )
                break

            case 'UPDATE': {
                await Api.eidtSysUser(
                    {
                        ...addUpdateModalFormState,
                        roles: addUpdateModalFormState.roleIds?.map(roleId => { return { roleId } as unknown as SysRoleAddDTO })
                    }
                )
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

const loadRoleOptionsData = async () => {
    const rolePageResponse = await Api.sysRolePage({ pageNo: 1, pageSize: -1 })
    const rolePageResponseData = rolePageResponse.data.data
    roleOptions.value = rolePageResponseData.records.map(record => {
        return {
            label: record.name,
            value: record.roleId
        }
    })
}

// Load data
// 1. 加载数据要放到生命周期函数中
// 2. 生命周期函数中调用封装好的抓取数据函数，而不是直接编写抓取代码。
//    否则当接口返回如：401、403 时会进行路由跳转，导致 vue 抛出警告：Unhandled error during execution of mounted hook。
//    但，调用封装好的抓取函数不都是一样的执行逻辑吗？不懂。
const roleOptions = ref<DefaultOptionType[]>()
onMounted(async () => {
    loadTableData(searchFormState.value, currentRef.value, pageSizeRef.value)
    loadRoleOptionsData()
})
</script>