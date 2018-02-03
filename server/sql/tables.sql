create table player_account (
  id bigint not null auto_increment,
  username varchar(20) not null,
  password varchar(30) not null,
  primary key (id)
);
create index player_account_username_idx on player_account(username);

create table player_state (
  player_id bigint not null,
  state json not null,
  primary key (player_id),
  constraint player_fk foreign key(player_id) references player_account(id)
);