CREATE TABLE IF NOT EXISTS `team`
(
    id          int auto_increment  primary key,
    team_name   varchar(10) not null comment '团队名',
    parent_id   int         not null comment '父团队id',
    leaf        tinyint(1)  not null comment '是否叶子团队',
    level       tinyint     not null comment 'parentId为0的层级为1',
    description varchar(20) null comment '描述',
    create_time timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete   tinyint(1) default 0                 null comment '逻辑删除',
    app_name    varchar(16) null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '团队信息表';
