CREATE TABLE IF NOT EXISTS `project`
(
    id           int auto_increment comment '项目id'     primary key,
    project_code varchar(128)                           not null comment '项目编号',
    project_name varchar(128)                           not null comment '项目名',
    description  varchar(512) default ''                not null comment '项目描述',
    team_id      int                                    not null comment '团队id',
    running      tinyint(1)   default 1                 not null comment '启用 or 停用',
    create_time  timestamp    default CURRENT_TIMESTAMP null comment '创建时间',
    update_time  timestamp    default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete    tinyint(1)   default 0                 not null comment '逻辑删除',
    app_name     varchar(16)                            null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '项目表';
