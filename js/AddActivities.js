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

	document.getElementById("Return").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

})

function getFormElements() {
	var curDate = new Date();
	date = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(); //获取form表单的值
	alert(date);
	timeStart =  $('#timeStart').val();
	timeOff =  $('#timeOff').val();
	description =  $('#description').val();
	addActivities();
	alert("提交成功");
	document.getElementById("Submit").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
}

function addActivities() {
	var userInfo = {};
	userInfo.personId = idnecessary;//TODO
	userInfo.date = date;
	userInfo.timeStart = timeStart;
	userInfo.timeOff = timeOff;
	userInfo.description = description;

	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/insertactivity',
		type:"GET",
		data:userInfo ,
		dataType:"jsonp",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data) {
			alert(data);
			if(success) {
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