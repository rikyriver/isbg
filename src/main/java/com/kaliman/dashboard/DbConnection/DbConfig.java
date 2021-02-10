package com.kaliman.dashboard.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.net.InetAddress;
import java.net.UnknownHostException;
 
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;

@PropertySource("classpath:application.properties")
@Controller
public class DbConfig {

	private String AcUser;
	private String AcPassword;
	private String AcURL;
	public  String usernameJdb;
	public  String passwordJdb; 
	private String driverJdb;

	public String UrlJdb;
 
	protected Connection getConnectionAdmin() throws SQLException {
		//System.out.println("-getConnectionAdmin /192.168.0.77:");
		if(driverJdb==null){
			AcURL="jdbc:mysql://192.168.0.77:3306/dashboard";
			AcUser="dboard";
			AcPassword="dash123";
			passwordJdb="0000";
			UrlJdb="jdbc:mysql://192.168.3.8:3306/gl";
			usernameJdb="vesko";

			driverJdb="com.mysql.jdbc.Driver";
				
			//saveHistory( "getConnection ", " " ,"driverJdb not found ","", 0);
			//return null;
		}
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(driverJdb);
		dataSource.setUrl(AcURL);
		dataSource.setUsername(AcUser);
		dataSource.setPassword(AcPassword);
		return dataSource.getConnection();
	}
	
	public String saveHistory (String data,String sql,String error,String type,int userId) {
		String returnString = "";// exist
		Connection con = null;
		PreparedStatement ps = null;
		int rs = 0;
		InetAddress ip;
		try {
	        ip = InetAddress.getLocalHost();
	        String  hostName = ip.getHostName();
			String users = "";
			users = "INSERT INTO usersHistory (type , dataStr , sqlStr, error ,userId, ip, hostName ) VALUES (?,?,?,?,?   ,?,? ); ";
			con = getConnectionAdmin();
			ps = con.prepareStatement(users);

			ps.setString(1, type);
			ps.setString(2, data);
			ps.setString(3, sql);
			ps.setString(4, error);
			ps.setInt(5, userId);
			ps.setString(6, ""+ip);
			ps.setString(7,  hostName);
			rs = ps.executeUpdate();
			returnString = "" + rs;
 
		} catch (SQLException e) {
			System.out.println("-saveHistory--SQLException Found:");

			e.printStackTrace();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return returnString;
	}
 
	
}