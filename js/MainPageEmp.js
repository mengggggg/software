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

	if(position == 0) position = "员工";
	if(position == 1) position = "主管";
	if(position == 2) position = "经理";

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("LeaveAsking").href = encodeURI("LeaveAsking.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("LeaveCanceling").href = encodeURI("LeaveCanceling.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("WorkOvertime").href = encodeURI("WorkOvertime.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("WorkInfoEmp").href = encodeURI("WorkInfoEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("MyPunch").href = encodeURI("MyPunch.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("UpdatePersonInfo").href = encodeURI("UpdatePersonInfo.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("Login").href = "Login.html";


	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryactivitybypersonid';
	getMyActivityInfo();


	function getMyActivityInfo() {
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
		dateArray = new Array();
		if(data.activityList.length == 0) {
			document.getElementById("activitiesAlert").style = "display:none";
		}
		for (var i = 0; i < data.activityList.length; i++, num++) {
			dateArray[i] = data.date[i];
			str = "<tr><td>" + data.date[i] + "</td><td>" + data.timeStart[i] + "</td><td>" + data.timeOff[i] + "</td><td>" + data.activityList[i].description +  "</td><td>" + "<button onclick=\"sayYes(" + i + ")\">干</button>" + "<button onclick=\"sayNo(" + i + ")\">不干</button>" + "</td></tr>";
			$(".activities").append(str);
		}
		
	}
})


	function sayYes(i) {
		date = dateArray[i];
		opinion = 1;
		responseOpinion();
		window.location.href = "MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary;
	}

	function sayNo(i) {
		date = dateArray[i];	
		opinion = 0;
		responseOpinion();
		window.location.href = "MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary;
	}

	function responseOpinion() {
		var userInfo = {};
		userInfo.personId = idnecessary;
		userInfo.date = date;
		userInfo.opinion = opinion;
		$.ajax({
				url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/updateactivity',
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

