$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];

	var name = getnameval.split('=')[1];
	var position = decodeURI(getpostval.split('=')[1]);
	var idnecessary = getidval.split('=')[1];
	var department = decodeURI(getdepval.split('=')[1]);

	if(position == "员工")
		document.getElementById("Return").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	if(position == "主管")
		document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	if(position == "经理")
		document.getElementById("Return").href = encodeURI("MainPageMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("AddActivities").href = encodeURI("AddActivities.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var Url = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/querypersoninactivity';
	getPerson();

	function getPerson() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var userInfo = {};
		userInfo.date = year + "-" + month + "-" + day;
			$.ajax({
				url:Url,
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

		if(data.activityList.length > 0) {
			str = "<tr><td>" + data.activityList[0].description + "</td><td>" + data.timeStart[0] + "</td><td>" + data.timeOff[0] + "</td></tr>";
			$(".activityinfo").append(str);
			for(var i = 0; i < data.activityList.length; i++) {
				str = "<tr><td>" + data.activityList[i].person.personName + "</td><td>" + data.activityList[i].person.department.deptName + "</td></tr>";
				$(".personInfo").append(str);
			}
		}
	}
})