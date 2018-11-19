<template>
<section>
	<!--工具条-->
	<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		<el-form :inline="true" :model="filters" ref="filters">
			<el-form-item prop="svnKeyword">
				<el-input v-model="filters.svnKeyword" placeholder="svn关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="getSVNPathListPage">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="resetForm('filters')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-col>

	<!--列表-->
	<el-table :data="svnPathList" 
		v-loading="listLoading" 
		@row-dblclick="selectLine"
		highlight-current-row 
		@selection-change="selsChange">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column type="expand" @expand-change="getChird" width="55">
		</el-table-column>
		<el-table-column type="index" label="序号" width="75">
		</el-table-column>
		<el-table-column prop="svnName" label="svn名称" width="200" sortable>
		</el-table-column>
		<el-table-column prop="svnPath" label="svn路径" width="600" :formatter="formatSex" sortable>
		</el-table-column>
		<el-table-column prop="onlyReadUserNum" label="只读用户数" width="180" sortable>
		</el-table-column>
		<el-table-column prop="readAndWriteUserNum" label="读写用户数" width="180" sortable>
		</el-table-column>
		<el-table-column prop="Manager" label="负责人" min-width="180" sortable>
		</el-table-column>
		<el-table-column fixed="right" label="操作" width="160">
			<template slot-scope="scope">
				<el-button size="small" 
					type="text"
					@click="handleDetail(scope.$index, scope.row)">
					详情
				</el-button>
			</template>
		</el-table-column>
	</el-table>

	<!--工具条-->
	<el-col :span="24" class="toolbar">
		<el-button type="danger" @click="batchOperate" :disabled="this.sels.length===0">批量处理</el-button>
		<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
		</el-pagination>
	</el-col>

	<!--详情界面-->
	<el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false" width="50%" append-to-body>
		<el-form :model="detailForm" label-width="80px" :rules="detailFormRules" ref="detailForm">
			<el-form-item prop="svnName" label="svn库名">
				<el-input v-model="detailForm.svnName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item prop="snvPath" label="svn路径">
				<el-input v-model="detailForm.snvPath" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item prop="onlyReadUserNum" label="只读用户数">
				<el-input-number v-model="detailForm.onlyReadUserNum" :min="0" :max="200"></el-input-number>
			</el-form-item>
			<el-form-item prop="onlyReadUser" label="只读用户">
				<el-input v-model="detailForm.onlyReadUser" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item prop="readAndWriteUserNum" label="读写用户数">
				<el-input-number v-model="detailForm.readAndWriteUserNum" :min="0" :max="200"></el-input-number>
			</el-form-item>
			<el-form-item prop="readAndWriteUser" label="读写用户">
				<el-input v-model="detailForm.readAndWriteUser" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="detailFormVisible = false">返回</el-button>
		</div>
	</el-dialog>
</section>
</template>


<script>
import { getSVNPathList } from '@/assets/js/api/index';

export default {
	data() {
		return {
			// svnPathList: [],
			svnPathList: [],
			// 列表选中列
			sels: [],
			filters: {
				svnPath: ''
			},
			total: 0,
			page: 1,
			listLoading: false,
			detailFormRules: {
				name: [
					{ required: true, message: '请输入svn关键字', trigger: 'blur' }
				]
			},
			// 详情信息是否展示
			detailFormVisible: false,
			detailForm: {
				id: 0,
				svnName: '',
				svnPath: '',
				onlyReadUserNum: 0,
				onlyReadUser: '',
				readAndWriteUserNum: 0,
				readAndWriteUser: ''
			},
			svn_lists: []
		}
	},
	methods: {
		handleDetail(index, row) {
			this.detailFormVisible = true;
			this.detailForm = Object.assign({}, row);
		},
		selectLine(row, event, column) {
			alert(row.id);
		},
		getChird() {
			alert("test getChird");
		},
		resetForm(fromName) {
			this.$refs[fromName].resetFields();
		},
		handleCurrentChange(value) {
			this.page = value;
			this.getSVNPathListPage();
		},
		batchOperate() {
		},
		getSVNPathListPage() {
			this.listLoading = true;
			// var params = { page: this.page, svnPath: this.filters.svnPath };
			var params = { token: sessionStorage.getItem('token'), username: sessionStorage.getItem('username'), page: this.page, svnPath: this.filters.svnKeyword };
			// NProgress.start();
			getSVNPathList(params).then(res => {
				this.listLoading = false;
				// this.total = res.data.total;
				this.svn_lists = res.svn_lists;
				for(let svn_list of this.svn_lists) {
					let svnPath = {};
					svnPath.svnName = svn_list.name;
					svnPath.svnPath = svn_list.url;
					this.svnPathList.push(svnPath);
				};
				console.log(this.svnPathList);
				console.log(this.svn_lists);
				console.log(res);
			});
		},
		selsChange(sels) {
			this.sels = sels;
		}
	},
	mounted() {
		this.getSVNPathListPage();
	}
}
</script>


<style scoped>

</style>
