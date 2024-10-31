package uce.ec.BDmq.Interfaces;

import java.util.List;

public interface ServiceableName<T> {
    T findByName(String name);
    List<T> findAll();
    T save(T t);
    void delete(String name);
    T update(String name,T t);

}
