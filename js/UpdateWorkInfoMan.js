$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];
	var getempPersonId = thisURL.split('?')[5];
	var getempDeptId = thisURL.split('?')[6];
	var getempPost = thisURL.split('?')[7];
	var getempPersonName = thisURL.split('?')[8];
	var getempDeptName = thisURL.split('?')[9];

	name = getnameval.split('=')[1];
	position = decodeURI(getpostval.split('=')[1]);
	idnecessary = getidval.split('=')[1];
	department = decodeURI(getdepval.split('=')[1]);
	empPersonId = getempPersonId.split('=')[1];
	empDeptId = getempDeptId.split('=')[1];
	empPost = getempPost.split('=')[1];
	empPersonName = getempPersonName.split('=')[1];
	empDeptName = decodeURI(getempDeptName.split('=')[1]);


	document.getElementById("Return").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;
	document.getElementById("empPersonName").innerHTML = empPersonName;
	document.getElementById("empPersonId").innerHTML = empPersonId;

	//填写输入框中的默认值
	document.getElementById("empDeptName").value = empDeptName;

	if(empPost == 0) empPost = "员工";
	if(empPost == 1) empPost = "主管";

	document.getElementById("empPost").value = empPost;

})

function getFormElements() {
	new_empDeptName = $('#empDeptName').val();
	new_empPost = $('#empPost').val();
	
	deptId = 0;
	if(new_empDeptName == "经理部") deptId = 1;
	if(new_empDeptName == "小程序部") deptId = 2;
	if(new_empDeptName == "网页部") deptId = 3;

	post = 0;
	if(new_empPost == "员工") post = 0;
	if(new_empPost == "主管") post = 1;

	updatePersonInfo();
	document.getElementById("Submit").href = encodeURI("EmpInfoManage.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
}

function updatePersonInfo() {
	var userInfo = {};
	userInfo.personId = empPersonId;//员工ID
	userInfo.deptId = deptId;//1,2,3 man xiao wang
	userInfo.post = post;//0,1  emp sup
	userInfo.personName = empPersonName;
	userInfo.deptName = new_empDeptName;
	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/updateperson',
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
				alert('提交失败！' + data.msg);
			}
		},
		error:function() {
			alert('异常！')
		}
	})
}