import { PhongHoc } from '@/models/danhmuc/phongHoc';

export const filterPhongHocData = (
  data: PhongHoc[],
  searchText: string,
  loaiPhongFilter: string,
  nguoiPhuTrachFilter: string
): PhongHoc[] => {
  let filtered = data;

  if (searchText) {
    filtered = filtered.filter(
      item =>
        item.maPhong.toLowerCase().includes(searchText.toLowerCase()) ||
        item.tenPhong.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (loaiPhongFilter) {
    filtered = filtered.filter(item => item.loaiPhong === loaiPhongFilter);
  }

  if (nguoiPhuTrachFilter) {
    filtered = filtered.filter(item => item.nguoiPhuTrach === nguoiPhuTrachFilter);
  }

  return filtered;
};