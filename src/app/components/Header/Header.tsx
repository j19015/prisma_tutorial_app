'use client';

import { useState } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

export default function Home() {
    const [selectedKey, setSelectedKey] = useState('1');

    const handleClick = (e :any ) => {
        setSelectedKey(e.key);
    };

    return (
        <Layout.Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[selectedKey]}
                onClick={handleClick}
            >
                <Menu.Item key="1">
                    <Link href="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/notes">メモアプリ</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link href="/todos">Todoアプリ</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}
