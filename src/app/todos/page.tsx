'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, Row, Col, Input, Button, Table,Form, Checkbox} from 'antd';
import {ColumnType} from 'antd/es/table';

interface DataType {
    key: string;
    id: number;
    title: string;
    body: string;
    createdAt: string;
}

export default function Home() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [dataSource, setDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('api/todos');
            const todos = await response.json();
            setDataSource(todos);
        };
        fetchTodos();
    },[]);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }

    const handleSaveClick = async () => {
        const response = await fetch('api/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title,body}),
        });

        const todos = await response.json();
        setDataSource(todos);

        setTitle('');
        setBody('');
    }

    const handleDeleteClick = async (id: number) => {
        const response = await fetch(`api/todos?id=${id}`,{
            method: 'DELETE'
        });
        const todos = await response.json();
        setDataSource(todos);
    }

    const columns : ColumnType<DataType>[] = [
        {
            title: '',
            dataIndex: 'checked',
            render: (checked, record) => (
                <Checkbox checked={checked} />
            ),
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '20%',
        },
        {
            title: 'body',
            dataIndex: 'body',
            width: '50%',
        },
        {
            title: 'created_at',
            dataIndex: 'createdAt',
            width: '20%',
            render: (date: Date) => new Date(date).toLocaleDateString(),
            sorter: (a,b) =>Date.parse(a.createdAt) - Date.parse(b.createdAt),
        },
        {
            width: '5%',
            render: (record: DataType) =>(
                <Button danger onClick={()=>handleDeleteClick(record.id)}>
                Delete
                </Button>
            ),
        },
    ]

    const centeredStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };


    return (
        <div style={centeredStyle}>
            <Card title="Todos" style={{ width: 1000 }}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item label="Title" name="title">
                            <Input placeholder="title" name="title" value={title} onChange={handleTitleChange} />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Body" name="body">
                            <Input placeholder="body" name="body" value={body} onChange={handleBodyChange} />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item>
                            <Button type="primary" onClick={handleSaveClick}>Save</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: '20px' }}
            />
        </Card>
        </div>
    )
}