'use client';

import React, { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
// FullCalendarで月表示を可能にするプラグイン。
import dayGridPlugin from '@fullcalendar/daygrid';
// FullCalendarで日付や時間が選択できるようになるプラグイン。
import interactionPlugin from "@fullcalendar/interaction";
//日本語対応のためのインポート
import jaLocale from "@fullcalendar/core/locales/ja";　//追加

import { Card,Form,Row,Col,Input,Button,DatePicker,Select,Modal } from 'antd';

import { useForm,Controller,Control } from 'react-hook-form';

import { FormItem } from 'react-hook-form-antd';

import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';

import moment from 'moment';


// zodのスキーマ定義
const schema = z.object({
    title: z.string()
        .min(3, "Title must be more than 3 characters")
        .max(10, "Title must be less than 10 characters"),
    start: z.date().refine((date) => !isNaN(date.getTime()), "Start date is required"),
    end: z.date().refine((date) => !isNaN(date.getTime()), "End date is required"),
    backgroundColor: z.string().min(1, "Background color is required"),
    borderColor: z.string().min(1, "Border color is required"),
}).refine(data => data.start < data.end, {
    message: "Start date must be before end date",
    path: ["start"]
});

// zodのスキーマを使用して型を取得
type Event = z.infer<typeof schema>;


export default function Home() {
    // useFormを使用してフォームの状態を管理
    const { control, reset, handleSubmit } = useForm<Event>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const [dataSource, setDataSource] = useState<Event[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchCalendars = async () => {
            const response = await fetch('api/calendars');
            const calendars = await response.json();
            setDataSource(calendars);
        };
        fetchCalendars();
    },[]);

    const handleSaveClick = async (values: Event) => {
        console.log("handleSaveClick",values);
        const response = await fetch('api/calendars',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const calendars = await response.json();
        setDataSource(calendars);
        setModalVisible(false); // モーダルを閉じる
        reset(); // フォームをリセット
    }

    const centeredStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
    };

    const showModal = () => {
        setModalVisible(true);
    };
    

    return (
        <>
            <div style={centeredStyle}>
                <Button type="primary" onClick={showModal}>Add Calendar</Button>
            </div>
            <div style={centeredStyle}>
                <Modal 
                    title="Add Calendar"
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    <Form onFinish={handleSubmit((data) => handleSaveClick(data))} 
                        style={{marginTop: '30px'}}>
                        <Row gutter={16}>
                            <Col span={20}>
                                <FormItem 
                                    label="Title"
                                    name='title'
                                    control={control}>
                                    <Input placeholder="title"/>
                                </FormItem>
                            </Col>
                            <Col span={20} style={{marginTop: '20px'}}>
                            <FormItem
                                label="Start"
                                name='start'
                                control={control}>
                                <Controller
                                    control={control}
                                    name="start"
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <DatePicker
                                            {...rest}
                                            value={value ? moment(value) : null} // ここでmomentオブジェクトに変換
                                            onChange={(date, dateString) => onChange(date ? date.toDate() : null)} // onChangeでDateオブジェクトに変換
                                            placeholder="start"
                                        />
                                    )}
                                    />
                            </FormItem>
                        </Col>
                        <Col span={20} style={{marginTop: '20px'}}>
                            <FormItem 
                                name='end'
                                label="End"
                                control={control}>
                                <Controller
                                    control={control}
                                    name="end"
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <DatePicker
                                            {...rest}
                                            value={value ? moment(value) : null}
                                            onChange={(date, dateString) => onChange(date ? date.toDate() : null)}
                                            placeholder="end"
                                        />
                                    )}
                                    />
                            </FormItem>
                        </Col>
                            <Col span={20} style={{marginTop: '20px'}}>
                                <FormItem
                                    name='backgroundColor'
                                    label="Background Color"
                                    control={control}>
                                    <Select placeholder="select a color" >
                                        <Select.Option value="red">Red</Select.Option>
                                        <Select.Option value="blue">Blue</Select.Option>
                                        <Select.Option value="green">Green</Select.Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={20} style={{marginTop: '20px'}}>
                                <FormItem
                                    name='borderColor'
                                    label="Border Color"
                                    control={control}>
                                    <Select placeholder="select a color" >
                                        <Select.Option value="red">Red</Select.Option>
                                        <Select.Option value="blue">Blue</Select.Option>
                                        <Select.Option value="green">Green</Select.Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={16}>
                                <Button type="primary" htmlType='submit'>Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

                <Card title= 'Calendars' style={{width: 1000}}>
                    <FullCalendar
                    locale={jaLocale}
                    plugins={[dayGridPlugin,interactionPlugin]}
                    initialView="dayGridMonth"
                    events={dataSource}
                    />
                </Card>
            </div>
        </>
    )
}