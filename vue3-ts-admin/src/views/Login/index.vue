<template>
    <div class="login-page">
        <div class="container">
            <div ref="topCardBox" class="top-card">
                <div class="top-card-title">你好~</div>
                <div class="top-card-content">请登录或注册新账号，以使用网站的所有功能</div>
                <button ref="topCardBtn" class="top-card-button" @click="handleTopCardClick(!isToLogin)">注册</button>
            </div>

            <div ref="leftCardBox" class="left-card">
                <a-form name="loginForm" 
                        :model="loginForm" 
                        :labelCol="{span: 9, offset: 0}"
                        autocomplete="off" 
                        @finish="handleSubmitLoginForm"
                >
                    <a-form-item label="Username" name="username"
                        :rules="[{ required: true, message: 'Please input your username' }]">
                        <a-input :style="{width: '200px', height: '35px'}" v-model:value="loginForm.username">
                            <template #suffix>
                                <UserOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="Password" name="password"
                        :rules="[{ required: true, message: 'Please input your password' }]">
                        <a-input-password :style="{width: '200px', height: '35px'}" v-model:value="loginForm.password" />
                    </a-form-item>

                    <button>登陆</button>
                </a-form>
            </div>

            <div ref="rightCardBox" class="right-card">
                <a-form  
                    name="registerFrom" 
                    :model="registerForm"
                    :labelCol="{span: 9, offset: 0}"
                    autocomplete="off" 
                    @finish="handleSubmitRegisterForm" 
                 >
                    <div class="title">注册账户</div>
                    <a-form-item label="Username" name="username"
                        :rules="[{ required: true, message: 'Please input your username' }]">
                        <a-input :style="{width: '200px', height: '35px'}" v-model:value="registerForm.username">
                            <template #suffix>
                                <UserOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="Password" name="password"
                        :rules="[{ required: true, message: 'Please input your password' }]">
                        <a-input-password :style="{width: '200px', height: '35px'}" v-model:value="registerForm.password" />
                    </a-form-item>

                    <a-form-item label="Email" name="email" :style="{  position: 'relative', left: '-5px' }">
                        <a-input :style="{width: '200px', height: '35px'}" v-model="registerForm.email" >
                            <template #suffix>
                                <icon icon="weui:email-outlined" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <button>注册</button>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Api from '@/api/Api'
import SysUserLoginDTO from '@/api/dto/SysUserLoginDTO'
import SysUserRegisterDTO from '@/api/dto/SysUserRegisterDTO'
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue';
import { useSysLoginedUserStore } from '@/store/modules/SysLoginedUser';
import { useRouter } from 'vue-router';
import SysMenuTreeVO from '@/api/vo/SysMenuTreeVO'
import { matchViewComponent } from '@/components/ViewPageManager'
import { sysUserMenuTreeProvider } from '@/di/SysUserMenuTreeProvider';
import { sysUserResourcesProvider } from '@/di/SysUserResourcesProvider';
import { sysMenuTreeProvider } from '@/di/SysMenuTreeProvider';


const router = useRouter()

// 处理点击切换登录、注册页
const isToLogin = ref<boolean>(true)
const topCardBtn = ref<HTMLButtonElement>()
const topCardBox = ref<HTMLDivElement | null>(null)
const leftCardBox = ref<HTMLDivElement | null>(null)
const rightCardBox = ref<HTMLDivElement | null>(null)

const handleTopCardClick: (isToLogin: boolean) => void = (isToLoginFlag) => {
    topCardBox.value?.classList.remove("top-card-2-login", "top-card-2-register");
    leftCardBox.value?.classList.remove("left-card-show", "left-card-hidden");
    rightCardBox.value?.classList.remove("right-card-show", "right-card-hidden");
    if (isToLoginFlag) {
        topCardBtn.value!.innerHTML = "注册"
        topCardBox.value!.classList.add("top-card-2-login")
        leftCardBox.value!.classList.add("left-card-show")
        rightCardBox.value!.classList.add("right-card-hidden")
    } else {
        topCardBtn.value!.innerHTML = "登录"
        topCardBox.value!.classList.add("top-card-2-register")
        leftCardBox.value!.classList.add("left-card-hidden")
        rightCardBox.value!.classList.add("right-card-show")
    }
    isToLogin.value = isToLoginFlag
}

// 登录 & 注册表单点击提交
const loginForm = reactive<SysUserLoginDTO>({
    username: "",
    password: "",
})
const registerForm = reactive<SysUserRegisterDTO>({
    username: "",
    password: "",
    email: ""
})

