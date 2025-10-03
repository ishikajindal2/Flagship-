package com.apb.flagspace;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
public class HomeController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String repoUrl = "https://apb-flagspace.cdn.prismic.io/api/v2";

    @GetMapping("/api/home")
    public Map<String, Object> getHomePageData() {
        RestTemplate restTemplate = new RestTemplate();
        String repoUrl = "https://apb-flagspace.cdn.prismic.io/api/v2";
        Map<String, Object> response = new HashMap<>();

        try {
            Map<String, Object> apiData = restTemplate.getForObject(repoUrl, Map.class);
            List<Map<String, Object>> refs = (List<Map<String, Object>>) apiData.get("refs");
            String ref = (String) refs.get(0).get("ref");

            String queryUrl = repoUrl + "/documents/search"
                    + "?ref=" + ref
                    + "&q=[[at(document.type,\"homepage\")]]";

            Map<String, Object> resultData = restTemplate.getForObject(queryUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) resultData.get("results");

            if (results != null && !results.isEmpty()) {
                Map<String, Object> doc = results.get(0);
                Map<String, Object> data = (Map<String, Object>) doc.get("data");


                String title = (String) ((Map<String, Object>) ((List<?>) data.get("title")).get(0)).get("text");
                String message = (String) ((Map<String, Object>) ((List<?>) data.get("message")).get(0)).get("text");


                List<Map<String, String>> banners = new ArrayList<>();
                for (String key : data.keySet()) {
                    if (key.startsWith("banner")) {
                        Map<String, Object> bannerObj = (Map<String, Object>) data.get(key);
                        String bannerUrl = (String) bannerObj.get("url");


                        Map<String, String> bannerData = new HashMap<>();
                        bannerData.put("url", bannerUrl);

                        banners.add(bannerData);
                    }
                }

                response.put("title", title);
                response.put("message", message);
                response.put("banners", banners);
            } else {
                response.put("error", "No homepage content found in Prismic");
            }

        } catch (Exception e) {
            response.put("error", "Failed to fetch content: " + e.getMessage());
        }

        return response;
    }
}















