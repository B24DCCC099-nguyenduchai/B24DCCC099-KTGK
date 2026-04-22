import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, message } from 'antd';

import { PhongHoc } from '@/models/danhmuc/phongHoc';
import {
  getPhongHocList,
  addPhongHoc,
  updatePhongHoc,
  deletePhongHoc,
} from '@/services/DanhMuc/phongHoc';

import PhongHocForm from '@/components/DanhMuc/PhongHocForm';
import PhongHocToolbar from '@/components/DanhMuc/PhongHocToolbar';

import { createTableColumns } from './columns';
import { MESSAGES } from './constants';
import { filterPhongHocData } from './filter';

const PhongHocPage: React.FC = () => {
  const [data, setData] = useState<PhongHoc[]>([]);
  const [filteredData, setFilteredData] = useState<PhongHoc[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingPhong, setEditingPhong] = useState<PhongHoc | undefined>();
  const [searchText, setSearchText] = useState('');
  const [loaiPhongFilter, setLoaiPhongFilter] = useState<string>('');
  const [nguoiPhuTrachFilter, setNguoiPhuTrachFilter] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = filterPhongHocData(
      data,
      searchText,
      loaiPhongFilter,
      nguoiPhuTrachFilter
    );
    setFilteredData(filtered);
  }, [data, searchText, loaiPhongFilter, nguoiPhuTrachFilter]);

  const loadData = () => {
    const list = getPhongHocList();
    setData(list);
  };

  const handleAdd = () => {
    setEditingPhong(undefined);
    setFormVisible(true);
  };

  const handleEdit = (record: PhongHoc) => {
    setEditingPhong(record);
    setFormVisible(true);
  };

  const handleDelete = (maPhong: string) => {
    if (deletePhongHoc(maPhong)) {
      message.success(MESSAGES.DELETE_SUCCESS);
      loadData();
    } else {
      message.error(MESSAGES.DELETE_ERROR);
    }
  };

  const handleFormOk = (phong: PhongHoc) => {
    let success = false;

    if (editingPhong) {
      success = updatePhongHoc(editingPhong.maPhong, phong);
      if (success) {
        message.success(MESSAGES.UPDATE_SUCCESS);
      } else {
        message.error(MESSAGES.DUPLICATE_ERROR);
      }
    } else {
      success = addPhongHoc(phong);
      if (success) {
        message.success(MESSAGES.ADD_SUCCESS);
      } else {
        message.error(MESSAGES.DUPLICATE_ERROR);
      }
    }

    if (success) {
      setFormVisible(false);
      loadData();
    }
  };

  const columns = createTableColumns(handleEdit, handleDelete);

  return (
    <PageContainer>
      <PhongHocToolbar
        searchText={searchText}
        setSearchText={setSearchText}
        loaiPhongFilter={loaiPhongFilter}
        setLoaiPhongFilter={setLoaiPhongFilter}
        nguoiPhuTrachFilter={nguoiPhuTrachFilter}
        setNguoiPhuTrachFilter={setNguoiPhuTrachFilter}
        onAdd={handleAdd}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="maPhong"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1000 }}
      />

      <PhongHocForm
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        onOk={handleFormOk}
        initialValues={editingPhong}
      />
    </PageContainer>
  );
};

export default PhongHocPage;