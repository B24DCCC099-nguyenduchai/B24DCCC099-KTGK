// base-web-umi/src/components/DanhMuc/PhongHocForm.tsx

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { PhongHoc, LoaiPhong, danhSachNguoiPhuTrach } from '@/models/danhmuc/phongHoc';

interface PhongHocFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (phong: PhongHoc) => void;
  initialValues?: PhongHoc;
}

const PhongHocForm: React.FC<PhongHocFormProps> = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      message.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="maPhong"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng!' },
            { max: 10, message: 'Mã phòng tối đa 10 ký tự!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng!' },
            { max: 50, message: 'Tên phòng tối đa 50 ký tự!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nguoiPhuTrach"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
        >
          <Select>
            {danhSachNguoiPhuTrach.map(name => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="soChoNgoi"
          label="Số chỗ ngồi"
          rules={[
            { required: true, message: 'Vui lòng nhập số chỗ ngồi!' },
            { type: 'number', min: 10, max: 200, message: 'Số chỗ ngồi từ 10 đến 200!' },
          ]}
        >
          <InputNumber min={10} max={200} />
        </Form.Item>
        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
        >
          <Select>
            <Select.Option value={LoaiPhong.LyThuyet}>{LoaiPhong.LyThuyet}</Select.Option>
            <Select.Option value={LoaiPhong.ThucHanh}>{LoaiPhong.ThucHanh}</Select.Option>
            <Select.Option value={LoaiPhong.HoiTruong}>{LoaiPhong.HoiTruong}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhongHocForm;