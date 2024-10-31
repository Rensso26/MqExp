package uce.ec.BDmq.state;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String description;
    private double price;
    private int quantity;
    private String image;
    private String size;
    private int calories;
    private int replenish;
    private boolean visible;
    @ManyToOne
    @JoinColumn(name = "category_name")
    @JsonBackReference
    private Category category;

}
