'use client'
import React from 'react';
import { Layout } from 'antd';

const { Content} = Layout;

export default function Home() {
  return (
      <Content style={{ padding: '0 50px',height: '100vh' }}>
        <div className="site-layout-content" >
          <h1 style={{textAlign: 'center',marginTop: '100px'}}>TOPページ</h1>
          <h3 style={{textAlign: 'center',marginTop: '100px'}}>
            こちらのページはTOPページになります。<br/>
            Headerからアプリを移動してください。
          </h3>
        </div>
      </Content>
  );
}
