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

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

})

function getFormElements() {
	personid = $('#personid').val();//获取form表单的值
	workdate = $('#workdate').val();
	worktime =  $('#worktime').val();
	offtime =  $('#offtime').val();
	addWorkInfo();
	alert("提交成功");
	document.getElementById("Submit").href = encodeURI("WorkMyDeptInfoSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
}

function addWorkInfo() {
	var userInfo = {};
	userInfo.personId = personid;//TODO
	userInfo.workDate = workdate;
	userInfo.workTime = worktime;
	userInfo.offTime = offtime;
	//date
	//timeStart
	//timeOff
	//description
	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/insertworkinfo',
		type:"GET",
		data:userInfo ,
		dataType:"jsonp",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data) {
			if(data.success) {
				alert('提交成功！');
				console.log(data);
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