package com.kaliman.dashboard.model;

public class Users {
	
	private int userId;
	private String name;
	private String pin;
	private String email;
	private String address;	
	
	
	public Users() {
	}
	
	public Users(int userId, String name, String pin, String email, String address) {
		super();
		this.userId = userId;
		this.name = name;
		this.pin = pin;
		this.email = email;
		this.address = address;
	}
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}
