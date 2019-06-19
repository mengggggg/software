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

	document.getElementById("myself").href = encodeURI("MyPunch.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	var Url = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryattendancebyexecutiveid';
	getMyDeptPunchInfo();

	function getMyDeptPunchInfo() {
		var userInfo = {};
			userInfo.personId = idnecessary;
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
						alert('提交失败！' + msg);
					}
				},
				error:function() {
					alert('异常！')
				}
			})
	}

	function showData(data) {
		var str = "";
		console.log(data.attendanceList[0].person.personName);

		for (var i = 0; i < data.attendanceList.length; i++) {
			str = "<tr><td>" + data.attendanceList[i].person.personName + "</td><td>" + data.attendanceList[i].person.department + "</td><td>" + data.date[i] + "</td><td>" + data.checkIn[i] + "</td><td>" + data.checkOut[i] + "</td><td>" + data.attendanceList[i].nature + "</td></tr>";
			$(".punchinfo").append(str);		
		}
		
	}
})