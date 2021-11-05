package com.fml.FMLportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import javax.annotation.Resource;
import com.fml.FMLportal.property.FileStorageProperties;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;



import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
@EnableSwagger2
@EnableConfigurationProperties({
    FileStorageProperties.class
})

public class FmlPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(FmlPortalApplication.class, args);
	}
	
	@Bean
	public Docket docket(ApiInfo apiInfo) {
	    return new Docket(DocumentationType.SWAGGER_2)
	        .groupName("user-api")
	        .useDefaultResponseMessages(false)
	        .apiInfo(apiInfo)
	        .select()
	        .build();
	}

	@Bean
	public ApiInfo apiInfo() {
	    return new ApiInfoBuilder()
	        .title("Internship Management System API")
	        .description("API for fetching user related information")
	        .version("1.0.0")
	        .build();
	}

	@Bean
	public UiConfiguration uiConfiguration() {
	    return UiConfigurationBuilder.builder()
	        .deepLinking(true)
	        .validatorUrl(null)
	        .build();
	}
	
//	public void run(String... arg0) throws Exception {
//        SoccerService.addBarcelonaPlayer("Xavi Hernandez", "Midfielder", 6);
//        List<String> players = SoccerService.getAllTeamPlayers(1);
//        for(String player : players)
//        {
//            System.out.println("Introducing Barca player => " + player);
//        }
//    }
}
