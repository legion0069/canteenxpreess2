package com.canteenxpress.model;

import lombok.Data;
import java.util.List;

@Data
public class UserPreferences {
    private List<String> dietaryRestrictions;
    private List<String> favoriteItems;
    private boolean notifications;
}