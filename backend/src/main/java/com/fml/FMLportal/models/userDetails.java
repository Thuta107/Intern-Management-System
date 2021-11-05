package com.fml.FMLportal.models;

import java.util.Date;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="userDetails")


public class userDetails {
	@Id
	 private String id;
	 private String username;
	 private String age;
	 private String currentMedication;
	 private String healthConditions;
	 private String bloodType;
	 private String goToHospital;
	 private String emerContact1;
	 private String emerContact2;
	 private String address;
	 private String generalInterests;
	 
	 

	 
	 
	 
	 public userDetails(String username, String age, String currentMedication, String healthConditions, String bloodType,
			 String goToHospital, String emerContact1, String emerContact2, String address, String generalInterests) {
		 this.username = username;
		 this.age = age;
		 this.currentMedication = currentMedication;
		 this.healthConditions = healthConditions;
		 this.bloodType = bloodType;
		 this.goToHospital = goToHospital;
		 this.emerContact1 = emerContact1;
		 this.emerContact2 = emerContact2;
		 this.address = address;
		 this.generalInterests = generalInterests;
		 
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
	 
	 public String getAge() {
		 return this.age;
	 }
	 
	 public void setAge(String age) {
		 this.age = age;
	 }
	 
	 public String getCurrentMedication() {
		 return this.currentMedication;
	 }
	 
	 public void setCurrentMedication(String currentMedication) {
		 this.currentMedication = currentMedication;
	 }
	 
	 public String getHealthConditions() {
		 return this.healthConditions;
	 }
	 
	 public void setHealthConditions(String healthConditions) {
		 this.healthConditions = healthConditions;
	 }
	 
	 public String getBloodType() {
		 return this.bloodType;
	 }
	 
	 public void setBloodType(String bloodType) {
		 this.bloodType = bloodType;
	 }
	 
	 public String getGoToHospital() {
		 return this.goToHospital;
	 }
	 
	 public void setGoToHospital(String goToHospital) {
		 this.goToHospital = goToHospital;
	 }
	 
	 public String getEmerContact1() {
		 return this.emerContact1;
	 }
	 
	 public void setEmerContact1(String emerContact1) {
		 this.emerContact1 = emerContact1;
	 }
	 
	 public String getEmerContact2() {
		 return this.emerContact2;
	 }
	 
	 public void setEmerContact2(String emerContact2) {
		 this.emerContact2 = emerContact2;
	 }
	 
	 public String getAddress() {
		 return this.address;
	 }
	 
	 public void setAddress(String address) {
		 this.address = address;
	 }
	 
	 public String getGeneralInterests() {
		 return this.generalInterests;
	 }
	 
	 public void setGeneralInterests(String generalInterests) {
		 this.generalInterests = generalInterests;
	 }
	 
	 @Override
	    public String toString() {
	        return String.format(
	                "Users[id=%s, username='%s'']",
	                id, username);
	    }
	    
	 

}
