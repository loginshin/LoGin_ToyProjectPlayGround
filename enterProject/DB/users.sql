drop table users;

create table users (
   user_key VARCHAR(128) NOT NULL,
   user_id VARCHAR(128),
   user_name VARCHAR(128),
   password VARCHAR(128),
   email VARCHAR(128),
   create_dt TIMESTAMP,
   update_dt TIMESTAMP,
   CONSTRAINT users_pk PRIMARY KEY (user_key),
   CONSTRAINT users_uk UNIQUE (user_id)
);

COMMENT ON TABLE users IS '사용자 정보';
COMMENT ON COLUMN users.user_key IS '사용자 키';
COMMENT ON COLUMN users.user_id IS '사용자 아이디';
COMMENT ON COLUMN users.user_name IS '사용자 이름';
COMMENT ON COLUMN users.password IS '사용자 비밀번호';
COMMENT ON COLUMN users.email IS '사용자 이메일';
