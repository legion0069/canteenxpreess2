package com.canteenxpress.model;

import lombok.Data;

@Data
public class OrderItem {
    private String id;
    private String name;
    private int quantity;
    private double price;
    private String size;
}