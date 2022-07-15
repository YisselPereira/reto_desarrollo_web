package com.sofka.Software.repositories;

import com.sofka.Software.models.ListModel;
import com.sofka.Software.models.ListTaskModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

/**
 *
 * Implementa JpaRepository en lugar de CrudRepository !!Important¡¡¡¡
 * */
public interface ListTaskRepository extends JpaRepository<ListTaskModel, Long> {
    public abstract ArrayList <ListTaskModel> findAllByListaidAndCompleted(ListModel lista, Boolean completed);
}
