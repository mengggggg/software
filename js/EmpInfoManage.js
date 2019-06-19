$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];
	

	name = getnameval.split('=')[1];
	position = decodeURI(getpostval.split('=')[1]);//解决url中传递中文参数乱码问题
	department = decodeURI(getdepval.split('=')[1]);
	idnecessary = getidval.split('=')[1];
	

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("EmpInfoAdd").href = encodeURI("EmpInfoAdd.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryallperson';
	getMyWorkInfo();


	function getMyWorkInfo() {
		var userInfo = {};
			userInfo.personId = idnecessary;
			$.ajax({
				url:MyUrl,
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
						alert('提交失败！' + data.errMsg);
					}
				},
				error:function() {
					alert('异常！')
				}
			})
	}

	function showData(data) {
		var str = "";
		var num = 1;
		personId = new Array();
		deptId = new Array();
		post = new Array();
		personName = new Array();
		deptName = new Array();
		console.log(data.person);
		for (var i = 0; i < data.person.length; i++, num++) {
			var tempPost;
			if(data.person[i].post==0) tempPost = '员工';
			else if(data.person[i].post==1) tempPost = '主管';
				else tempPost='经理';
			str += "<tr><td>" + num + "</td><td>" + data.person[i].personName + "</td><td>" + tempPost + "</td><td>" + data.person[i].department.deptName+ "</td><td>" + "<button onclick=\"updateInfo(" + i + ")\">修改</button>" + "</td><td>" + "<button onclick=\"delInfo(" + i + ")\">删除</button>" + "</td><td>" + "<button onclick=\"resetPswd(" + i + ")\">重置密码</button>" + "</td></tr>";
			personId[i] = data.person[i].personId;
			deptId[i] = data.person[i].department.deptId;
			post[i] = data.person[i].post;
			personName[i] = data.person[i].personName;
			deptName[i] = data.person[i].department.deptName;
		}
		$(".personinfo").append(str);
	}

})

function updateInfo(i) {
	
	}

function delInfo(i) {
	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/deleteperson',
		type:"GET",
		data:{
			"personId": personId[i]
		} ,
		dataType:"jsonp",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data) {
			if(data.success) {
				alert('提交成功！');
				console.log(data);
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
	window.location.href = "EmpInfoManage.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary;
}

function resetPswd(i) {
	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/resetpassword',
		type:"GET",
		data:{
			"personId": personId[i]
		} ,
		dataType:"jsonp",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data) {
			if(data.success) {
				alert('提交成功！');
				console.log(data);
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
	window.location.href = "EmpInfoManage.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary;
}