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

	protected Connection getConnectionAdmin() throws SQLException {

		if(driverJdb==null){
			AcURL="";
			AcUser="";
			AcPassword="";
			driverJdb="";

		}
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(driverJdb);
		dataSource.setUrl(AcURL);
		dataSource.setUsername(AcUser);
		dataSource.setPassword(AcPassword);
		return dataSource.getConnection();
	}
	
 
	
}