package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "USER_DETAILS")
public class user {

    @Id
    private Long id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "LINKEDIN_ID", unique = true)
    private String linkedinId;

    @Column(name = "LINKEDIN_EMAIL")
    private String linkedinEmail;

    @Column(name = "LINKEDIN_PIC")
    private String linkedinPic;

    // --- Constructor ---
    public user() {}

    public user(Long id, String username, String linkedinId, String linkedinEmail, String linkedinPic) {
        this.id = id;
        this.username = username;
        this.linkedinId = linkedinId;
        this.linkedinEmail = linkedinEmail;
        this.linkedinPic = linkedinPic;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getLinkedinId() { return linkedinId; }
    public void setLinkedinId(String linkedinId) { this.linkedinId = linkedinId; }

    public String getLinkedinEmail() { return linkedinEmail; }
    public void setLinkedinEmail(String linkedinEmail) { this.linkedinEmail = linkedinEmail; }

    public String getLinkedinPic() { return linkedinPic; }
    public void setLinkedinPic(String linkedinPic) { this.linkedinPic = linkedinPic; }
}
