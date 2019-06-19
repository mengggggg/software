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

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("ViewOvertime").href = encodeURI("ViewOvertime.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var Url = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryleaveaskbyexecutiveid';

	viewLeave();


	function viewLeave() { 
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
						showLeaveInfo(data);
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

	function showLeaveInfo(data) {
		var str = "";
		var num = 1;
		dataArrayId = new Array();
		leaveDateArray = new Array();
		backDateArray = new Array();


		console.log(data.leaveAsk);
		for (var i = 0; i < data.leaveAsk.length; i++, num++) {
			dataArrayId[i] = data.leaveAsk[i].leaveId;
			leaveDateArray[i] = data.leaveAsk[i].leaveDate;
			backDateArray[i] = data.leaveAsk[i].backDate;
			str = "<tr><td>" + num + "</td><td>" + data.leaveDate[0] + "</td><td>" + data.backDate[0] + "</td><td>" + data.leaveAsk[i].reason + "</td><td>" + "<button onclick=\"Approve(" + i + ")\">批准</button>" + "</td><td>" + "<button onclick=\"Decline(" + ")\">拒绝</button>" + "</td></tr>";
			$("#leaveinfo").append(str);
		}
	}
})

	function Approve(i) {
		leaveId = dataArrayId[i];
		opinion = 1;
		leaveDate = leaveDateArray[i];
		backDate = backDateArray[i];
		responseLeave();
	}

	function Decline(i) {
		leaveId = dataArrayId[i];
		opinion = 0;
		leaveDate = leaveDateArray[i];
		backDate = backDateArray[i];
		responseLeave();
	}

	function responseLeave() { 
		var userInfo = {};
			userInfo.personId = idnecessary;
			userInfo.leaveId = leaveId;
			userInfo.approvalOpinion = opinion;
			userInfo.leaveDate = leaveDate;
			userInfo.backDate = backDate;
			$.ajax({
				url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/modifyleaveask',
				type:"GET",
				data:userInfo ,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					if(data.success) {
						alert('提交成功！');
						console.log(data);
						showLeaveInfo(data);
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