const handleSubmitLoginForm = async () => {
    const response = await Api.sysUserLogin(loginForm);
    if (response.data.code === 0) {
        const apiData = response.data.data
        // 登录用户缓存
        const sysLoginedUserStore = useSysLoginedUserStore()
        sysLoginedUserStore.user = {
            tenantId: apiData.tenantId,
            token: apiData.token,
            info: apiData.info,
            logined: true
        }

        // 刷新全局资源 (Pina 的方式)

        // 全部菜单
        // const sysMenuTreeStore = useSysMenuTreeStore()
        // await sysMenuTreeStore.init()

        // // 用户菜单
        // const sysUserMenuTreeStore = useSysUserMenuTreeStore()
        // await sysUserMenuTreeStore.init()

        // // 资源控制
        // const sysUserResourcesStore = useSysUserResourcesStore()
        // await sysUserResourcesStore.init()

        // // 动态路由
        // const routeMenus: SysMenuTreeVO[] = []
        // Object.values(sysUserMenuTreeStore.menuTreeMap).forEach(menu => {
        //     if (menu.type === 'MENU') {
        //         routeMenus.push(menu)
        //     }
        // })

        // 动态路由
        // const dynamicRoutes = routeMenus.map(routeMenu => {
        //     return {
        //         name: routeMenu.name,
        //         path: routeMenu.url,
        //         component: matchViewComponent(routeMenu.component),
        //         children: [],
        //         meta: {
        //             requireAuth: true
        //         }
        //     }
        // })

        // router.addRoute(
        //     {
        //         name: '主页',
        //         path: '/',
        //         component: () => import("@/views/Main/index.vue"),
        //         children: dynamicRoutes,
        //         meta: {
        //             requireAuth: true
        //         }
        //     }
        // )

        // 刷新全局资源 (全局单次缓存的方式，刷新页面后会更新)

        await sysUserMenuTreeProvider.initData()
        await sysUserResourcesProvider.initData()
        await sysMenuTreeProvider.initData()

        // ============================== 动态路由 ==============================

        const routeMenus: SysMenuTreeVO[] = []
        Object.values(sysUserMenuTreeProvider.data.menuTreeMap.value).forEach(menu => {
            if (menu.type === 'MENU') {
                routeMenus.push(menu)
            }
        })
        const dynamicRoutes = routeMenus.map(routeMenu => {
            return {
                name: routeMenu.name,
                path: routeMenu.url,
                component: matchViewComponent(routeMenu.component),
                children: [],
                meta: {
                    requireAuth: true
                }
            }
        })

        router.addRoute(
            {
                name: '主页',
                path: '/',
                component: () => import("@/views/Main/index.vue"),
                children: dynamicRoutes,
                meta: {
                    requireAuth: true
                }
            }
        )

        const redirectUrl = router.currentRoute.value.query["redirect"] ? router.currentRoute.value.query["redirect"].toString() : '/'
        router.push({ path: redirectUrl })
    }
}
const handleSubmitRegisterForm = async () => {
    message.error("暂不支持")
}

// ==================================== 登录提示 ====================================
onMounted(() => {
    const tip = router.currentRoute.value.query["tip"]
    if (tip) {
        message.error(tip.toString())
    }
})
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    width: 100vw;

    background: linear-gradient(135deg, #c850c0, #4158d0);

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: alimama-font, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        Segoe UI Symbol, "Noto Color Emoji" !important;

    .container {

        // common start

        button {
            // width: 25%;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 8px 20px;
            background-color: #7514ce;
            cursor: pointer;
        }

        input {
            // width: 60%;
            // height: 5%;
            // border: 1px solid gray;
            border-radius: 50px;
            padding: 5px;
            // background: #ffffff;
        }

        .title {
            font-size: 30px;
            font-weight: bold;
        }

        //input::placeholder {
        //  position: relative;
        //  left: 10px;
        //}

        // common end

        width: 60vw;
        height: 70vh;
        display: flex;

        background: #ffffff;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);

        position: absolute;

        .top-card-2-login {
            border-radius: 120px 30px 30px 120px !important;
            transform: translateX(2%) !important;
        }

        .top-card-2-register {
            border-radius: 30px 120px 120px 30px !important;
            transform: translateX(-102%) !important;
        }

        .top-card {
            width: 50%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            transform: translateX(2%);

            color: white;
            border-radius: 120px 30px 30px 120px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .5);
            background: linear-gradient(135deg, #c850c0, #4158d0);

            z-index: 3;

            //animation-name: toRegister;
            //animation-duration: 1s;
            //animation-fill-mode: forwards;
            transition: .5s;
            transition-property: transform, border-radius;

            >* {
                margin: 15px;
            }

            .top-card-title {
                font-weight: bolder;
                font-size: 40px;
                letter-spacing: 3px;
            }

            .top-card-button {
                width: 30%;

                cursor: pointer;
                font-weight: bolder;
                color: white;
                background: none;
                padding: 10px;
                border: 1px solid white;
                border-radius: 50px;
            }
        }

        .left-card-hidden {
            transition: opacity .2s, transform .5s;
            opacity: 0;
            transform: translateX(100%);
            z-index: 0 !important;
        }

        .left-card-show {
            transition: opacity 0s .2s, transform .5s;
            opacity: 1;
            transform: translateX(0);
        }

        .right-card-hidden {
            transition: opacity .2s, transform .5s;
            opacity: 0;
            transform: translateX(-100%) !important;
        }

        .right-card-show {
            transition: opacity 0s .2s, transform .5s;
            opacity: 1 !important;
            transform: translateX(0) !important;
        }

        .left-card {
            width: 50%;
            height: 100%;

            border-radius: 50px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            position: relative;
            z-index: 2;

            form {
                width: 80%;
                height: 90%;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                >* {
                    margin: 10px;
                }
            }
        }

        .right-card {
            width: 50%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            z-index: 1;

            opacity: 0;
            transform: translateX(-100%);

            form {
                width: 80%;
                height: 90%;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                >* {
                    margin: 10px;
                }

                // font-weight: bold;
            }
        }
    }
}
</style>