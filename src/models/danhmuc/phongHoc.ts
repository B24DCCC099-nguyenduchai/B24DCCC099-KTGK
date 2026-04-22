// src/models/danhmuc/phongHoc.ts

export enum LoaiPhong {
  LyThuyet = 'Lý thuyết',
  ThucHanh = 'Thực hành',
  HoiTruong = 'Hội trường',
}

export interface PhongHoc {
  maPhong: string;
  tenPhong: string;
  soChoNgoi: number;
  loaiPhong: LoaiPhong;
  nguoiPhuTrach: string;
}

export const danhSachNguoiPhuTrach = [
  'Nguyễn Văn A',
  'Trần Thị B',
  'Lê Văn C',
  'Phạm Thị D',
  'Hoàng Văn E',
];