--roles

insert into roles values(null, "owner", 1, SYSDATE(), SYSDATE());
insert into roles values(null, "client_owner", 1, SYSDATE(), SYSDATE());


insert into room_conditions values(null, "libre", 1, SYSDATE(), SYSDATE());
insert into room_conditions values(null, "ocupado", 1, SYSDATE(), SYSDATE());
insert into room_conditions values(null, "limpieza", 1, SYSDATE(), SYSDATE());