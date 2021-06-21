
CREATE TABLE hotels(
    id          int(255) auto_increment not null,
    name        varchar(100) not null,
    address     varchar(100) not null,
    state       boolean not null default 1,
    createdAt   timestamp not null default CURRENT_TIMESTAMP,
    updatedAt   timestamp not null default CURRENT_TIMESTAMP,
    
    CONSTRAINT  pk_hotels PRIMARY KEY(id)
)ENGINE=InnoDb;



