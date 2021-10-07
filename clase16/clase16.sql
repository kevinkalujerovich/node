USE prueba;
create table items (
nombre VARCHAR(255) NOT NULL,
categoria VARCHAR(255) NOT NULL,
stock int,
id int primary key NOT NULL AUTO_INCREMENT
);

insert into items(nombre,categoria,stock) values('Fideos','Harina',20);
insert into items(nombre,categoria,stock) values('Leche','Lacteos',30);
insert into items(nombre,categoria,stock) values('Crema','Lacteos',15);

DELETE FROM items
WHERE id=1;

UPDATE items SET stock=45 WHERE id=2;

select * from items;
