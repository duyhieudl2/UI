import { style } from '@mui/system';
import { Button, Col, Form, Input, Row, Tooltip, Space, Select, DatePicker } from 'antd';
import Selection from '~/components/Select';
import { Endpoint } from '~/utils/endpoint';
const { RangePicker } = DatePicker;
export default function FormBoLoc(props) {
    const { handleSearch, form, handleExportExcel } = props;

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
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="branchId" label="Ngành hàng">
                        <Selection url={Endpoint.LIST_NGANHHANG} formKey="branchId" form={form} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item
                        label="Tên nhà cung cấp"
                        name="supplierName"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        style={{ marginBottom: '8px', marginTop: '-8px' }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item
                        label="Mã nhà cung cấp"
                        name="supplierCode"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        style={{ marginBottom: '8px', marginTop: '-8px' }}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="frDate" label="Thời gian" style={{ marginBottom: '8px', marginTop: '-8px' }}>
                        <DatePicker.RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={24} xl={24} style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }} form="filter-form">
                        Tìm kiếm
                    </Button>

                    <Button type="primary" onClick={() => handleExportExcel(form.getFieldsValue())}>
                        Xuất Excel
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
