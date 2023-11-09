CREATE TABLE IF NOT EXISTS `oplog`
(
    id                int auto_increment primary key,
    operator_ip       varchar(64)                          not null comment '操作者ip',
    operator          varchar(64)                          null comment '操作者账号',
    operate_page      varchar(64)                          not null default '' comment '操作页面',
    operate_type      varchar(64)                          not null comment '操作类型',
    target_type       varchar(64)                          not null comment '对象分类',
    target            varchar(1024)                        not null comment '操作对象',
    operation_methods            varchar(64)               not null default '' comment '操作方式',
    detail            text                                 null comment '日志详情',
    create_time       timestamp  default CURRENT_TIMESTAMP null,
    update_time       timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete         tinyint(1) default 0                 not null comment '逻辑删除',
    app_name          varchar(16)                          null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '操作日志';
