package com.kaliman.dashboard.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import com.kaliman.dashboard.DbConnection.DbConfig;
import com.kaliman.dashboard.model.Users;
import com.mysql.jdbc.Statement;
 
@PropertySource("classpath:application.properties")
@Controller
public class ChartInfo extends DbConfig {
 
	String usersSelect = " SELECT p.id AS user_id,p.pin, p.name, m.EMAIL, a.ADDR_INFO FROM  T_PEOPLE p LEFT JOIN T_MAILS m ON p.id=m.T_PEOPLE_ID LEFT JOIN T_ADDRESSES a ON a.T_PEOPLE_ID=p.id"
			+ "  where p.name LIKE ? ";
	
	String updatePeople = " UPDATE T_PEOPLE  SET name = ?, pin=?  WHERE id=? ";
	String updatePeopleEmail = " UPDATE T_MAILS  SET EMAIL = ? WHERE T_PEOPLE_ID=? ";
	String updatePeopleAddress = " UPDATE T_ADDRESSES  SET ADDR_INFO = ? WHERE T_PEOPLE_ID=? ";
	
	String newUserInsert = "INSERT INTO T_PEOPLE (name , pin   ) VALUES (?,?); ";
	String newUserEmail = "INSERT INTO T_MAILS (EMAIL , T_PEOPLE_ID , EMAIL_TYPE  ) VALUES (?,?,?); ";
	String newUserAddress = "INSERT INTO T_ADDRESSES (ADDR_INFO , T_PEOPLE_ID,ADDR_TYPE ) VALUES (?,?,?); ";
	
	String deleteUser ="DELETE FROM T_PEOPLE WHERE id =?";
	String deleteEmail ="DELETE FROM T_MAILS WHERE T_PEOPLE_ID=?";
	String deleteAddress ="DELETE FROM T_ADDRESSES WHERE T_PEOPLE_ID=?";
	
	public List<Users> getUsers(String searchNme) {
		Connection con = null;
		PreparedStatement ps = null;
		List<Users> allInfoUsers = new ArrayList<Users>( );
		ResultSet rs = null;
		String beforeAndAfter = "%" + searchNme + "%";
		try {
			con = getConnectionAdmin();
 
			ps = con.prepareStatement(usersSelect);
			ps.setString(1,beforeAndAfter);
			rs = ps.executeQuery();
			while (rs.next()) {
				int user_id= rs.getInt("user_id");
				String name = rs.getString("name");
				String pin = rs.getString("pin");	
				String EMAIL = rs.getString("EMAIL");
				String address = rs.getString("ADDR_INFO");
				
				allInfoUsers.add(
						new Users(
								user_id,
								name,
								pin,
								EMAIL,
								address				
								));
			}
			
		} catch (SQLException e) {
			System.out.println(e);
			return allInfoUsers;
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return allInfoUsers;
	}
	
	public String updateUsers(List<Users> allUsers) {
		Connection con = null;
		PreparedStatement ps = null;
 
		int rs = 0;
		
		try {
			
	        for (Users user : allUsers) {
	        	
	        	
	        	
	        	
	        	con = getConnectionAdmin();
				ps = con.prepareStatement(updatePeople);
				ps.setString(1, user.getName());
				ps.setString(2, user.getPin());
				ps.setInt(3, user.getUserId());
				rs = ps.executeUpdate();
    			if(rs == 0) {
    				return "2";
    			}
	        	con = getConnectionAdmin();
				ps = con.prepareStatement(updatePeopleEmail);
				ps.setString(1, user.getEmail());
				ps.setInt(2, user.getUserId());
				rs = ps.executeUpdate();
    			if(rs == 0) {
    				return "2";
    			}
	        	con = getConnectionAdmin();
				ps = con.prepareStatement(updatePeopleAddress);
				ps.setString(1, user.getAddress());
				ps.setInt(2, user.getUserId());
				rs = ps.executeUpdate();
    			if(rs == 0) {
    				return "2";
    			}
	        }
  
 
		} catch (SQLException e) {
			System.out.println("-getUsers --SQLException Found:");
			e.printStackTrace();
			return "2";
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return "1";
	}
	
	public String saveUser(List<Users> newUser) {
		
		Connection con = null;
		PreparedStatement ps = null;
 
		int rs = 0;
		
		try {

	        	con = getConnectionAdmin();
				ps = con.prepareStatement(newUserInsert, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, newUser.get(0).getName());
				ps.setString(2, newUser.get(0).getPin());
			 
				rs = ps.executeUpdate();
		        if (rs == 0) {
		        	  System.out.println("Creating user failed, no rows affected.");
		        	  return "2";
		        }
				
		        try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
		            if (generatedKeys.next()) {
 
		    			ps = con.prepareStatement(newUserEmail);
		    			ps.setString(1,newUser.get(0).getEmail());
		    			ps.setInt(2, generatedKeys.getInt(1));
		    			ps.setString(3, "test");
		    			rs = ps.executeUpdate();
		    			
		    			if(rs == 0) {
		    				return "2";
		    			}
		    			
		    			ps = con.prepareStatement(newUserAddress);
		    			ps.setString(1,newUser.get(0).getAddress());
		    			ps.setInt(2, generatedKeys.getInt(1));
		    			ps.setString(3, "test");
		    			rs = ps.executeUpdate();
		    			
		    			if(rs == 0) {
		    				return "2";
		    			}
		            }    else {
		
		            	System.out.println("Creating user failed, no ID obtained.");
		            	return "2";
		            }
		        }
		} catch (SQLException e) {
			System.out.println("-getUsers --SQLException Found:");
			e.printStackTrace();
			return "2";
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return "1";
	}
	
	public String deleteUser(int userID) {

		Connection con = null;
		PreparedStatement ps = null;
 
		int rs = 0;
		
		try {
        	con = getConnectionAdmin();
			ps = con.prepareStatement(deleteUser);
			ps.setInt(1, userID);
			rs = ps.executeUpdate();
			
			if(rs == 0) {
				return "2";
			}
			
			ps = con.prepareStatement(deleteEmail);
			ps.setInt(1, userID);
			rs = ps.executeUpdate();
			
			if(rs == 0) {
				return "2";
			}
			
			ps = con.prepareStatement(deleteAddress);
			ps.setInt(1, userID);
			rs = ps.executeUpdate();
			
			if(rs == 0) {
				return "2";
			}
			
		} catch (SQLException e) {
			System.out.println("-getUsers --SQLException Found:");
			e.printStackTrace();
			return "2";
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return "1";
 
	}
 
}