package com.fml.FMLportal.models;

import java.util.Date;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")


public class Users {
	@Id
	 private String id;
	 private String username;
	 private String password;
	 private String userType;
	 private String apiKey;
	 private String account_number;
	 private String balance;
	 
	 public Users() {
	 }
	 
	 
	 
	 public Users(String username, String password, String type, String apiKey, String account_number, String balance) {
		 this.username = username;
		 this.password = password;
		 this.userType = type;
		 this.apiKey = apiKey;
		 this.balance = balance;
		 this.account_number = account_number;
		 
	 }
	 
	 
	 public String getUserType() {
		 return this.userType;
	 }
	 
	 public void setUserType(String type) {
		 this.userType = type;
	 }
	 
	 public String getApiKey() {
		 return this.apiKey;
	 }
	 
	 public void setHealthConditions(String apiKey) {
		 this.apiKey = apiKey;
	 }
	 
	 public String getId() {
		 return this.id;
	 }
	 
	 public void setId(String id) {
		 this.id = id;
	 }
	 
	 public String getUsername() {
		 return this.username;
	 }
	 
	 public void setUsername(String username) {
		 this.username = username;
	 }
	 
	 public String getPassword() {
		 return this.password;
	 }
	 
	 public void setPassword(String password) {
		 this.password = password;
	 }
	 
	 public String getAccountNumber() {
		 return this.account_number;
	 }
	 
	 public void setAccountNumber(String account_number) {
		 this.account_number = account_number;
	 }
	 
	 public String getBalance() {
		 return this.balance;
	 }
	 
	 @Override
	    public String toString() {
	        return String.format(
	                "Users[id=%s, username='%s', password='%s']",
	                id, username, password);
	    }
	    
	 

}
