CREATE TABLE IF NOT EXISTS `role`
(
    id           int auto_increment primary key,
    role_code    varchar(128)                         not null comment '角色编号',
    role_name    varchar(128)                         not null comment '名称',
    description  varchar(128)                         null comment '角色描述',
    last_reviser varchar(30)                          null comment '最后修改人',
    create_time  timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time  timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete    tinyint(1) default 0                 not null comment '逻辑删除',
    app_name     varchar(16)                          null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '角色信息';