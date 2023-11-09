CREATE TABLE IF NOT EXISTS `role_permission`
(
    id              int auto_increment primary key,
    role_id         int         not null comment '角色id',
    permission_id   int         not null comment '权限id',
    create_time     timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time     timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete       tinyint(1) default 0                 not null comment '逻辑删除',
    app_name        varchar(16) null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '角色权限表（只保留叶子权限与角色关系）';