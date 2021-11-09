insert into departments (name)
values  ("Marketing & sales."),
        ("Legal stuff"),
        ("Finance"),
        ("General management."),
        ("IT"),
        ("Product development");

insert into roles (title,salary,department_id)
values  ("Product owner",180000,1),
        ("Comapny Lawyer",117000,2),
        ("Finance director",120000,3),
        ("IT manager",90000,4),
        ("Network administrator",110000,2),
        ("Product owner", 120000,1);

insert into employees (first_name,last_name,role_id,manager_id)
values  ("Jurgen","Klopp",1,null),
        ("Joe","Gomez",2,1),
        ("Andy","Robertson",3,2),
        ("Virgil","Vandijk",4,3),
        ("neco","williams.",5,4),
        ("James","Milner",6,5);
        
select * from departments;
