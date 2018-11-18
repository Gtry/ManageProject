<template>
<section>
	<!--工具条-->
	<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		<el-form :inline="true" :model="filters">
			<el-form-item prop="svnPath">
				<el-input v-model="filters.svnPath" placeholder="svn路径"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="getSVNPathListPage">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="resetForm('filters')">新增</el-button>
			</el-form-item>
		</el-form>
	</el-col>

	<!--列表-->
	<el-table :data="svnPathList" 
		height="680"
		@row-dblclick="selectLine"
		highlight-current-row 
		v-loading="listLoading" 
		@selection-change="selsChange" 
		style="width: 100%;">
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
		<el-form :model="detailForm" ref="detailForm">
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
			svnPathList: [{
				svnName: 'test',
				svnPath: '',
				onlyReadUserNum: 0,
				readAndWriteUserNum: 0,
				Manager: 'test Manager'
			}, {
				svnName: 'test1',
				svnPath: '',
				onlyReadUserNum: 0,
				readAndWriteUserNum: 0,
				Manager: 'test1 Manager'
			}],
			// 列表选中列
			sels: [],
			filters: {
				svnPath: ''
			},
			total: 0,
			page: 1,
			listLoading: false,
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
			}
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
		},
		batchOperate() {
		},
		getSVNPathListPage() {
			this.listLoading = true;
			var params = { page: this.page, svnPath: this.filters.svnPath };
			// NProgress.start();
			getSVNPathList(params).then(res => {
				this.total = res.data.total;
				this.svnPathList = res.data.svnPathList;
				alert("test getSVNPathList");
			});
		},
		selsChange(sels) {
			this.sels = sels;
		}
	},
	mounted() {
		// this.getSVNPathList();
	}
}
</script>


<style scoped>

</style>
