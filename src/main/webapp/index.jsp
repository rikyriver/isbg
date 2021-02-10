<%@page contentType="text/html" pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Home Page</title>

<style>
body {font-family: Arial, Helvetica, sans-serif;}
form {border: 3px solid #f1f1f1;}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
/*   margin: 24px 0 12px 0; */
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>

<link href="resources/css/bootstrap.min.css"rel="stylesheet">
<link href="resources/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link href="resources/css/datatables.min.css" rel="stylesheet">
<link href="resources/css/daterangepicker.css" rel="stylesheet">
<link href="resources/css/custom.css" rel="stylesheet">
<link href="resources/css/material-wfont.css" rel="stylesheet">
<link href="resources/css/avelansys.css" rel="stylesheet">

<script src="resources/script/jquery-1.12.4.min.js"	type="text/javascript"></script>
<script src="resources/script/bootstrap.min.js" type="text/javascript"></script>
<script src="resources/script/utils.js"></script>
<script src="resources/script/moment.min.js"></script>
<script src="resources/script/daterangepicker.min.js"></script>
<script src="resources/script/piklor.js"></script>
<script src="resources/script/apexcharts319.js"></script>
<script src="resources/script/bootbox.min.js"></script>
<script src="resources/script/bootbox.locales.min.js"></script>
<script src="resources/script/datatables.min.js"></script>
<script>var url = window.location.origin + "${pageContext.request.contextPath}";</script>
<script>document.write("<script type='text/javascript' src='resources/accountScript/tableSettings.js?v=" + Date.now() + "'><\/script>");</script>
<script>document.write("<script type='text/javascript' charset='UTF-8' src='resources/accountScript/index.js?v=" + Date.now() + "'><\/script>");</script>
</head>
<body>

<br>
<br>
<br>
 
	  <div class="imgcontainer" style="margin-top: -150px;height: 147px;">
	     <img style="margin-top: 40px; height: 150px;width:190px;" src="resources/pictures/an.gif" alt="Avatar" class="avatar">
	      
	  </div>
	  <div class="container" >
	    <label for="uname"><b>a.	Търсене на лице по име </b></label> 
	    <input type="text" class="type" placeholder="Въведете име или част от името"  id="userName" name="uname" required>	
	    <button class="btn btn-danger" style="background-color:#ffa41b;color: black;" onclick="printChartViewer();">Провери резултатите</button>
	    	    <button class="btn btn-danger" style="background-color:#ffa41b;color: black;" onclick="printChart();">c. Редактиране на съществуващ запис</button>	 	 
	    <label for="psw"><b>b.	Създаване на запис за лице в базата данни</b></label>
	   	<p>
	    <label for="name"><b>Име</b></label>
	    <input type="text" placeholder="Въведете име" id="fullName" name="name" required>
	    <label for="psw"><b>Пин</b></label>
	    <input type="text" placeholder="Въведете пин" id="pin"  name="pin" required>
	    <label for="email"><b>Имейл</b></label>
	    <input type="text" placeholder="Въведете имейл" id="email"  name="email" required>
	    <label for="adress"><b>Адрес</b></label>
	    <input type="text" placeholder="Въведете адрес"  id="address" name="address" required>
	    
	    <button class="btn btn-danger" style="background-color:green;"  onclick="saveNewUser();" type="submit">Регистриране</button>

	  </div>
	  

	  

	
</body>
</html>