package com.fml.FMLportal.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "player_Sequence")
    @SequenceGenerator(name = "player_Sequence", sequenceName = "PLAYER_SEQ")
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "num")
    private int num;
    
    @Column(name = "position")
    private String position;
    
    @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "team_id", nullable = false)
        private Team team;
    
    public Player() {
    }
        // getters/setters

	public void setName(String name2) {
		// TODO Auto-generated method stub
		
	}

	public void setPosition(String position2) {
		// TODO Auto-generated method stub
		
	}

	public void setNum(int number) {
		// TODO Auto-generated method stub
		
	}

	public void setTeam(Team barcelona) {
		// TODO Auto-generated method stub
		
	}

	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}
}
