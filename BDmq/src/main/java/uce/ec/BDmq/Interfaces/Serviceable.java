package uce.ec.BDmq.Interfaces;

import java.util.List;

public interface Serviceable<T> {

    T findByName(String name);
    List<T> findAll();
    T save(T t);
    void delete(int id);
    T update(String name,T t);

}
