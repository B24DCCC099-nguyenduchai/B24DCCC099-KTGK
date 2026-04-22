// base-web-umi/src/services/DanhMuc/phongHoc.ts

import { PhongHoc } from '@/models/danhmuc/phongHoc';

const STORAGE_KEY = 'phongHocList';

export function getPhongHocList(): PhongHoc[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePhongHocList(list: PhongHoc[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addPhongHoc(phong: PhongHoc): boolean {
  const list = getPhongHocList();
  // Kiểm tra trùng mã phòng
  if (list.some(p => p.maPhong === phong.maPhong)) {
    return false;
  }
  // Kiểm tra trùng tên phòng
  if (list.some(p => p.tenPhong === phong.tenPhong)) {
    return false;
  }
  list.push(phong);
  savePhongHocList(list);
  return true;
}

export function updatePhongHoc(oldMaPhong: string, phong: PhongHoc): boolean {
  const list = getPhongHocList();
  const index = list.findIndex(p => p.maPhong === oldMaPhong);
  if (index === -1) return false;
  // Kiểm tra trùng mã phòng với phòng khác
  if (list.some(p => p.maPhong === phong.maPhong && p.maPhong !== oldMaPhong)) {
    return false;
  }
  // Kiểm tra trùng tên phòng với phòng khác
  if (list.some(p => p.tenPhong === phong.tenPhong && p.maPhong !== oldMaPhong)) {
    return false;
  }
  list[index] = phong;
  savePhongHocList(list);
  return true;
}

export function deletePhongHoc(maPhong: string): boolean {
  const list = getPhongHocList();
  const phong = list.find(p => p.maPhong === maPhong);
  if (!phong || phong.soChoNgoi >= 30) return false;
  const newList = list.filter(p => p.maPhong !== maPhong);
  savePhongHocList(newList);
  return true;
}