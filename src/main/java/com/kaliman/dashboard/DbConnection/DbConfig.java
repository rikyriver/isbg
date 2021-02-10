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
	private String driverJdb;
	public String UrlJdb;
 
	protected Connection getConnectionAdmin() throws SQLException {
		//System.out.println("-getConnectionAdmin /192.168.0.77:");
		if(driverJdb==null){
			AcURL=" ";
			AcUser=" ";
			AcPassword=" ";
 

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
	
 
	
}