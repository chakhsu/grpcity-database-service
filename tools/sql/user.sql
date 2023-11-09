CREATE TABLE IF NOT EXISTS `user`
(
    id          int auto_increment primary key,
    user_name   varchar(64)                            not null comment '用户账号',
    pw          varchar(2048)                          not null comment '用户密码',
    salt        char(5)      default ''                not null comment '密码盐',
    real_name   varchar(128) default ''                not null comment '真实姓名',
    phone       char(20)     default ''                not null comment 'mobile',
    email       varchar(30)  default ''                not null comment 'email',
    team_id     int                                    null comment '所属团队id',
    is_delete   tinyint(1)   default 0                 not null comment '逻辑删除',
    create_time timestamp    default CURRENT_TIMESTAMP null comment '注册时间',
    update_time timestamp    default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    app_name    varchar(16)                            null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1592 DEFAULT CHARSET=utf8 comment '用户信息';