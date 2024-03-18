'use client'

import React, { useState, useEffect, ChangeEvent, use } from 'react';
import { Card, Row, Col, Input, Button, Table,Form, Checkbox} from 'antd';
import {ColumnType} from 'antd/es/table';

interface DataType {
    key: string;
    id: number;
    title: string;
    body: string;
    is_deleted: boolean;
    createdAt: string;
}

interface FormValues {
    title: string;
    body: string;
}

export default function Home() {
    const [form]=Form.useForm();
    const [dataSource, setDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('api/todos');
            const todos = await response.json();
            setDataSource(todos);
        };
        fetchTodos();
    },[]);

    const handleSaveClick = async (values :FormValues) => {

        console.log(values);
        const response = await fetch('api/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: values.title,body: values.body}),
        });

        const todos = await response.json();
        setDataSource(todos);
        form.resetFields();
    }

    const handleCheckboxChange = async (id: number,is_deleted: boolean) => {
        const response = await fetch('api/todos',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,is_deleted: !is_deleted}),
        });
        
        console.log(response);

        const todos = await response.json();
        setDataSource(todos);
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
            width: '10%',
            dataIndex: 'is_deleted',
            render: (is_deleted, record) => (
                <Checkbox checked={is_deleted} onChange = { ()=> handleCheckboxChange(record.id,is_deleted)} />
            ),
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '20%',
            render: (text, record) => (
                <span style={{ textDecoration: record.is_deleted ? 'line-through' : 'none' }}>{text}</span>
            ),
        },
        {
            title: 'body',
            dataIndex: 'body',
            width: '50%',
            render: (text, record) => (
                <span style={{ textDecoration: record.is_deleted ? 'line-through' : 'none' }}>{text}</span>
            ),
        },
        {
            title: 'created_at',
            dataIndex: 'createdAt',
            width: '20%',
            render: (date: Date) => new Date(date).toLocaleDateString(),
            sorter: (a,b) =>Date.parse(a.createdAt) - Date.parse(b.createdAt),
        },
        // {
        //     width: '5%',
        //     render: (record: DataType) =>(
        //         <Button danger onClick={()=>handleDeleteClick(record.id)}>
        //         Delete
        //         </Button>
        //     ),
        // },
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
            <Form layout="vertical"　onFinish={handleSaveClick} form={form}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item 
                            name="title"
                            label="Title"
                            rules={[{required: true, message:"titleを入力してください。"}]}>
                            <Input placeholder="title"/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item 
                            name="body"
                            label="Body"
                            rules={[{required: true, message:"bodyを入力してください。"}]}>
                            <Input placeholder="body" name="body" />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Save</Button>
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