package com.fml.fmlbackend.models;

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
	 
	 public Users() {
	 }
	 
	 public Users(String username, String password) {
		 this.username = username;
		 this.password = password;
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
	 
	 @Override
	    public String toString() {
	        return String.format(
	                "Users[id=%s, username='%s', password='%s']",
	                id, username, password);
	    }
	    
	 

}
