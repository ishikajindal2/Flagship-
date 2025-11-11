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

                Map<String, Object> header = extractHeader(data);
                List<Map<String, Object>> announcements = extractAnnouncements(data);
                List<Map<String, Object>> leadershipNotes = extractLeadershipNotes(data);
                Map<String, Object> footer = extractFooter(data);

                response.put("header", header);
                response.put("organization_announcement", announcements);
                response.put("leadership_notes", leadershipNotes);
                response.put("footer", footer);
            } else {
                response.put("error", "No homepage content found in Prismic");
            }

        } catch (Exception e) {
            response.put("error", "Failed to fetch content: " + e.getMessage());
        }

        return response;
    }

    // HEADER Section
    private Map<String, Object> extractHeader(Map<String, Object> data) {
        Map<String, Object> header = new HashMap<>();
        try {
            Map<String, Object> banner = (Map<String, Object>) data.get("header_banner");
            if (banner != null) {
                header.put("banner_url", banner.get("url"));
            }
            List<Map<String, Object>> titleList = (List<Map<String, Object>>) data.get("header_title");
            if (titleList != null && !titleList.isEmpty()) {
                header.put("header_title", titleList.get(0).get("text"));
            }
        } catch (Exception ignored) {}
        return header;
    }

    // ANNOUNCEMENTS Section
    private List<Map<String, Object>> extractAnnouncements(Map<String, Object> data) {
        List<Map<String, Object>> announcements = new ArrayList<>();
        try {
            List<Map<String, Object>> group = (List<Map<String, Object>>) data.get("organization_announcement");
            if (group != null) {
                for (Map<String, Object> item : group) {
                    Map<String, Object> image = (Map<String, Object>) item.get("announcement_image");
                    if (image != null) {
                        Map<String, Object> entry = new HashMap<>();
                        entry.put("url", image.get("url"));
                        announcements.add(entry);
                    }
                }
            }
        } catch (Exception ignored) {}
        return announcements;
    }

    
    private List<Map<String, Object>> extractLeadershipNotes(Map<String, Object> data) {
        List<Map<String, Object>> notes = new ArrayList<>();
        try {
            List<Map<String, Object>> group = (List<Map<String, Object>>) data.get("leadership_notes");
            if (group != null) {
                for (Map<String, Object> item : group) {
                    Map<String, Object> image = (Map<String, Object>) item.get("leader_image");
                    if (image != null) {
                        Map<String, Object> entry = new HashMap<>();
                        entry.put("url", image.get("url"));
                        notes.add(entry);
                    }
                }
            }
        } catch (Exception ignored) {}
        return notes;
    }

    // FOOTER Section
    private Map<String, Object> extractFooter(Map<String, Object> data) {
        Map<String, Object> footer = new HashMap<>();
        try {
            List<Map<String, Object>> links = (List<Map<String, Object>>) data.get("footer_links");
            if (links != null) {
                List<Map<String, String>> footerLinks = new ArrayList<>();
                for (Map<String, Object> linkItem : links) {
                    Map<String, String> linkData = new HashMap<>();
                    List<Map<String, Object>> labelList = (List<Map<String, Object>>) linkItem.get("link_label");
                    if (labelList != null && !labelList.isEmpty()) {
                        linkData.put("label", (String) labelList.get(0).get("text"));
                    }
                    Map<String, Object> urlObj = (Map<String, Object>) linkItem.get("link_url");
                    if (urlObj != null) {
                        linkData.put("url", (String) urlObj.get("url"));
                    }
                    footerLinks.add(linkData);
                }
                footer.put("important_links", footerLinks);
            }
        } catch (Exception ignored) {}
        return footer;
    }
}
