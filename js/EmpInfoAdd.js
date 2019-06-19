$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];
	

	var name = getnameval.split('=')[1];
	var position = decodeURI(getpostval.split('=')[1]);//解决url中传递中文参数乱码问题
	var department = decodeURI(getdepval.split('=')[1]);
	var idnecessary = getidval.split('=')[1];
	

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
})

function getFormElements() {
	name = $('#name').val();//获取form表单的值
	dept =  $('#dept').val();
	initpass = $('#initpass').val();
	post = $('#post').val();
	insertEmp();
	alert("提交成功");
	document.getElementById("Submit").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
}

function insertEmp() {
		var userInfo = {};
			userInfo.personName = name;
			userInfo.post = post;
			userInfo.deptName = dept;
			userInfo.password = initpass;
			userInfo.userName = name;
			$.ajax({
				url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/insertpersoninfo',
				type:"GET",
				data:userInfo ,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					if(data.success) {
						alert('提交成功！');
						console.log(data);
						showData(data);
						}
					else {
						console.log(data);
						alert('提交失败！' + data.msg);
					}
				},
				error:function() {
					alert('异常！')
				}
			})
	}


