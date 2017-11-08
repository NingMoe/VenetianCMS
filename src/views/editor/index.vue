<template>
	<section>
        <div id="toolbar"></div>
		<div id="editor">
           
        </div>
	</section>
</template>

<script>
	//import NProgress from 'nprogress'
	import { getvUserListPage, removeUser, batchRemoveUser, editUser, addUser ,getvUserList } from '../../api/api';
     
	export default {
		data() {
			return {
				

			}
		},
		methods: {
			
		},
		mounted() {
           var quill = new Quill('#editor', {
               modules: {
                    theme: 'snow'
                }
            });
            console.log('生效')
		}
	}

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>