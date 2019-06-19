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

	document.getElementById("Return").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/queryleaveaskbypersonid';
	getMyWorkInfo();


	function getMyWorkInfo() {
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
						alert('提交失败！' + data.msg);
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
		leaveDateArray = new Array();
		backDateArray = new Array();
		reportBackArray = new Array();
		for (var i = 0; i < data.leaveAskList.length; i++, num++) {
			leaveDateArray[i] = data.leaveDate[i];
			backDateArray[i] = data.backDate[i];
			if(reportBackArray[i] == null) reportBackArray[i] = "未销假";
			str = "<tr><td>" + num + "</td><td>" + data.leaveDate[i] + "</td><td>" + data.backDate[i] + "</td><td>" + data.leaveAskList[i].reason + "</td><td>" + data.reportBack[i] + "</td><td>" + "<button onclick=\"cancelLeave(" + i + ")\">回来上班了</button>" + "</td></tr>";
			$(".leaveinfo").append(str);
		}
		
	}
})

	//获取当前日期
	function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

	function cancelLeave(i) {
		leaveDate = leaveDateArray[i];
		backDate = backDateArray[i];
		reportBack = getNowFormatDate();
		responseCancel();

		window.location.href = "LeaveCanceling.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary;
	}

	function responseCancel() {
		var userInfo = {};
		userInfo.personId = idnecessary;
		userInfo.leaveDate = leaveDate;
		userInfo.backDate = backDate;
		userInfo.reportBack = reportBack;
		$.ajax({
				url:'http://192.168.43.215:8080/employeeAttendance/executiveadmin/reportback',
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

