import React from 'react';
import { Button, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { LoaiPhong, danhSachNguoiPhuTrach } from '@/models/danhmuc/phongHoc';

const { Option } = Select;

interface PhongHocToolbarProps {
  searchText: string;
  setSearchText: (value: string) => void;
  loaiPhongFilter: string;
  setLoaiPhongFilter: (value: string) => void;
  nguoiPhuTrachFilter: string;
  setNguoiPhuTrachFilter: (value: string) => void;
  onAdd: () => void;
}

const PhongHocToolbar: React.FC<PhongHocToolbarProps> = ({
  searchText,
  setSearchText,
  loaiPhongFilter,
  setLoaiPhongFilter,
  nguoiPhuTrachFilter,
  setNguoiPhuTrachFilter,
  onAdd,
}) => {
  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Tìm kiếm theo mã phòng hoặc tên phòng */}
      <Input
        placeholder="Tìm kiếm theo mã phòng hoặc tên phòng"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 300 }}
      />

      {/* Lọc theo loại phòng */}
      <Select
        placeholder="Lọc theo loại phòng"
        value={loaiPhongFilter}
        onChange={setLoaiPhongFilter}
        style={{ width: 150 }}
        allowClear
      >
        <Option value={LoaiPhong.LyThuyet}>{LoaiPhong.LyThuyet}</Option>
        <Option value={LoaiPhong.ThucHanh}>{LoaiPhong.ThucHanh}</Option>
        <Option value={LoaiPhong.HoiTruong}>{LoaiPhong.HoiTruong}</Option>
      </Select>

      {/* Lọc theo người phụ trách */}
      <Select
        placeholder="Lọc theo người phụ trách"
        value={nguoiPhuTrachFilter}
        onChange={setNguoiPhuTrachFilter}
        style={{ width: 150 }}
        allowClear
      >
        {danhSachNguoiPhuTrach.map(name => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>

      {/* Nút thêm phòng học */}
      <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
        Thêm phòng học
      </Button>
    </div>
  );
};

export default PhongHocToolbar;