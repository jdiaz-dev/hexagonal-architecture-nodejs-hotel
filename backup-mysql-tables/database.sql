
CREATE TABLE hotels(
    id          int(255) auto_increment not null,
    name        varchar(100) not null,
    address     varchar(100) not null,
    state       boolean not null default 1,
    createdAt   timestamp not null default CURRENT_TIMESTAMP,
    updatedAt   timestamp not null default CURRENT_TIMESTAMP,
    
    CONSTRAINT  pk_hotels PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE users(
    id              int(255) auto_increment not null,
    names           varchar(100) not null,
    firstSurname    varchar(100) not null,
    secondSurname   varchar(100) not null,
    username        varchar(100) not null,
    cellphone       varchar(100) not null,
    email           varchar(100) not null,

    createdAt       timestamp not null default CURRENT_TIMESTAMP,
    updatedAt       timestamp not null default CURRENT_TIMESTAMP,
    
    CONSTRAINT      pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;

UPDATE users SET state=1 WHERE id=1; 

/* add column to levels */
ALTER TABLE room_categories ADD COLUMN price INT(10) UNSIGNED NOT NULL AFTER category;
ALTER TABLE categories MODIFY name varchar(500) not null;

/* update prices in room_categories*/
UPDATE room_categories SET price = 20 WHERE id = 2;

INSERT INTO hotels VALUES(1, 'hotel de sol', 'jiron del hotel de sol', 1, now(), now(), 4);





select * from cashes;
select * from sale_reports;
select * from housting_reports;
select * from product_sales;


delete from product_sales;
delete from sale_reports;
delete from housting_reports;
delete from houstings;

update rooms set conditionId = 1;
update cashes set closingMoney = 0;