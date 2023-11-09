CREATE TABLE IF NOT EXISTS IF NOT EXISTS  `message`
(
    id          int auto_increment primary key,
    title       varchar(60)                          not null comment '标题',
    content     varchar(256)                         null comment '内容',
    read_tag    tinyint(1) default 0                 null comment '是否已读',
    oplog_id    int                                  null comment '操作日志id',
    user_id     int                                  null comment '这条消息属于哪个用户的，用户id',
    create_time timestamp  default CURRENT_TIMESTAMP null comment '创建时间',
    update_time timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete   tinyint(1) default 0                 null comment '逻辑删除',
    app_name    varchar(16)                          null comment '应用名称'
) ENGINE=InnoDB AUTO_INCREMENT=1238 DEFAULT CHARSET=utf8 comment '消息中心';