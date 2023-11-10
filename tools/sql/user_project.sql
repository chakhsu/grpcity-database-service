CREATE TABLE IF NOT EXISTS `user_project` (
    id              int auto_increment primary key,
    user_id         int         not null comment '用户id',
    project_id      int         not null comment '项目id',
    create_time     timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time     timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete       tinyint(1) default 0                 not null comment '逻辑删除',
    app_name        varchar(16) null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '用户项目关系表（项目负责人）';
