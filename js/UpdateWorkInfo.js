$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];
	var getpersonId = thisURL.split('?')[5];
	var getoldPersonName = thisURL.split('?')[6];
	var getoldDate = thisURL.split('?')[7];
	var getoldoldWorkTime = thisURL.split('?')[8];
	var getoldOffTime = thisURL.split('?')[9];

	name = getnameval.split('=')[1];
	position = decodeURI(getpostval.split('=')[1]);
	idnecessary = getidval.split('=')[1];
	department = decodeURI(getdepval.split('=')[1]);
	personId = getpersonId.split('=')[1];
	oldPersonName = getoldPersonName.split('=')[1];
	oldDate = getoldDate.split('=')[1];
	oldWorkTime = getoldoldWorkTime.split('=')[1];
	oldOffTime = getoldOffTime.split('=')[1];

	oldd = new Array();
	oldwt = new Array();
	oldot= new Array();
	oldd[0] = oldDate.split('-')[0];
	oldd[1] = oldDate.split('-')[1];
	oldd[2] = oldDate.split('-')[2];
	oldwt[0] = oldWorkTime.split(':')[0];
	oldwt[1] = oldWorkTime.split(':')[1];
	oldwt[2] = oldWorkTime.split(':')[2];
	oldot[0] = oldOffTime.split(':')[0];
	oldot[1] = oldOffTime.split(':')[1];
	oldot[2] = oldOffTime.split(':')[2];
	test = oldd[0] + "-" + oldd[1] + oldd[2];

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	//填写输入框中的默认值
	document.getElementById("newd_1").value = oldd[0];
	document.getElementById("newd_2").value = oldd[1];
	document.getElementById("newd_3").value = oldd[2];
	document.getElementById("newwt_1").value = oldwt[0];
	document.getElementById("newwt_2").value = oldwt[1];
	document.getElementById("newwt_3").value = oldwt[2];
	document.getElementById("newot_1").value = oldot[0];
	document.getElementById("newot_2").value = oldot[1];
	document.getElementById("newot_3").value = oldot[2];

})

function getFormElements() {
	newd = new Array();
	newwt = new Array();
	newot = new Array();
	newd[0] = $('#newd_1').val();
	newd[1] = $('#newd_2').val();
	newd[2] = $('#newd_3').val();
	newwt[0] = $('#newwt_1').val();
	newwt[1] = $('#newwt_2').val();
	newwt[2] = $('#newwt_3').val();
	newot[0] = $('#newot_1').val();
	newot[1] = $('#newot_2').val();
	newot[2] = $('#newot_3').val();
	date = newd[0] + "-" + newd[1] + "-" + newd[2];
	workTime = newwt[0] + ":" + newwt[1] + ":" + newwt[2];
	offTime = newot[0] + ":" + newot[1] + ":" + newot[2];
	updateWorkInfo();
	document.getElementById("Submit").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
}

function updateWorkInfo() {
	var userInfo = {};
	userInfo.oldPersonName = oldPersonName;
	userInfo.oldDate = oldDate;
	userInfo.personId = personId;//员工ID
	userInfo.date = date;
	userInfo.workTime = workTime;
	userInfo.offTime = offTime;
	$.ajax({
		url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/updateworkinfo',
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