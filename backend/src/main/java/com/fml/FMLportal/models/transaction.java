package com.fml.FMLportal.models;

import org.springframework.data.annotation.Id;

public class transaction {
	@Id
	 private String id;
	 private String receiveracc;
	 private String senderacc;
	 private String amount;
	 
	 
	 
	 public transaction(String senderacc, String receiveracc, String amount) {
		 this.senderacc = senderacc;
		 this.receiveracc = receiveracc;
		 this.amount = amount;
		
		 
	 }
	 
	 public void setReceiverAcc(String receiveracc) {
		this.receiveracc = receiveracc; 
	 }
	 
	 public void setSenderAcc(String senderacc) {
			this.senderacc = senderacc; 
		 }
	 
	 public void setAmount(String amount) {
			this.amount = amount; 
		 }
	 
	 public String getReceiverAcc() {
		 return this.receiveracc;
	 }
	 
	 public String getSenderAcc() {
		 return this.senderacc;
	 }
	 
	 public String getAmount() {
		 return this.amount;
	 }
	 
}
