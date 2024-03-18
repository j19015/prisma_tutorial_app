'use client';

import React, { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
// FullCalendarで月表示を可能にするプラグイン。
import dayGridPlugin from '@fullcalendar/daygrid';
// FullCalendarで日付や時間が選択できるようになるプラグイン。
import interactionPlugin from "@fullcalendar/interaction";
//日本語対応のためのインポート
import jaLocale from "@fullcalendar/core/locales/ja";　//追加

import { Card,Form,Row,Col,Input,Button,DatePicker,Select } from 'antd';

type Event = {
    title: string;
    start: Date;
    end?: Date;
    description?: string;
    backgroundColor?: string;
    borderColor?: string;
}



export default function Home() {
    const [form] = Form.useForm();

    const [dataSource, setDataSource] = useState<Event[]>([]);

    useEffect(() => {
        const fetchCalendars = async () => {
            const response = await fetch('api/calendars');
            const calendars = await response.json();
            setDataSource(calendars);
        };
        fetchCalendars();
    },[]);

    const handleSaveClick = async (values: Event) => {
        console.log(values);
        const response = await fetch('api/calendars',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const calendars = await response.json();
        setDataSource(calendars);
        form.resetFields();
    }

    const centeredStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
    };
    

    return (
        <div style={centeredStyle}>
            <Form onFinish={handleSaveClick} form={form} style={{width: '30%'}}>
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
                            name="start"
                            label="Start"
                            rules={[{required: true, message:"開始日を入力してください"}]}>
                            <DatePicker placeholder="start" name="start" />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item 
                            name="end"
                            label="End"
                            rules={[{required: true, message:"終了日を入力してください"}]}>
                            <DatePicker placeholder="end" name="end" />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            name="backgroundColor"
                            label="Background Color"
                            rules={[{required: true, message: "背景色を選択してください。"}]}>
                            <Select placeholder="背景色を選択してください。" >
                                <Select.Option value="red">Red</Select.Option>
                                <Select.Option value="blue">Blue</Select.Option>
                                <Select.Option value="green">Green</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            name="borderColor"
                            label="Border Color"
                            rules={[{required: true, message: "枠線色を選択してください。"}]}>
                            <Select placeholder="枠線色を選択してください。" >
                                <Select.Option value="red">Red</Select.Option>
                                <Select.Option value="blue">Blue</Select.Option>
                                <Select.Option value="green">Green</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Save</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Card title= 'Calendars' style={{width: 1000}}>
                <FullCalendar
                locale={jaLocale}
                plugins={[dayGridPlugin,interactionPlugin]}
                initialView="dayGridMonth"
                events={dataSource}
                />
            </Card>
        </div>
    )
}