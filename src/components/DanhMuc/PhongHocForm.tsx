import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { PhongHoc, LoaiPhong, danhSachNguoiPhuTrach } from '@/models/danhmuc/phongHoc';

interface PhongHocFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (phong: PhongHoc) => void;
  initialValues?: PhongHoc;
}

const PhongHocForm: React.FC<PhongHocFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
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
    } catch {
      message.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">

        {/* ===== MÃ PHÒNG ===== */}
        <Form.Item
          name="maPhong"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng!' },
            { max: 10, message: 'Mã phòng tối đa 10 ký tự!' },
          ]}
        >
          <Input
            maxLength={10}         
            showCount              
          />
        </Form.Item>

        {/* ===== TÊN PHÒNG ===== */}
        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng!' },
            { max: 50, message: 'Tên phòng tối đa 50 ký tự!' },
          ]}
        >
          <Input
            maxLength={50}         
            showCount
          />
        </Form.Item>

        {/* ===== NGƯỜI PHỤ TRÁCH ===== */}
        <Form.Item
          name="nguoiPhuTrach"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn!' }]}
        >
          <Select placeholder="Chọn người phụ trách">
            {danhSachNguoiPhuTrach.map((name) => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* ===== SỐ CHỖ NGỒI ===== */}
        <Form.Item
          name="soChoNgoi"
          label="Số chỗ ngồi"
          rules={[

            {
              validator: (_, value) => {
                if (value === undefined || value === null) {
                  return Promise.reject('Vui lòng nhập số chỗ!');
                }
                if (value < 10 || value > 200) {
                  return Promise.reject('Số chỗ ngồi phải từ 10 đến 200!');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }} 
          />
        </Form.Item>

        {/* ===== LOẠI PHÒNG ===== */}
        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
        >
          <Select placeholder="Chọn loại phòng">
            <Select.Option value={LoaiPhong.LyThuyet}>
              {LoaiPhong.LyThuyet}
            </Select.Option>
            <Select.Option value={LoaiPhong.ThucHanh}>
              {LoaiPhong.ThucHanh}
            </Select.Option>
            <Select.Option value={LoaiPhong.HoiTruong}>
              {LoaiPhong.HoiTruong}
            </Select.Option>
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default PhongHocForm;