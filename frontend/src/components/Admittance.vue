<template>
<div class="Admittance margin">
    <img src="@/assets/images/logo.png">
    <h3>{{ msg }}</h3>

    <el-row type="flex" class="row-bg" :gutter="20">
        <el-col :span="12">
            <span @click="loginSubmit">
                <el-button type="text" abled>登陆</el-button>
            </span>
        </el-col>
        <el-col :span="12">
            <span @click="logonSubmit">
                <el-button type="text" abled>注册</el-button>
            </span>
        </el-col>
    </el-row>
</div>

</template>

<script>
export default {
    data() {
        return {
            msg: "欢迎进入：权限管理系统"
        };
    },
    methods: {
        loginSubmit(event) {
            this.$router.push({ path: '/login' });
        },
        logonSubmit(event) {
            this.$router.push({ path: '/logon' });
        },
    }
}
</script>


<style lang="scss" scoped>
.margin {
    width: 300px;
    height: 300px;
    position:absolute;
    left:50%;
    top:30%;
    margin-left:-100px;
    margin-top:-100px;
}
</style>
