package com.sofka.Software.controller;

import com.sofka.Software.models.ListModel;
import com.sofka.Software.services.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ListController {
        @Autowired
        private ListService listRepository;

        @GetMapping(value = "/listas")
        public Iterable<ListModel> list(){
            return listRepository.list();
        }

        @PostMapping(value = "/lista")
        public ListModel createList(@RequestBody ListModel lista){
            return listRepository.createList(lista);
        }

         @DeleteMapping(value = "/lista/{id}")
         public void deleteList(@PathVariable("id")Long id){
         listRepository.deleteList(id);
         }
}
