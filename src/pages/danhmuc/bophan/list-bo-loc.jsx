import { style } from '@mui/system';
import { Button, Col, Form, Input, Row, Tooltip, Select } from 'antd';
import Selection from '~/components/Select';
import { Endpoint } from '~/utils/endpoint';

export default function FormBoLoc(props) {
    const { handleSearch, form, handleOpenModal } = props;

    return (
        <Form
            width="1200px"
            form={form}
            name="filter-form"
            onFinish={handleSearch}
            layout="vertical"
            autoComplete="off"
            style={{ margin: 0 }}
        >
            <Row gutter={24} justify="space-between" align="middle" style={{}}>
                <Col span={24} sm={12} xl={8}>
                    <Form.Item
                        label="Tên bộ phận"
                        name="DivisionName"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item
                        label="Mã bộ phận"
                        name="DivisionCode"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }} form="filter-form">
                        Tìm kiếm
                    </Button>

                    <Button type="primary" onClick={() => handleOpenModal()}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
