import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useState, Fragment } from 'react';
import Selection from '~/components/Select';
import { Endpoint } from '~/utils/endpoint';
import './home.css';
const { Option } = Select;
export default function Home() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const { TextArea } = Input;
}
