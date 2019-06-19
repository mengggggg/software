$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];

	name = getnameval.split('=')[1];
	position = decodeURI(getpostval.split('=')[1]);
	idnecessary = getidval.split('=')[1];
	department = decodeURI(getdepval.split('=')[1]);

	document.getElementById("Return").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;
})

function getFormElements() {
	var pass_one = $('#new').val();//获取form表单的值
	var pass_two = $('#newagain').val();
	if (pass_one != pass_two) {
		alert("两次输入的密码不一致！");
		document.getElementById("Assure").href = encodeURI("UpdateInfo.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	}
	else{
		changePassword();
		document.getElementById("Assure").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);//注释之后无法修改密码
	} 					
}

function changePassword() {
	var password = $('#newagain').val();
	var userInfo = {};
			userInfo.personId = idnecessary;
			userInfo.password = password;
			$.ajax({
				url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/changepassword',
				type:"GET",
				data:userInfo ,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					alert(data);
					if(success) {
						alert('提交成功！');
						console.log(data);
						showData(data);
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
}