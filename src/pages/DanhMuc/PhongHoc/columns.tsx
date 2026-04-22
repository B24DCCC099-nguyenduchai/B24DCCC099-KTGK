import React from 'react';
import { Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PhongHoc, LoaiPhong, danhSachNguoiPhuTrach } from '@/models/danhmuc/phongHoc';

export const createTableColumns = (
  onEdit: (record: PhongHoc) => void,
  onDelete: (maPhong: string) => void
): ColumnsType<PhongHoc> => [
  {
    title: 'Mã phòng',
    dataIndex: 'maPhong',
    key: 'maPhong',
    width: 100,
    sorter: (a: PhongHoc, b: PhongHoc) => a.maPhong.localeCompare(b.maPhong),
  },
  {
    title: 'Tên phòng',
    dataIndex: 'tenPhong',
    key: 'tenPhong',
    width: 150,
    sorter: (a: PhongHoc, b: PhongHoc) => a.tenPhong.localeCompare(b.tenPhong),
  },
  {
    title: 'Số chỗ ngồi',
    dataIndex: 'soChoNgoi',
    key: 'soChoNgoi',
    width: 100,
    sorter: (a: PhongHoc, b: PhongHoc) => a.soChoNgoi - b.soChoNgoi,
  },
  {
    title: 'Loại phòng',
    dataIndex: 'loaiPhong',
    key: 'loaiPhong',
    width: 120,
    filters: [
      { text: LoaiPhong.LyThuyet, value: LoaiPhong.LyThuyet },
      { text: LoaiPhong.ThucHanh, value: LoaiPhong.ThucHanh },
      { text: LoaiPhong.HoiTruong, value: LoaiPhong.HoiTruong },
    ],
    onFilter: (value: string | number | boolean, record: PhongHoc) =>
      record.loaiPhong === String(value),
  },
  {
    title: 'Người phụ trách',
    dataIndex: 'nguoiPhuTrach',
    key: 'nguoiPhuTrach',
    width: 150,
    filters: danhSachNguoiPhuTrach.map(name => ({
      text: name,
      value: name,
    })),
    onFilter: (value: string | number | boolean, record: PhongHoc) =>
      record.nguoiPhuTrach === String(value),
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    render: (_: any, record: PhongHoc) => (
      <>
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>
          Sửa
        </Button>
        <Popconfirm
          title="Bạn có chắc muốn xóa phòng học này?"
          onConfirm={() => onDelete(record.maPhong)}
          okText="Có"
          cancelText="Không"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            disabled={record.soChoNgoi >= 30}
          >
            Xóa
          </Button>
        </Popconfirm>
      </>
    ),
  },
];