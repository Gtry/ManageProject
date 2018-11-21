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
		highlight-current-row 
		@selection-change="selsChange"
		@expand-change="getChild"
		border 
		:header-cell-style="{
			'background-color': '#fafafa',
			'color': 'rgb(103, 194, 58)',
			'border-bottom': '1px rgb(103, 194, 58) solid'
		}"
		row-style="height: 20px" style="width: 100%; font-size: 12px;">
		<el-table-column type="selection">
		</el-table-column>
		<el-table-column type="expand">
		</el-table-column>
		<el-table-column prop="svnName" label="svn名称" sortable>
		</el-table-column>
		<el-table-column prop="svnPath" label="svn路径" sortable>
		</el-table-column>
		<el-table-column label="操作" width="160">
			<template slot-scope="scope">
				<el-button size="small" 
					type="text"
					@click="handleDetail(scope.$index, scope.row)">
					详情
				</el-button>
			</template>
		</el-table-column>
	</el-table>

	<!--详情界面-->
	<el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false" width="50%" append-to-body center>
		<el-form :model="detailForm" label-width="160px" label-position="left" :rules="detailFormRules" ref="detailForm">
			<el-form-item prop="svnName" label="svn库名">
				<span>{{ detailForm.svnName }}</span>
			</el-form-item>
			<el-form-item prop="snvPath" label="svn路径： ">
				<span>{{ detailForm.snvPath }}</span>
			</el-form-item>
			<el-form-item prop="onlyReadUserNum" label="只读用户数： ">
				<span>{{ detailForm.onlyReadUserNum }}</span>
			</el-form-item>
			<el-form-item prop="onlyReadUser" label="只读用户： ">
				<span>{{ detailForm.onlyReadUser }}</span>
			</el-form-item>
			<el-form-item prop="readAndWriteUserNum" label="读写用户数： ">
				<span>{{ detailForm.readAndWriteUserNum }}</span>
			</el-form-item>
			<el-form-item prop="readAndWriteUser" label="读写用户： ">
				<span>{{ detailForm.readAndWriteUser }}</span>
			</el-form-item>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click.native="detailFormVisible = false">返回</el-button>
		</div>
	</el-dialog>

	<!--工具条-->
	<el-col :span="24" class="toolbar">
		<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
		</el-pagination>
	</el-col>
</section>
</template>


<script>
import { getSVNPathList, getSVNPathDetail } from '@/assets/js/api/index';

export default {
	data() {
		return {
			// svnPathList: [],
			svnPathList: [],
			filters: {
				svnPath: ''
			},
			dir_n: 0,
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
				svnName: 'test svnName',
				svnPath: 'test svnPath',
				onlyReadUserNum: 0,
				onlyReadUser: '',
				readAndWriteUserNum: 0,
				readAndWriteUser: ''
			},
			svn_lists: []
		}
	},
	methods: {
		resetForm(fromName) {
			this.$refs[fromName].resetFields();
		},
		selectLine(row, event, column) {
			alert(row.id);
		},
		selsChange(sels) {
			this.sels = sels;
		},
		getChild(row, expandedRows) {
			alert("test getChird");
			this.getSVNPathListPage;
		},
		handleDetail(index, row) {
			this.listLoading = true;
			var params = {
				token: sessionStorage.getItem('token'),
				username: sessionStorage.getItem('username'),
				svnName: row.svnName,
				svnPath: row.svnPath,
			};
			// NProgress.start();
			getSVNPathDetail(params).then(res => {
				this.listLoading = false;
				if (res.status == 200) {
					// row.svnName = res.data.svnName
					// row.svnPath = res.data.svnPath
					row.onlyReadUserNum = res.data.onlyReadUserNum;
					row.onlyReadUser = res.data.onlyReadUser;
					row.readAndWriteUserNum = res.data.readAndWriteUserNum;
					row.readAndWriteUser = res.data.readAndWriteUser;
					this.detailFormVisible = true;
					this.detailForm = Object.assign({}, row);
				} else {
					return false;
				}
			});
		},
		getSVNPathListPage() {
			this.listLoading = true;
			var params = { 
				token: sessionStorage.getItem('token'), 
				username: sessionStorage.getItem('username'), 
				dir_n: this.dir_n,
				page: this.page,
				svnPath: this.filters.svnKeyword 
			};
			// NProgress.start();
			getSVNPathList(params).then(res => {
				this.listLoading = false;
				if (res.status == 200) {
					this.total = res.data.total;
					this.svnPathList = [];
					this.svn_lists = res.data.svn_lists;
					for(let svn_list of this.svn_lists) {
						let svnPath = {};
						svnPath.svnName = svn_list.name;
						svnPath.svnPath = svn_list.url;
						this.svnPathList.push(svnPath);
					};
				} else {
					return false;
				}
			});
		},
		handleCurrentChange(value) {
			this.page = value;
			console.log("this.page");
			console.log(this.page);
			this.getSVNPathListPage();
		}
	},
	mounted() {
		this.getSVNPathListPage();
	}
}
</script>


<style scoped>
.el-table td, .el-table th {
	padding: 0px 0;
	min-width: 0;
	box-sizing: border-box;
	text-overflow: ellipsis;
	vertical-align: middle;
	position: relative;
	text-align: left;
}

.el-table__expanded-cell[class*=cell] {
	padding: 15px 0px;
}
</style>
