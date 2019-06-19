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
	idnecessary = getidval.split('=')[1];
	

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("dept").href = encodeURI("WorkMyDeptInfoSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("add").href = encodeURI("AddWorkInfoSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/querydeptworkinfo';

	getMyWorkInfo();//页面初始化时执行

	function getMyWorkInfo() {
		var userInfo = {};
			userInfo.personId = idnecessary;
			$.ajax({
				url:MyUrl,
				type:"GET",
				data:userInfo,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					if(data.success) {
						alert('提交成功！');
						console.log(data);
						showMyDeptWorkInfo(data);
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

	function showMyDeptWorkInfo(data) {
		var str = "";
		var num = 1;
		personId = new Array();
		oldPersonName = new Array();
		oldDate = new Array();
		oldWorkTime = new Array();
		oldOffTime = new Array();
		console.log(data.workinfo.length);
		for (var i = 0; i < data.date.length; i++, num++) {
			str = "<tr><td>" + num + "</td><td>" + data.workinfo[i].person.personName + "</td><td>" + data.workinfo[i].person.department.deptName + "</td><td>" + data.date[i] + "</td><td>" + data.workTime[i] + "</td><td>" + data.offTime[i]+ "</td><td>" + "<button onclick=\"updateWorkInfo(" + i + ")\">修改</button>" + "</td></tr>";
			personId[i] = data.workinfo[i].person.personId;
			oldPersonName[i] = data.workinfo[i].person.personName;
			oldDate[i] = data.date[i];
			oldWorkTime[i] = data.workTime[i];
			oldOffTime[i] = data.offTime[i];
			$(".workinfo").append(str);
		}
		
	}

})

function updateWorkInfo(i) {
	window.location.href = "UpdateWorkInfo.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary + "?personId=" + personId[i] + "?oldPersonName=" + oldPersonName[i] + "?oldDate=" + oldDate[i] + "?oldWorkTime=" + oldWorkTime[i] + "?oldOffTime=" + oldOffTime[i];
}


