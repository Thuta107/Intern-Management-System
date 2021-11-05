package com.fml.fmlbackend.controllers;

import com.fml.fmlbackend.models.Users;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RestController
@RequestMapping("/api")
@JsonIgnoreProperties(ignoreUnknown=true)
@CrossOrigin(origins = {"http://localhost:4200"})
public class FilesController {
	@Autowired
	GridFsOperations gridOperations;
	List<String> filesarray = new ArrayList<String>();
	// this variable is used to store ImageId for other actions like: findOne or delete
	private String textFileId = "";
	
	@PostMapping("/save-file")
	public ResponseEntity<String> saveFiles(@Valid @RequestParam("file") MultipartFile file, @RequestParam("username") String username, @RequestParam("fileType") String fileType) throws FileNotFoundException {
		// Define metaData
		DBObject metaData = new BasicDBObject();
		metaData.put("users", username);
		System.out.println(fileType);
		if (fileType.equals("text/plain")) {
			// Convert text file to java fileOutputStream
			try {
			String filename =  file.getOriginalFilename();
			File convFile = new File(file.getOriginalFilename());
		    convFile.createNewFile();
		    FileOutputStream fos = new FileOutputStream(convFile);
		    fos.write(file.getBytes());
		    fos.close();
			
			// Get input file
			InputStream textStream = new FileInputStream(convFile);
			System.out.println(username + "is storing file" + filename);
			metaData.put("type", "text");
			
			// Store file to MongoDB
			textFileId = gridOperations.store(textStream, filename, "text/plain", metaData).getId().toString();
			System.out.println("textFileId = " + textFileId);
			
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
		
		else if (fileType.equals("image/jpeg")) {
			// Convert text file to java fileOutputStream
			try {
				String filename =  file.getOriginalFilename();
				File convFile = new File(file.getOriginalFilename());
				convFile.createNewFile();
				FileOutputStream fos = new FileOutputStream(convFile);
				fos.write(file.getBytes());
				fos.close();
						
				// Get input file
				InputStream textStream = new FileInputStream(convFile);
				System.out.println(username + "is storing file" + filename);
				metaData.put("type", "image");
						
				// Store file to MongoDB
				textFileId = gridOperations.store(textStream, filename, "image/jpeg", metaData).getId().toString();
				System.out.println("textFileId = " + textFileId);
						
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				
		}
		return new ResponseEntity<String>("Done",HttpStatus.OK);
	}
	
	
	@GetMapping("/retrieve/imagefile")
	public ResponseEntity<InputStreamResource> retrieveImageFile(@RequestParam String filename, @RequestParam String username){
		// read file from MongoDB
		GridFSDBFile imageFile = gridOperations.findOne(new Query(Criteria.where("filename").is(filename).and("metadata.users").is(username)));
		
		// Save file back to local disk
		//imageFile.writeTo("C:\\Users\\tanji\\Desktop\\retrieve\\pikachu1.png");
		
		System.out.println("Image File Name:" + imageFile.getFilename());
		
		return ResponseEntity
				.ok()
				//.contentType(MediaType.valueOf(imageFile.getContentType()))
                .body(new InputStreamResource(imageFile.getInputStream()));
	}
	
	@PostMapping("/retrieve/textfiles")
	public String retrieveTextFiles(@RequestBody String username){
		/**
		 * get all data files then save to local disk
		 */
		
		// Retrieve all data files
		List<GridFSDBFile> textFiles = gridOperations.find(new Query(Criteria.where("metadata.type").is("text").and("metadata.users").is(username)));
		
		// Save all back to local disk
		textFiles.forEach(file->{
			
			try {
				String fileName = file.getFilename();
				System.out.println("Retrieve file done");
				
				file.writeTo("C:\\Users\\tanji\\Desktop\\retrieve\\"+ fileName);
				
				System.out.println("Text File Name: " + fileName);
				
			} catch (IOException e) {
				e.printStackTrace();
				System.out.println("Fail to retrieve file");
			}
		});
		
		return "Done";
	}
	
	@PostMapping("/delete-file-by-filename")
	public String deleteFile(@RequestParam("filename") String filename, @RequestParam("username") String username){
		// delete image via id
		gridOperations.delete(new Query(Criteria.where("filename").is(filename).and("metadata.users").is(username)));
		System.out.println("File deleted" + filename);
		return "Done";
	}
	
	
	
	@PostMapping("/list-all-image-files-byusername")
	public List<String> listAllImageFiles(@RequestBody String username){
		/**
		 * get all data files then save to local disk
		 */
		List<String> myFiles = new ArrayList<String>();
		// Retrieve all data files
		List<GridFSDBFile> textFiles = gridOperations.find(new Query(Criteria.where("metadata.users").is(username).and("metadata.type").is("image")));
		
		// Save all back to local disk
		textFiles.forEach(file->{
			
			String fileName = file.getFilename();
			myFiles.add(fileName);
		});
		
		System.out.println(myFiles);
		
		return myFiles;
	}
	
	@PostMapping("/list-all-text-files-byusername")
	public List<String> listAllTextFiles(@RequestBody String username){
		/**
		 * get all data files then save to local disk
		 */
		List<String> myFiles = new ArrayList<String>();
		// Retrieve all data files
		List<GridFSDBFile> textFiles = gridOperations.find(new Query(Criteria.where("metadata.users").is(username).and("metadata.type").is("text")));
		
		// Save all back to local disk
		textFiles.forEach(file->{
			
			String fileName = file.getFilename();
			myFiles.add(fileName);
		});
		
		System.out.println(myFiles);
		
		return myFiles;
	}
	

}
