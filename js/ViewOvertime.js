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

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("ViewLeave").href = encodeURI("ViewLeave.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("ViewCancelLeave").href = encodeURI("ViewCancelLeave.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var Url = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryovertimeask';

	viewOvertime();

	function viewOvertime() { 
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
						showOvertimeInfo(data);
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

	function showOvertimeInfo(data) {
		var str = "";
		var num = 1;
		for (var i = 0; i < data.overtimeAskList.length; i++, num++) {
			str = "<tr><td>" + num + "</td><td>" + data.overtimeAskList[i].date + "</td><td>" + data.overtimeAskList[i].hours + "</td></tr>";
			$(".workinfo").append(str);
		}
		
	}

})
