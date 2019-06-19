$(function(){
	var loginUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/querypersonlocal';
	getUserInitInfo();


	function getUserInitInfo() {
		$('button').click(function(){
			var userInfo = {};
			userInfo.username = $('#username').val();
			userInfo.password = $('#password').val();
			$.ajax({
				url:loginUrl,
				type:"GET",
				data:userInfo ,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					if(data.success) {
						alert('提交成功！');
						console.log(data);
						if(data.personInfo.post == 0) {
							window.location.href = encodeURI("MainPageEmp.html?" + "name=" + data.personInfo.personName + "?post=" + data.personInfo.post + "?department=" + data.personInfo.department.deptName + "?personId=" + data.personInfo.personId);
						}
						if(data.personInfo.post == 1) {
							window.location.href = encodeURI("MainPageSup.html?" + "name=" + data.personInfo.personName + "?post=" + data.personInfo.post + "?department=" + data.personInfo.department.deptName + "?personId=" + data.personInfo.personId);
						}
						if(data.personInfo.post == 2) {
							window.location.href = encodeURI("MainPageMan.html?" + "name=" + data.personInfo.personName + "?post=" + data.personInfo.post + "?department=" + data.personInfo.department.deptName + "?personId=" + data.personInfo.personId);
						}
						}
					else {
						console.log(data);
						alert('提交失败！' + data.errMsg);
					}
				},
				error:function() {
					alert('异常！')
				}
			})
		});
	}

})

