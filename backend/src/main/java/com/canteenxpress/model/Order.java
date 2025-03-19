package com.canteenxpress.model;

import lombok.Data;
import java.util.List;

@Data
public class Order {
    private String id;
    private String userId;
    private List<OrderItem> items;
    private double total;
    private String status;
    private String createdAt;
}