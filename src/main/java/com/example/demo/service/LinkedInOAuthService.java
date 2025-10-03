package com.example.demo.service;

import com.example.demo.dto.LinkedInProfile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.springframework.http.*;

@Service
public class LinkedInOAuthService {

    private final String clientId = System.getenv("CLIENT_ID");         
    private final String clientSecret = System.getenv("MY_SECRET");
    private final String redirectUri = "http://localhost:9090/auth/linkedin/callback";

    private final String authUrl = "https://www.linkedin.com/oauth/v2/authorization";
    private final String tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    private final String profileUrl = "https://api.linkedin.com/v2/me";

    private final RestTemplate restTemplate = new RestTemplate();

    // 1️⃣ Generate LinkedIn login URL with required scopes
    public String getAuthorizationUrl() {
        String scopes = "r_organization_social,w_organization_social,r_liteprofile"; // OpenID Connect + post permission

        return authUrl + "?response_type=code"
                + "&client_id=" + clientId
                + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8)
                + "&scope=" + URLEncoder.encode(scopes, StandardCharsets.UTF_8);
    }

    // 2️⃣ Process OAuth callback and fetch user profile
    public LinkedInProfile processLinkedInCallback(String code) {
        // Exchange code for access token
        String tokenRequestUrl = tokenUrl
                + "?grant_type=authorization_code"
                + "&code=" + code
                + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8)
                + "&client_id=" + clientId
                + "&client_secret=" + clientSecret;

        ResponseEntity<TokenResponse> tokenResponse =
                restTemplate.postForEntity(tokenRequestUrl, null, TokenResponse.class);

        String accessToken = tokenResponse.getBody().getAccess_token();

        // Fetch LinkedIn profile
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<LinkedInProfile> profileResponse = restTemplate.exchange(
                profileUrl,
                HttpMethod.GET,
                entity,
                LinkedInProfile.class
        );

        return profileResponse.getBody();
    }

    // 3️⃣ Fetch posts from CFO/CTO/CCO (placeholder for real API after approval)
    public List<String> fetchPostsFromCLevel() {
        // Demo posts until LinkedIn API approval for w_member_social
        return List.of(
                "CFO Ishika: Q3 Strategy Update",
                "CTO John: Tech Roadmap Planning",
                "CCO Alice: Global Expansion Goals"
        );
    }

    // 4️⃣ Inner class for access token response
    private static class TokenResponse {
        private String access_token;
        private long expires_in;

        public String getAccess_token() { return access_token; }
        public long getExpires_in() { return expires_in; }
    }
}




