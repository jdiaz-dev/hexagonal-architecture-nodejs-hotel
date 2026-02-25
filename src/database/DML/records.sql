--roles
-- MYSLQ
insert into roles values(null, "owner", 1, SYSDATE(), SYSDATE());
insert into roles values(null, "client_owner", 1, SYSDATE(), SYSDATE());


insert into room_conditions values(null, "libre", 1, SYSDATE(), SYSDATE());
insert into room_conditions values(null, "ocupado", 1, SYSDATE(), SYSDATE());
insert into room_conditions values(null, "limpieza", 1, SYSDATE(), SYSDATE());







-- POSTGRESQL
INSERT INTO roles VALUES (DEFAULT, 'owner', TRUE, NOW(), NOW());
INSERT INTO roles VALUES (DEFAULT, 'client_owner', TRUE, NOW(), NOW());

INSERT INTO room_conditions VALUES (DEFAULT, 'libre', TRUE, NOW(), NOW());
INSERT INTO room_conditions VALUES (DEFAULT, 'ocupado', TRUE, NOW(), NOW());
INSERT INTO room_conditions VALUES (DEFAULT, 'limpieza', TRUE, NOW(), NOW());