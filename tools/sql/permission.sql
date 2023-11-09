CREATE TABLE IF NOT EXISTS `permission`
(
    id              int auto_increment primary key,
    permission_name varchar(40) not null comment '权限名字',
    parent_id       int         not null comment '父权限id',
    leaf            tinyint(1)  not null comment '是否叶子权限点（具体的操作）',
    level           tinyint     not null comment '权限点的层级（parentId为0的层级为1）',
    description     varchar(64) null comment '权限点描述',
    create_time     timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time     timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete       tinyint(1) default 0                 null comment '逻辑删除',
    app_name        varchar(16) null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '权限表';
